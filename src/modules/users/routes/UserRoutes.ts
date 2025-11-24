import { Router } from 'express';
import UserController from '../controller/UserControler';
import { createUserSchema } from '../schemas/UserSchema';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', userController.index);
userRouter.post('/', createUserSchema, userController.create);

export default userRouter;
