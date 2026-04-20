import { Router } from 'express';
import OrderController from 'src/modules/orders/infra/http/controller/OrderControllers';
import AuthMiddleware from 'src/shared/middlewares/authMiddleawres';
import { createOrderValidate, idParams } from '../schemas/OrderSchema';

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.use(AuthMiddleware.execute);

orderRouter.get('/:id', idParams, orderController.show);
orderRouter.post('/', createOrderValidate, orderController.create);
export default orderRouter;
