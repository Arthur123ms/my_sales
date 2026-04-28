import { Request, Response } from 'express';
import ListProductService from 'src/modules/products/services/LIstProductService';
import ShowProductService from 'src/modules/products/services/ShowProductService';
import CreateProductService from 'src/modules/products/services/CreateProductService';
import UpdateProductService from 'src/modules/products/services/UpdateProductService';
import DeleteProductService from 'src/modules/products/services/DeleteProductService';
import { container } from 'tsyringe'
 
export default class ProductsController {
  async index(request: Request, response: Response): Promise<Response> {
    const { page, skip, take } = request.query;
    const listProductService = container.resolve(ListProductService);
    const products = await listProductService.execute({
      page: Number(page),
      skip: Number(skip),
      take: Number(take)
    });
    return response.json(products);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({ error: 'Missing id' });
    }

    const showProductService = container.resolve( ShowProductService);
    const product = await showProductService.execute({ id });

    return response.json(product);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProductService = container.resolve(CreateProductService);
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

    const updateProductService = container.resolve(UpdateProductService);
    const product = await updateProductService.execute({
      id: Number(id),
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

    const deleteProductService = container.resolve(DeleteProductService);
    await deleteProductService.execute({ id: Number(id) });

    return response.status(204).send();
  }
}
