import { Order } from '../database/entities/Order';
import AppError from 'src/shared/errors/appError';
import { productsRepositories } from '@moodules/products/database/repositories/ProductsRepositories';
import { customerRespositories } from '@moodules/customers/database/repositories/CustomerRepositories';
import { orderRepositories } from '../database/repositories/OrderRepositories';
import { Product } from '@moodules/products/database/entities/Product';

interface ICreateOrder {
  customer_id: string;
  products: Product[];
}

export class CreateOrderService {
  async execute({ customer_id, products }: ICreateOrder): Promise<Order> {
    const customerExists = await customerRespositories.findById(
      Number(customer_id),
    );

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }

    const existsProducts = await productsRepositories.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistenProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistenProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistenProducts[0]?.id}`,
        404,
      );
    }

    const quantityAvailable = products.filter(product => {
      const existsProduct = existsProducts.find(
        productExisten => productExisten.id === product.id,
      );
      return existsProduct && existsProduct.quantity < product.quantity;
    });

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0]?.quantity}
        is not available for ${quantityAvailable[0]?.id}`,
        409,
      );
    }

    const seriealizedProducts = products.map(product => {
      const productExists = existsProducts.find(
        p => p.id === product.id
      );

      if (!productExists) {
        throw new AppError (`Product ${product.id} not found.`)
      };

      return {
        product_id: product.id,
        quantity: product.quantity,
        price: product.price
      }
    });

    const order = await orderRepositories.createOrder({
      customer: customerExists,
      products: seriealizedProducts,
    });

    const { order_products } = order;

    const updateProductsQuantity = order_products.map(product => {
      const productExists = existsProducts.find(
        p => p.id === product.product.id,
      );

      if (!productExists) {
        throw new AppError('Product not found during update.');
      }

      return {
        id: product.product.id,
        quantity: productExists.quantity - product.quantity
      }


    });

    await productsRepositories.save(updateProductsQuantity)

    return order;
  }
}
