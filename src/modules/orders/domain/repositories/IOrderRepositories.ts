import { ICreateOrder } from "../models/ICreateOrder";
import { IOrder } from "../models/IOrder";
import { IOrderPagination } from "../models/IOrderPagination";

type SearchParams = {
  page: number,
  skip: number,
  take: number
};

export interface IOrderRepositories {
  findById(id: string): Promise<IOrder | null>
  findAll({ page, skip, take }: SearchParams): Promise<IOrderPagination>
  create(data: ICreateOrder): Promise<IOrder>
}