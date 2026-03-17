import { Router } from 'express';
import ProductsController from '../controller/ProductsController';
import {
  createProductSchema,
  idParamsValidation,
  updateProductSchema,
} from '../schemas/ProductSchemas';

const productRouter = Router();
const productController = new ProductsController();

productRouter.get('/', (req, res) => productController.index(req, res));
productRouter.get('/:id', idParamsValidation, (req, res) =>
  productController.show(req, res),
);
productRouter.post('/', createProductSchema, (req, res) =>
  productController.create(req, res),
);
productRouter.put('/:id', updateProductSchema, (req, res) =>
  productController.update(req, res),
);
productRouter.delete('/:id', idParamsValidation, (req, res) =>
  productController.delete(req, res),
);

export default productRouter;
