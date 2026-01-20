import { Router } from 'express';
import ProfileController from '../controller/ProfileControllers';
import AuthMiddleware from 'src/shared/middlewares/authMiddleawres';
import { updateUserSchema } from '../schemas/UpdateUserSchema';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(AuthMiddleware.execute);
profileController.get('/', profileController.show);
profileController.patch('/', updateUserSchema, profileController.update);

export default profileRouter;
