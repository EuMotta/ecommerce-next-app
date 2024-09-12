import db from '@/lib/mongodb';
import parse from '@/lib/parse';
import Category from '@/models/category/Category';
import Product from '@/models/product/Product';
import ProductSKU from '@/models/product/ProductSKU';
import mongoose from 'mongoose';

export class ProductsService {
  async getProducts(params: any = {}) {
    const limit = parse.getNumberIfPositive(params.limit) || 10;
    const offset = parse.getNumberIfPositive(params.offset) || 0;
    const fieldsArray = this.getStringToArray(params.fields);
    const projectQuery = this.getProjectQuery(fieldsArray);
    const sortQuery = this.getSortQuery(params);
    const matchQuery = this.getMatchQuery(params);
    const matchTextQuery = this.getMatchTextQuery(params);

    await db.connect();

    const aggregationPipeline: any[] = [];

    if (matchTextQuery || matchQuery) {
      const combinedMatchQuery = { ...matchTextQuery, ...matchQuery };
      aggregationPipeline.push({ $match: combinedMatchQuery });
    }

    aggregationPipeline.push({ $project: projectQuery });

    if (sortQuery && Object.keys(sortQuery).length > 0) {
      aggregationPipeline.push({ $sort: sortQuery });
    }

    aggregationPipeline.push({ $skip: offset });
    aggregationPipeline.push({ $limit: limit });

    aggregationPipeline.push({
      $lookup: {
        from: 'categories',
        localField: 'category',
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
        weight: 1,
        image: 1,
        category: {
          description: 1,
          deleted_at: 1,
          name: 1,
          slug: 1,
        },
      },
    });

    const [products, totalCountResult] = await Promise.all([
      Product.aggregate(aggregationPipeline).exec(),
      Product.countDocuments(matchQuery).exec(),
    ]);

    await db.disconnect();

    const total_count = totalCountResult || 0;

    return {
      total_count: total_count,
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
          path: 'category',
          model: Category,
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
  /*   async getProductReviews(product: any) {
    try {
      const reviews = await Rating.find({ product: product._id }).exec();

      return reviews || [];
    } catch (error) {
      console.error('Error fetching related products:', error);
      return [];
    }
  } */

  /* Gera um array para a consulta no mongo */
  getProjectQuery(fieldsArray: string[]) {
    const project: any = {
      name: 1,
      description: 1,
      skus: 1,
      slug: 1,
      code: 1,
      price: 1,
      weight: 1,
      image: 1,
      category: 1,
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
  getSortQuery(params: any) {
    const sort = params.sort || '';
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
    return {};
  }

  /* Exemplo de método para construir um matchQuery (filtro) */
  getMatchQuery(params: any) {
    const query: any = {};
    if (params.category) {
      query.category = new mongoose.Types.ObjectId(params.category);
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
      return { $text: { $search: params.search } };
    }
    return null;
  }
}

export default new ProductsService();
