import AppError from 'src/shared/errors/appError';
import { Product } from '@modules/products/infra/database/entities/Product';
import { injectable, inject } from 'tsyringe';
import { IOrderRepositories } from '../domain/repositories/IOrderRepositories';
import { IOrder } from '../domain/models/IOrder';
import { ICustomerRepositories } from '@modules/customers/domain/repositories/ICustomerRepositories';
import { IProductsRepositories } from '@modules/products/domain/repositories/IProductsRepositories';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: Product[];
}

@injectable()
export class CreateOrderService {
  constructor(
    @inject('OrdersRepositories')
    private ordersRepositories: IOrderRepositories,
    @inject('CustomerRepositories')
    private customerRepositories: ICustomerRepositories,
    @inject('ProductsRepositories')
    private productsRepositories: IProductsRepositories,
  ) {}

  async execute({ customer_id, products }: IRequest): Promise<IOrder> {
    const customerExists = await this.customerRepositories.findById(Number(customer_id))

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }

    const existsProducts =
      await this.productsRepositories.findAllByIds(products);

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
      const existing = existsProducts.find(p => p.id === product.id);
      if (!existing) return false;

      return existing.quantity < product.quantity;
    });

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0]?.quantity}
        is not availabel fpr ${quantityAvailable[0]?.id} `,
        409,
      );
    }

    const seriealizedProducts = products.map(product => {
      const existing = existsProducts.find(p => p.id === product.id);

      if (!existing) {
        throw new AppError(`Produto não encontrado ${product.id}`);
      }

      return {
        product_id: String(product.id),
        quantity: product.quantity,
        price: existing.price,
      };
    });

    const order = await this.ordersRepositories.create({
      customer: customerExists,
      products: seriealizedProducts,
    });

    const { order_products } = order;

    const updateProductsQuantity = order_products.map(product => {
      const existing = existsProducts.find(
        p => p.id === (product.product_id),
      );

      if (!existing) {
        throw new AppError(`Produto não econtrado: ${product.product_id}`);
      }

      if (existing.quantity < product.quantity) {
        throw new AppError(
          `Estoque insuficente para o produto ${product.product_id}`,
        );
      }

      return {
        id: (product.product_id),
        quantity: existing.quantity - product.quantity,
      };
    });

    await this.productsRepositories.updateStock(updateProductsQuantity);

    return order;
  }
}
