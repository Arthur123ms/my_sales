import { Request, Response } from 'express';
import ListProductService from '../services/LIstProductService';
import ShowProductService from '../services/ShowProductService';
import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';
import { Product } from '../database/entities/Product';
import DeleteProductService from '../services/DeleteProductService';

export default class ProductsController {
  async index(request: Request, response: Response): Promise<Response> {
    const listProductService = new ListProductService();
    const products = await listProductService.execute();
    return response.json(products);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    if (!id) {
      return response.status(400).json({ error: 'Missing id' });
    }
    const showProductService = new ShowProductService();
    const products = await showProductService.execute({ id });
    return response.json(products);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const createProductService = new CreateProductService();
    const product = await createProductService.execute({
      name,
      price,
      quantity,
    });
    return response.json(product);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    if (!id) {
      return response.status(400).json({ error: 'Missing id' });
    }
    const { name, price, quantity } = request.body;
    const updateProductService = new UpdateProductService();
    const product = await updateProductService.execute({
      id,
      name,
      price,
      quantity,
    });
    return response.json(product);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    if (!id) {
      return response.status(400).json({ error: 'Missing id' });
    }
    const deleteProductService = new DeleteProductService();
    await deleteProductService.execute({ id });
    return response.status(204).send();
  }
}
