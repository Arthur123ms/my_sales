import { Router } from 'express';
import SessionControllers from '../controller/SessionControllers';
import { sessionSchemaValidation } from '../schemas/SessionSchema';

const sessionRouter = Router();
const sessionController = new SessionControllers();

sessionRouter.post('/', sessionSchemaValidation, sessionController.create)

export default sessionRouter