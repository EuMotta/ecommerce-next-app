import db from '@/lib/mongodb';
import parse from '@/lib/parse';
import Category from '@/models/category/Category';
import SubCategory from '@/models/category/SubCategory';
import Product from '@/models/product/Product';
import ProductSKU from '@/models/product/ProductSKU';
import mongoose from 'mongoose';

export class ProductsService {
  async getProducts(params: any = {}) {
    await db.connect();
    const limit = parse.getNumberIfPositive(params.limit) || 10;
    const offset = parse.getNumberIfPositive(params.offset) || 0;
    const fieldsArray = this.getStringToArray(params.fields);
    const projectQuery = this.getProjectQuery(fieldsArray);
    const sortQuery = this.getSortQuery(params.sort);
    const matchQuery = await this.getMatchQuery(params);
    const matchTextQuery = this.getMatchTextQuery(params);

    const aggregationPipeline = [];

    if (matchTextQuery || matchQuery) {
      const combinedMatchQuery = { ...matchTextQuery, ...matchQuery };
      aggregationPipeline.push({ $match: combinedMatchQuery });
    }

    aggregationPipeline.push({ $project: projectQuery });

    aggregationPipeline.push({
      $lookup: {
        from: 'subcategories',
        localField: 'sub_category',
        foreignField: '_id',
        as: 'sub_category',
      },
    });

    aggregationPipeline.push({
      $unwind: {
        path: '$sub_category',
        preserveNullAndEmptyArrays: true,
      },
    });

    aggregationPipeline.push({
      $lookup: {
        from: 'categories',
        localField: 'sub_category.parent_id',
        foreignField: '_id',
        as: 'category',
      },
    });

    aggregationPipeline.push({
      $unwind: {
        path: '$category',
        preserveNullAndEmptyArrays: true,
      },
    });

    aggregationPipeline.push({
      $lookup: {
        from: 'productskus',
        localField: 'skus',
        foreignField: '_id',
        as: 'skus',
      },
    });

    aggregationPipeline.push({
      $unwind: {
        path: '$skus',
        preserveNullAndEmptyArrays: true,
      },
    });

    aggregationPipeline.push({
      $project: {
        name: 1,
        description: 1,
        code: 1,
        skus: 1,
        slug: 1,
        price: 1,
        cover: 1,
        weight: 1,
        image: 1,
        sub_category: {
          description: 1,
          deleted_at: 1,
          name: 1,
          slug: 1,
        },
        category: {
          description: 1,
          deleted_at: 1,
          name: 1,
          slug: 1,
        },
      },
    });

    if (params.sub_category) {
      aggregationPipeline.push({
        $match: {
          'sub_category.name': params.sub_category,
        },
      });
    }

    if (params.category) {
      aggregationPipeline.push({
        $match: {
          'category.name': params.category,
        },
      });
    }

    /* teste */
    aggregationPipeline.push({
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        description: { $first: '$description' },
        code: { $first: '$code' },
        slug: { $first: '$slug' },
        skus: { $push: '$skus' },
        price: { $first: '$price' },
        cover: { $first: '$cover' },
        weight: { $first: '$weight' },
        image: { $first: '$image' },
        sub_category: { $first: '$sub_category' },
        category: { $first: '$category' },
      },
    });
    /* teste */
    if (Object.keys(sortQuery).length > 0) {
      aggregationPipeline.push({ $sort: sortQuery });
    }
    aggregationPipeline.push({ $skip: offset });
    aggregationPipeline.push({ $limit: limit });

    const [products, totalCountResult] = await Promise.all([
      Product.aggregate(aggregationPipeline).exec(),
      Product.countDocuments(matchQuery).exec(),
    ]);
    await db.disconnect();

    return {
      total_count: totalCountResult || 0,
      data: products,
    };
  }

  async getSingleProduct(slug: string) {
    try {
      await db.connect();

      const product = await Product.findOne({ slug })
        .populate({
          path: 'skus',
          model: ProductSKU,
        })
        .populate({
          path: 'sub_category',
          model: SubCategory,
          select: 'name slug',
        })
        .exec();

      if (!product) {
        return { product: null, related_products: [] };
      }
      const related_products = await this.getRelatedProducts(product);
      return { product, related_products };
    } catch (error) {
      console.error('Erro ao efetuar o fetch em services:', error);
      return { product: null, related_products: [] };
    } finally {
      await db.disconnect();
    }
  }

  /* Converte string em array */
  getStringToArray(fields: string) {
    return fields ? fields.split(',') : [];
  }

  /* Gera uma lista de objetos relacionados ao produto */
  async getRelatedProducts(product: any) {
    try {
      const relatedProducts = await Product.find({
        code: { $ne: product.code },
        category: { $in: product.category },
      })
        .populate({
          path: 'skus',
          select: 'sku price -_id',
        })
        .limit(4)
        .exec();

      return relatedProducts || [];
    } catch (error) {
      console.error('Error fetching related products:', error);
      return [];
    }
  }

  /* Gera um array para a consulta no mongo */
  getProjectQuery(fieldsArray: string[]) {
    const project: any = {
      name: 1,
      description: 1,
      skus: 1,
      slug: 1,
      cover: 1,
      category: 1,
      code: 1,
      price: 1,
      weight: 1,
      image: 1,
      sub_category: 1,
    };

    if (fieldsArray.length > 0) {
      return fieldsArray.reduce((acc: any, field: string) => {
        acc[field] = 1;
        return acc;
      }, {});
    }

    return project;
  }

  /* Gera um objeto de ordenação para uma consulta no mongo com base no parâmetro fornecido. */
  getSortQuery(sortParam: any) {
    const sort = sortParam || '';
    if (sort.length > 0) {
      const fields = sort.split(',');
      return Object.assign(
        {},
        ...fields.map((field: any) => ({
          [field.startsWith('-') ? field.slice(1) : field]: field.startsWith(
            '-',
          )
            ? -1
            : 1,
        })),
      );
    }

    return { name: 1 };
  }

  async getSubCategoryIdByName(
    name: string,
  ): Promise<mongoose.Types.ObjectId | null> {
    const subCategory = await SubCategory.findOne({
      name: { $regex: new RegExp(`^${name}$`, 'i') },
    }).exec();

    return subCategory ? subCategory._id : null;
  }

  async getCategoryIdByName(
    name: string,
  ): Promise<mongoose.Types.ObjectId | null> {
    const category = await Category.findOne({ name }).exec();
    return category ? category._id : null;
  }

  async getSubCategoriesByCategory(
    categoryId: mongoose.Types.ObjectId,
  ): Promise<mongoose.Types.ObjectId[]> {
    const subCategories = await SubCategory.find({
      parent_id: categoryId,
    }).exec();
    return subCategories.map((subCat) => subCat._id);
  }

  /* Exemplo de método para construir um matchQuery (filtro) */
  async getMatchQuery(params: any) {
    const query: any = {};
    if (params.sub_category && params.category) {
      const subCategoryId = await this.getSubCategoryIdByName(
        params.sub_category,
      );

      if (subCategoryId) {
        query.sub_category = { $in: [subCategoryId] };
      }
    }

    if (!params.sub_category && params.category) {
      const categoryId = await this.getCategoryIdByName(params.category);
      if (categoryId) {
        const subCategories = await this.getSubCategoriesByCategory(categoryId);
        query.sub_category = { $in: subCategories };
      }
    }

    if (params.price_min && params.price_max) {
      query.price = { $gte: params.price_min, $lte: params.price_max };
    }
    if (params.name) {
      query.name = { $regex: params.name, $options: 'i' };
    }
    return query;
  }

  /*  método para construir um matchTextQuery (filtro de texto) */
  getMatchTextQuery(params: any) {
    if (params.search) {
      return { $text: { $search: `"${params.search}"` } };
    }
    return null;
  }
}

export default new ProductsService();
