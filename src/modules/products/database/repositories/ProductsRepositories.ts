import { AppDataSource } from 'src/shared/typeorm/data-source'; //Conecta com o banco de dados
import { Product } from '../entities/Product';

//Cria o repositório de Produtos baseado no banco de dados
export const productsRepositories = AppDataSource.getRepository(Product).extend(
  {
    //Procura o produto pelo nome
    async findByName(name: string): Promise<Product | null> {
      //findOneBy é um  método to TypeOrm que busca um registro pelo campo especificado (no caso 'name')
      return this.findOneBy({ name });
    },
  },
);
