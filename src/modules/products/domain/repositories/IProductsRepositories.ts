import { IProducts } from '../models/IProducts';
import { IProductPaginate } from '../models/IProductPaginate';
import { IFindProducts } from '../models/IFindProducts';
import { ICreateProducts } from '../models/ICreateProducts';
import { IUpdateStockProduct } from '../models/IUpdateStockProduct ';


type SearchParams = {
  take: number,
  skip: number,
  page: number

}


export interface IProductsRepositories {
  findByName(name: string): Promise<IProducts | null>
  findById(id: number): Promise<IProducts | null>
  findAll({ page, take, skip }: SearchParams): Promise<IProductPaginate>
  findAllByIds(products: IFindProducts[]): Promise<IProducts[]>
  create(data: ICreateProducts): Promise<IProducts>
  save(product: IProducts): Promise<IProducts>
  updateStock(products: IUpdateStockProduct[]): Promise<void>
  remove(products: IProducts): Promise<void>
}