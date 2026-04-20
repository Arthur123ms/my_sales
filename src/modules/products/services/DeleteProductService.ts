import RedisCache from 'src/shared/cache/RedisCache';
import { IProductsRepositories } from '../domain/repositories/IProductsRepositories';
import AppError from 'src/shared/errors/appError';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteProductService {
  constructor(
    @inject('ProductsRepositories')
    private productsRepositories: IProductsRepositories,
  ) {}
  async execute({ id }: IRequest): Promise<void> {
    const product = await this.productsRepositories.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-my-sales-PRODUCT_LIST');

    await this.productsRepositories.remove(product);
  }
}
