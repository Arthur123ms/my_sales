import { Response, Request } from 'express';
import { container } from 'tsyringe'
import ListOrderService from '@moodules/orders/services/ListOrderService';
import { ShowOrderService } from '@moodules/orders/services/ShowOrderService';
import { CreateOrderService } from '@moodules/orders/services/CreateOrderService';

export default class OrdersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;
    const listOrders = container.resolve(ListOrderService);

    const orders = await listOrders.execute({ page, limit });

    return response.json(orders);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrder = container.resolve(ShowOrderService);

    const order = await showOrder.execute({ id: id! });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      customer_id,
      products,
    });

    return response.json(order);
  }
}