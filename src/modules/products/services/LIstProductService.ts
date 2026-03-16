import RedisCache from 'src/shared/cache/RedisCache';
import { Product } from '../infra/database/entities/Product';
import { productsRepositories } from '../infra/database/repositories/ProductsRepositories';

export default class ListProductService {
  async execute(): Promise<Product[]> {
    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'api-my-sales-PRODUCT_LIST',
    );

    if (!products) {
      products = await productsRepositories.find();

      await redisCache.save(
        'api-my-sales-PRODUCT_LIST',
        JSON.stringify(products),
      );
    }
    return products;
  }
}
