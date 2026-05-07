import { In, Repository } from 'typeorm';
import { IProductsRepositories } from '@modules/products/domain/repositories/IProductsRepositories';
import { IFindProducts } from '@modules/products/domain/models/IFindProducts';
import { ICreateProducts } from '@modules/products/domain/models/ICreateProducts';
import { IProductPaginate } from '@modules/products/domain/models/IProductPaginate';
import { AppDataSource } from 'src/shared/infra/typeorm/data-source';
import { Product } from '../entities/Product';
import { IProducts } from '@modules/products/domain/models/IProducts';
import { IUpdateStockProduct } from '@modules/products/domain/models/IUpdateStockProduct ';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

class ProductsRepository implements IProductsRepositories {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProducts): Promise<IProducts> {
    const product = this.ormRepository.create({ name, price, quantity });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: IProducts): Promise<IProducts> {
    await this.ormRepository.save(product);

    return product;
  }

  public async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }

  public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
    await this.ormRepository.save(products);
  }

  public async findByName(name: string): Promise<IProducts | null> {
    const product = await this.ormRepository.findOneBy({
      name,
    });

    return product;
  }

  public async findById(id: string): Promise<IProducts | null> {
    const product = this.ormRepository.findOneBy({ id });

    return product;
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IProductPaginate> {
    const [products, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: products,
    };

    return result;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<IProducts[]> {
    const productIds = products.map(product => product.id);

    const existentProducts = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });

    return existentProducts;
  }
}

export default ProductsRepository;
