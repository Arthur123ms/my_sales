import { IProducts } from "./IProducts";

export interface IProductPaginate {
  per_page: number,
  current_page: number,
  total: number,
  data: IProducts[]
}