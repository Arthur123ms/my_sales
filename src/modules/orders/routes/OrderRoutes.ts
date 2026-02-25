import { Router } from 'express';
import { OrderControllers } from '../controller/OrderControllers';
import AuthMiddleware from 'src/shared/middlewares/authMiddleawres';
import { createOrderValidate, idParams } from '../schemas/OrderSchema';

const orderRouter = Router();
const orderController = new OrderControllers();

orderRouter.use(AuthMiddleware.execute);

orderRouter.get('/:id', idParams, orderController.show);
orderRouter.post('/', createOrderValidate, orderController.create);
export default orderRouter;
