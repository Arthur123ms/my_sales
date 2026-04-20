import AppError from 'src/shared/errors/appError';
import { Product } from '../infra/database/entities/Product';
import { injectable, inject } from 'tsyringe';
import { IProductsRepositories } from '../domain/repositories/IProductsRepositories';

interface IRequest {
  id: string;
}


@injectable()
export default class ShowProductService {
  constructor (
    @inject('ProductRepositories')
    private productRepositories: IProductsRepositories
  ) {}
  async execute({ id }: IRequest): Promise<Product>{
    const product = await this.productRepositories.findById(Number(id));

    if (!product) {
      throw new AppError('Product not found!', 404);
    }

    return product as unknown as Product
  }
}
