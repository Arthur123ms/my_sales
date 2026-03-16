import { Router } from 'express';
import UserController from '../controller/UserControler';
import { createUserSchema } from '../schemas/UserSchema';
import AuthMiddleware from 'src/shared/middlewares/authMiddleawres';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', AuthMiddleware.execute, userController.index);
userRouter.post('/', createUserSchema, userController.create);

export default userRouter;
