import RedisCache from 'src/shared/cache/RedisCache';
import { productsRepositories } from '../database/repositories/ProductsRepositories';
import AppError from 'src/shared/errors/appError';

interface IDeleteProduct {
  id: number;
}

export default class DeleteProductService {
  async execute({ id }: IDeleteProduct): Promise<void> {
    const redisCache = new RedisCache();
    const product = await productsRepositories.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    await redisCache.invalidate('api-my-sales-PRODUCT_LIST');

    await productsRepositories.remove(product);
  }
}
