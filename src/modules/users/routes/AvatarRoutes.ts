import { Router } from 'express';
import UpdateAvatarController from '../controller/UpdateAvatarControllers';
import multer from 'multer';
import AuthMiddleware from 'src/shared/middlewares/authMiddleawres';
import uploadConfig from '@config/upload'

const avatarRouter = Router();
const userAvatarCOntroller = new UpdateAvatarController();
const upload = multer(uploadConfig);

avatarRouter.patch(
  '/',
  AuthMiddleware.execute,
  upload.single('avatar'),
  userAvatarCOntroller.update,
);

export default avatarRouter;
