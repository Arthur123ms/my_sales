import AppError from 'src/shared/errors/appError';
import RedisCache from 'src/shared/cache/RedisCache';
import { injectable, inject } from 'tsyringe';
import { IProductsRepositories } from '../domain/repositories/IProductsRepositories';
import { IProducts } from '../domain/models/IProducts';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductsRepositories')
    private productsRepositories: IProductsRepositories
  ) {}
  async execute({ name, price, quantity }: IRequest): Promise<IProducts> {
   
    const productExists = await this.productsRepositories.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name', 409);
    }

    const redisCache = new RedisCache()

    const product = await this.productsRepositories.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate('api-my-sales-PRODUCT_LIST')

    return product;
  }
}
