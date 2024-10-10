import { getServerSession } from 'next-auth';

import db from '@/lib/mongodb';
import parse from '@/lib/parse';
import Favorite from '@/models/favorite/Favorite';
import FavoriteItem from '@/models/favorite/FavoriteItem';

import { authOptions } from '../auth/[...nextauth]/authOptions';

export class FavoriteServices {
  async insertProduct(productId: string, skuId: string) {
    const session = await getServerSession(authOptions);
    await db.connect();
    if (!session || !session.user) {
      throw new Error('Usuário não autenticado');
    }

    let favorite = await Favorite.findOne({ user: session.user._id }).exec();

    if (!favorite) {
      favorite = await this.createFavorite();
    }

    const existingFavoriteItem = await FavoriteItem.findOne({
      favorite: favorite._id,
      product: productId,
    }).exec();

    if (existingFavoriteItem) {
      throw new Error('Já existe esse produto no carrinho');
    }

    await FavoriteItem.create({
      product: productId,
      quantity: 1,
      favorite: favorite._id,
      product_sku: skuId,
    });

    favorite.total += 1;

    await favorite.save();
    await db.disconnect();
  }

  async createFavorite() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      throw new Error('Usuário não autenticado');
    }
    const newFavorite = new Favorite({ user: session.user._id });
    await newFavorite.save();
    return newFavorite;
  }

  async getFavorite(params: any = {}) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return {};
    }
    await db.connect();

    const limit = parse.getNumberIfPositive(params.limit) || 10;
    const offset = parse.getNumberIfPositive(params.offset) || 0;

    const favorite = await Favorite.findOne({ user: session.user._id });
    if (!favorite) {
      await this.createFavorite();
    }

    const aggregationPipeline = [];
    console.log(favorite._id);

    /* Filtrar itens do carrinho */
    aggregationPipeline.push({
      $match: {
        favorite: favorite._id,
      },
    });

    /* Join no produto */
    aggregationPipeline.push({
      $lookup: {
        from: 'products',
        localField: 'product',
        foreignField: '_id',
        as: 'product_details',
      },
    });

    /* Separar os detalhes do produto */
    aggregationPipeline.push({
      $unwind: {
        path: '$product_details',
        preserveNullAndEmptyArrays: true,
      },
    });

    /* Join na empresa (Company) */
    aggregationPipeline.push({
      $lookup: {
        from: 'companies',
        localField: 'product_details.company',
        foreignField: '_id',
        as: 'company_details',
      },
    });

    /* Separar os detalhes da empresa */
    aggregationPipeline.push({
      $unwind: {
        path: '$company_details',
        preserveNullAndEmptyArrays: true,
      },
    });

    /* Join nos deals (descontos) */
    aggregationPipeline.push({
      $lookup: {
        from: 'deals',
        localField: 'product_details._id',
        foreignField: 'product',
        as: 'deals',
      },
    });

    /* Calcular preço com e sem desconto */
    aggregationPipeline.push({
      $addFields: {
        product_price_with_discount: {
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
                    '$product_details.price',
                    {
                      $multiply: [
                        '$product_details.price',
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
                    '$product_details.price',
                    { $arrayElemAt: ['$deals.discount_amount', 0] },
                  ],
                },
              },
            },
            else: null,
          },
        },
        discount_amount: { $arrayElemAt: ['$deals.discount_amount', 0] },
      },
    });

    /* Calcular totais com e sem desconto */
    aggregationPipeline.push({
      $group: {
        _id: null,
        total_value: {
          $sum: '$product_details.price',
        },
        total_value_with_discount: {
          $sum: '$product_price_with_discount',
        },
        items: {
          $push: {
            _id: '$product_details._id',
            name: '$product_details.name',
            description: '$product_details.description',
            code: '$product_details.code',
            warranty: '$product_details.warranty',
            weight: '$product_details.weight',
            slug: '$product_details.slug',
            summary: '$product_details.summary',
            cover: '$product_details.cover',
            price: '$product_details.price',
            price_with_discount: '$product_price_with_discount',
            technicalSpecifications: '$product_details.technicalSpecifications',
            image: '$product_details.image',
            sub_category: '$product_details.sub_category',
            company: {
              _id: '$company_details._id',
              corporate_name: '$company_details.corporate_name',
              logo: '$company_details.logo',
              website: '$company_details.website',
              social_media: '$company_details.social_media',
            },
          },
        },
      },
    });

    /* Paginação */
    aggregationPipeline.push({ $skip: offset });
    aggregationPipeline.push({ $limit: limit });

    /* Execução da agregação e contagem de documentos */
    const [favoriteItems, totalCount] = await Promise.all([
      FavoriteItem.aggregate(aggregationPipeline).exec(),
      FavoriteItem.countDocuments({ favorite: favorite._id }).exec(),
    ]);

    await db.disconnect();

    return {
      total_count: totalCount,
      total_value: favoriteItems.length > 0 ? favoriteItems[0].total_value : 0,
      total_value_with_discount:
        favoriteItems.length > 0
          ? favoriteItems[0].total_value_with_discount
          : 0,
      data: favoriteItems.length > 0 ? favoriteItems[0].items : [],
    };
  }

  async getFavoriteCount() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      throw new Error('Usuário não autenticado');
    }
    await db.connect();

    const favorite = await Favorite.findOne({ user: session.user._id });
    if (!favorite) {
      await this.createFavorite();
    }
    const total_count = await FavoriteItem.countDocuments({
      favorite: favorite._id,
    }).exec();
    await db.disconnect();

    return {
      total_count: total_count,
    };
  }

  async deleteFavoriteItem(_id: string) {
    console.log(_id);
    try {
      await db.connect();
      const result = await FavoriteItem.deleteOne({ _id }).exec();
      console.log(result);
      await db.disconnect();
    } catch (error) {
      console.error(
        `Erro ao deletar item do carrinho: ${(error as Error).message}`,
      );
      await db.disconnect();
    }
  }
}
