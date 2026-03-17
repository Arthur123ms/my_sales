import { IOrder } from "./IOrder";

export interface IOrderPagination {
  per_page: number,
  total: number,
  current_page: number,
  data: IOrder[],
}