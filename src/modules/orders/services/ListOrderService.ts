import { injectable, inject } from "tsyringe";
import { IOrderPagination } from "../domain/models/IOrderPagination";
import { IOrderRepositories } from "../domain/repositories/IOrderRepositories";

interface SearchParams {
  page: number,
  limit: number
}

@injectable()
export default class ListOrderService{
  constructor (
    @inject('OrderRepositories')
    private ordersRepositories: IOrderRepositories
  ) {}

  public async execute({ page, limit }: SearchParams): Promise<IOrderPagination> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const order = await this.ordersRepositories.findAll({
      take,
      skip,
      page
    })

    return order;
  }
} 