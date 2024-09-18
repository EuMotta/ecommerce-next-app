import db from '@/lib/mongodb';
import parse from '@/lib/parse';
import Category from '@/models/category/Category';
import SubCategory from '@/models/category/SubCategory';
import Product from '@/models/product/Product';
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
        from: 'companies',
        localField: 'company',
        foreignField: '_id',
        as: 'company',
      },
    });

    aggregationPipeline.push({
      $unwind: {
        path: '$company',
        preserveNullAndEmptyArrays: true,
      },
    });
    if (params.company) {
      aggregationPipeline.push({
        $match: {
          'company.corporate_name': { $regex: params.company, $options: 'i' },
        },
      });
    }
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
      $lookup: {
        from: 'deals',
        localField: '_id',
        foreignField: 'product',
        as: 'deals',
      },
    });

    aggregationPipeline.push({
      $addFields: {
        price_with_discount: {
          $cond: {
            if: {
              $and: [
                {
                  $lte: [
                    { $arrayElemAt: ['$deals.valid_from', 0] },
                    new Date(),
                  ],
                },
                {
                  $gte: [{ $arrayElemAt: ['$deals.valid_to', 0] }, new Date()],
                },
              ],
            },
            then: {
              $cond: {
                if: {
                  $eq: [
                    { $arrayElemAt: ['$deals.discount_type', 0] },
                    'percentage',
                  ],
                },
                then: {
                  $subtract: [
                    '$price',
                    {
                      $multiply: [
                        '$price',
                        {
                          $divide: [
                            { $arrayElemAt: ['$deals.discount_amount', 0] },
                            100,
                          ],
                        },
                      ],
                    },
                  ],
                },
                else: {
                  $subtract: [
                    '$price',
                    { $arrayElemAt: ['$deals.discount_amount', 0] },
                  ],
                },
              },
            },
            else: '$price',
          },
        },
        discount_amount: { $arrayElemAt: ['$deals.discount_amount', 0] },
      },
    });

    aggregationPipeline.push({
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'product',
        as: 'reviews',
      },
    });

    aggregationPipeline.push({
      $addFields: {
        average_rating: {
          $cond: {
            if: { $gt: [{ $size: '$reviews' }, 0] },
            then: {
              $divide: [
                {
                  $sum: '$reviews.rating',
                },
                { $size: '$reviews' },
              ],
            },
            else: 0,
          },
        },
        average_delivery_time: {
          $avg: '$reviews.delivery_time',
        },
        total_ratings: { $size: '$reviews' },
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
        price_with_discount: 1,
        cover: 1,
        weight: 1,
        company: 1,
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
        average_rating: 1,
        average_delivery_time: 1,
        total_ratings: 1,
        discount_amount: 1,
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

    aggregationPipeline.push({
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        description: { $first: '$description' },
        code: { $first: '$code' },
        slug: { $first: '$slug' },
        skus: { $push: '$skus' },
        company: { $first: '$company' },
        price: { $first: '$price' },
        price_with_discount: { $first: '$price_with_discount' },
        cover: { $first: '$cover' },
        weight: { $first: '$weight' },
        image: { $first: '$image' },
        sub_category: { $first: '$sub_category' },
        category: { $first: '$category' },
        average_rating: { $first: '$average_rating' },
        total_ratings: { $first: '$total_ratings' },
        average_delivery_time: { $first: '$average_delivery_time' },
        discount_amount: { $first: '$discount_amount' },
      },
    });

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

  async getSingleProduct(code: number) {
    try {
      await db.connect();

      const aggregationPipeline = [];

      aggregationPipeline.push({
        $match: { code: code },
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
        $lookup: {
          from: 'productattributes',
          localField: 'skus.color',
          foreignField: '_id',
          as: 'color_details',
        },
      });

      aggregationPipeline.push({
        $lookup: {
          from: 'productattributes',
          localField: 'skus.size',
          foreignField: '_id',
          as: 'size_details',
        },
      });

      aggregationPipeline.push({
        $addFields: {
          'skus.color': {
            $arrayElemAt: [
              '$color_details',
              {
                $indexOfArray: ['$color_details._id', '$skus.color'],
              },
            ],
          },
          'skus.size': {
            $arrayElemAt: [
              '$size_details',
              {
                $indexOfArray: ['$size_details._id', '$skus.size'],
              },
            ],
          },
        },
      });

      aggregationPipeline.push({
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          description: { $first: '$description' },
          code: { $first: '$code' },
          price: { $first: '$price' },
          price_with_discount: { $first: '$price_with_discount' },
          cover: { $first: '$cover' },
          weight: { $first: '$weight' },
          image: { $first: '$image' },
          sub_category: { $first: '$sub_category' },
          technicalSpecifications: { $first: '$technicalSpecifications' },
          company: { $first: '$company' },
          skus: { $push: '$skus' },
        },
      });

      aggregationPipeline.push({
        $project: {
          color_details: 0,
          size_details: 0,
        },
      });

      aggregationPipeline.push({
        $lookup: {
          from: 'companies',
          localField: 'company',
          foreignField: '_id',
          as: 'company',
        },
      });

      aggregationPipeline.push({
        $unwind: {
          path: '$company',
          preserveNullAndEmptyArrays: true,
        },
      });

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
          from: 'deals',
          localField: '_id',
          foreignField: 'product',
          as: 'deals',
        },
      });

      aggregationPipeline.push({
        $addFields: {
          price_with_discount: {
            $cond: {
              if: {
                $and: [
                  {
                    $lte: [
                      { $arrayElemAt: ['$deals.valid_from', 0] },
                      new Date(),
                    ],
                  },
                  {
                    $gte: [
                      { $arrayElemAt: ['$deals.valid_to', 0] },
                      new Date(),
                    ],
                  },
                ],
              },
              then: {
                $cond: {
                  if: {
                    $eq: [
                      { $arrayElemAt: ['$deals.discount_type', 0] },
                      'percentage',
                    ],
                  },
                  then: {
                    $subtract: [
                      '$price',
                      {
                        $multiply: [
                          '$price',
                          {
                            $divide: [
                              { $arrayElemAt: ['$deals.discount_amount', 0] },
                              100,
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  else: {
                    $subtract: [
                      '$price',
                      { $arrayElemAt: ['$deals.discount_amount', 0] },
                    ],
                  },
                },
              },
              else: '$price',
            },
          },
        },
      });

      aggregationPipeline.push({
        $project: {
          name: 1,
          description: 1,
          code: 1,
          price: 1,
          price_with_discount: 1,
          technicalSpecifications: 1,
          skus: 1,
          sub_category: 1,
          company: 1,
          image: 1,
          cover: 1,
          weight: 1,
        },
      });

      const [aggregatedProduct] =
        await Product.aggregate(aggregationPipeline).exec();

      if (!aggregatedProduct) {
        return { product: null, related_products: [] };
      }
      const related_products = await this.getRelatedProducts(
        aggregatedProduct.sub_category._id,
        aggregatedProduct.code,
      );

      return { product: aggregatedProduct, related_products };
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
  async getRelatedProducts(sub_category: string, code: string) {
    try {
      const relatedProducts = await Product.find({
        code: { $ne: code },
        sub_category: { $in: sub_category },
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
      company: 1,
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
