import RedisCache from 'src/shared/cache/RedisCache';
import { IProductsRepositories } from '../domain/repositories/IProductsRepositories';
import { inject, injectable } from 'tsyringe';
import { SearchParams } from '@modules/users/infra/database/repositories/UserRepositories';
import { IProductPaginate } from '../domain/models/IProductPaginate';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepositories,
  ) {}
  public async execute({
    page,
    skip,
    take,
  }: SearchParams): Promise<IProductPaginate> {
    const redisCache = new RedisCache();

    let products = await redisCache.recover<IProductPaginate>(
      'api-vendas-PRODUCT_LIST',
    );

    if (!products) {
      products = await this.productsRepository.findAll({ page, skip, take });

      await redisCache.save('api-vendas-PRODUCT_LIST', JSON.stringify(products));
    }

    return products as IProductPaginate;
  }
}

export default ListProductService;