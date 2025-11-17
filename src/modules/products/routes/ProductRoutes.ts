import { Router } from 'express'
import ProductsController from '../controller/ProductsController'

const productRouter = Router()
const productController = new ProductsController()

productRouter.get('/', (req, res) => productController.index(req, res))
productRouter.get('/:id', (req, res) => productController.show(req, res))
productRouter.post('/', (req, res) => productController.create(req, res))
productRouter.put('/:id', (req, res) => productController.update(req, res))
productRouter.delete('/:id', (req, res) => productController.delete(req, res))

export default productRouter
