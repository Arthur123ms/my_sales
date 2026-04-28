import AppError from 'src/shared/errors/appError';
import { Product } from '../infra/database/entities/Product';
import RedisCache from 'src/shared/cache/RedisCache';
import { injectable, inject } from 'tsyringe';
import { IProductsRepositories } from '../domain/repositories/IProductsRepositories';

interface IRequest {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@injectable()
export default class UpdateProductService {
  constructor(
    @inject('ProductRepositories')
    private productsRepositories: IProductsRepositories,
  ) {}
  async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    const product = await this.productsRepositories.findById(id);

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    const productExixts = await this.productsRepositories.findByName(name);

    if (productExixts && name != product.name) {
      throw new AppError('The is already one product with this name', 409);
    }

    const redisCache = new RedisCache();

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await this.productsRepositories.save(product);

    await redisCache.invalidate('api-my-sales-PRODUCT_LIST');

    return product as unknown as Product;
  }
}
