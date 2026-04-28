import { Repository } from 'typeorm';
import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { IOrderRepositories } from '@modules/orders/domain/repositories/IOrderRepositories'
import { AppDataSource } from 'src/shared/infra/typeorm/data-source';
import { IOrder } from '@modules/orders/domain/models/IOrder';
import { IOrderPagination } from '@modules/orders/domain/models/IOrderPagination';
import  { Order }  from '../entities/Order';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

class OrdersRepositories implements IOrderRepositories {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Order);
  }

  public async findById(id: string): Promise<IOrder | null> {
    const order = await this.ormRepository.findOne({
      where: {id} ,
      relations: ['order_products', 'customer'],
    });

    return order;
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IOrderPagination> {
    const [orders, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return {
      per_page: take,
      total: count,
      current_page: page,
      data: orders,
    };
  }

  public async create({ customer, products }: ICreateOrder): Promise<IOrder> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    await this.ormRepository.save(order);

    return order;
  }
}

export default OrdersRepositories;
