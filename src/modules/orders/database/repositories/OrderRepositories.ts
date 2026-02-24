import { AppDataSource } from 'src/shared/typeorm/data-source';
import { Order } from '../entities/Order';
import { Customer } from '@moodules/customers/database/entities/Customer';
import { OrdersProducts } from '../entities/OrdersProducts';

interface ICreateOrder {
  customer: Customer;
  products: ICreateOrderProducts[];
}

interface ICreateOrderProducts {
  product_id: number,
  price: number,
  quantity: number
}

export const orderRepositories = AppDataSource.getRepository(Order).extend({
  async findById(id: number): Promise<Order | null> {
    const order = await this.findOne({
      where: { id },
      relations: ['orders_products', 'customers'],
    });

    return order;
  },

  async createOrder({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });

    await this.save(order);

    return order;
  },
});
