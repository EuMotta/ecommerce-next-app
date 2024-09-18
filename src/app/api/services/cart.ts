import { getServerSession } from 'next-auth';

import db from '@/lib/mongodb';
import parse from '@/lib/parse';
import Cart from '@/models/cart/Cart';
import CartItem from '@/models/cart/CartItem';

import { authOptions } from '../auth/[...nextauth]/authOptions';

export class CartServices {
  async insertProduct(productId: string, skuId: string) {
    const session = await getServerSession(authOptions);
    await db.connect();
    if (!session || !session.user) {
      throw new Error('Usuário não autenticado');
    }

    let cart = await Cart.findOne({ user: session.user._id }).exec();

    if (!cart) {
      cart = await this.createCart();
    }

    const existingCartItem = await CartItem.findOne({
      cart: cart._id,
      product: productId,
    }).exec();

    if (existingCartItem) {
      throw new Error('Já existe esse produto no carrinho');
    }

    await CartItem.create({
      product: productId,
      quantity: 1,
      cart: cart._id,
      product_sku: skuId,
    });

    cart.total += 1;

    await cart.save();
    await db.disconnect();
  }

  async createCart() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      throw new Error('Usuário não autenticado');
    }
    const newCart = new Cart({ user: session.user._id });
    await newCart.save();
    return newCart;
  }

  async getCart(params: any = {}) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      throw new Error('Usuário não autenticado');
    }
    await db.connect();

    const limit = parse.getNumberIfPositive(params.limit) || 10;
    const offset = parse.getNumberIfPositive(params.offset) || 0;

    const cart = await Cart.findOne({ user: session.user._id });
    if (!cart) {
      await this.createCart();
    }

    const aggregationPipeline = [];

    /* Filtrar itens do carrinho */
    aggregationPipeline.push({
      $match: {
        cart: cart._id,
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

    aggregationPipeline.push({
      $project: {
        _id: 1,
        quantity: 1,
        product: {
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
        },
        company: {
          corporate_name: '$company_details.corporate_name',
        },
        image: '$product_details.image',
        total_value: { $multiply: ['$product_details.price', '$quantity'] },
        total_value_with_discount: {
          $multiply: [
            {
              $ifNull: [
                '$product_price_with_discount',
                '$product_details.price',
              ],
            },
            '$quantity',
          ],
        },
      },
    });

    aggregationPipeline.push({
      $group: {
        _id: null,
        total_value: { $sum: '$total_value' },
        total_value_with_discount: { $sum: '$total_value_with_discount' },
        items: { $push: '$$ROOT' },
      },
    });

    /* Projeção final para separar o total_value */
    aggregationPipeline.push({
      $project: {
        total_value: 1,
        total_value_with_discount: 1,
        items: 1,
      },
    });

    /* Paginação */
    aggregationPipeline.push({ $skip: offset });
    aggregationPipeline.push({ $limit: limit });

    /* Execução da agregação e contagem de documentos */
    const [cartItems, totalCount] = await Promise.all([
      CartItem.aggregate(aggregationPipeline).exec(),
      CartItem.countDocuments({ cart: cart._id }).exec(),
    ]);

    await db.disconnect();

    return {
      total_count: totalCount,
      total_value: cartItems[0]?.total_value || 0,
      total_value_with_discount: cartItems[0]?.total_value_with_discount || 0,
      data: cartItems[0]?.items || [],
    };
  }

  async getCartCount() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      throw new Error('Usuário não autenticado');
    }
    await db.connect();

    const cart = await Cart.findOne({ user: session.user._id });
    if (!cart) {
      await this.createCart();
    }
    const total_count = await CartItem.countDocuments({
      cart: cart._id,
    }).exec();
    await db.disconnect();

    return {
      total_count: total_count,
    };
  }
  async updateCartItemQuantity(
    itemId: string,
    action: 'add-quantity' | 'remove-quantity',
  ) {
    try {
      const session = await getServerSession(authOptions);

      if (!session || !session.user) {
        throw new Error('Usuário não autenticado');
      }

      await db.connect();

      const cartItem = await CartItem.findById(itemId).exec();

      if (!cartItem) {
        throw new Error('Item do carrinho não encontrado');
      }

      let newQuantity = cartItem.quantity;

      if (action === 'add-quantity') {
        newQuantity += 1;
      } else if (action === 'remove-quantity') {
        newQuantity = Math.max(0, newQuantity - 1);
      }

      await CartItem.updateOne(
        { _id: itemId },
        { quantity: newQuantity },
      ).exec();

      await db.disconnect();

      return {
        total_count: newQuantity,
      };
    } catch (error) {
      await db.disconnect();
      console.error(
        `Erro ao atualizar item do carrinho: ${(error as Error).message}`,
      );
    }
  }
}
