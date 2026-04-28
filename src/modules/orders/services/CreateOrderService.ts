import AppError from 'src/shared/errors/appError';;
import { Product } from '@modules/products/infra/database/entities/Product';
import { injectable, inject } from 'tsyringe';
import { IOrderRepositories } from '../domain/repositories/IOrderRepositories';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepositories';
import { IOrder } from '../domain/models/IOrder';

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
    private customerRepositories: ICustomerRepository,
    @inject('ProductsRepositories')
    private productRepositories: IProductsRepositories,
  ) {}

  async execute({ customer_id, products }: IRequest): Promise<IOrder> {
    const customerExists = await this.ordersRepositories.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }

    const existsProducts = await this.productRepositories.findAllByIds(products);

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

    const quantityAvailable = products.filter(
      product => 
      existsProducts.filter((p => p.id === id)[0].quantity < product.quantity,
    ));
     
  
    if (quantityAvailable.length) {
      throw new AppError
        (`The quantity ${quantityAvailable[0]?.quantity}
        is not availabel fpr ${quantityAvailable[0]?.id} `, 409);
    }

    const seriealizedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await this.ordersRepositories.create({
      customer: customerExists,
      products: seriealizedProducts,
    });

    const { order_products } = order;

    const updateProductsQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity: existsProducts.filter(p => p.id === product.product_id)[0].quantity -
      product.quantity,
    }));

    await this.productRepositories.updateStock(updateProductsQuantity);

    return order;
  }
}
