import AppError from 'src/shared/errors/appError';
import { injectable, inject } from 'tsyringe';
import { IOrder } from '../domain/models/IOrder';
import { IOrderRepositories } from '../domain/repositories/IOrderRepositories';

interface IRequest {
  id: string,
}

@injectable()
export class ShowOrderService {
  constructor(
    @inject('OrdersRepositories')
    private ordersRepositories: IOrderRepositories,
  ) {}
  async execute({ id }: IRequest): Promise<IOrder> {
    const order = await this.ordersRepositories.findById(id);

    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}
