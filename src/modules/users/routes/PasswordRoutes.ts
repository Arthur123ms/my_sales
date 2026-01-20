import { Router } from 'express';
import ForgotPasswordController from '../controller/ForgotPasswordController';
import ResetPasswordController from '../controller/ResetPasswordController';
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from '../schemas/PasswordSchema';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  ForgotPasswordSchema,
  forgotPasswordController.create,
);
passwordRouter.post(
  '/reset',
  ResetPasswordSchema,
  resetPasswordController.create,
);

export default passwordRouter;
