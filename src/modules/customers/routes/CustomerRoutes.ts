import { Router } from 'express';
import CustomerController from '../controllers/CustomerControllers';
import AuthMiddleware from 'src/shared/middlewares/authMiddleawres';
import {
  createCustomerSchema,
  idParamsValidate,
  updateCustomerSchema,
} from '../schema/CustomerSchema';

const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.use(AuthMiddleware.execute);
customerRouter.get('/', customerController.index);
customerRouter.get('/:id', idParamsValidate, customerController.show);
customerRouter.post('/', createCustomerSchema, customerController.create);
customerRouter.patch(
  '/:id',
  idParamsValidate,
  updateCustomerSchema,
  customerController.update,
);
customerRouter.delete('/:id', idParamsValidate, customerController.delete);

export default customerRouter;
