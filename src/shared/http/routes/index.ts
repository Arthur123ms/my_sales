import productRouter from '@moodules/products/routes/ProductRoutes';
import { Router } from 'express';

const routes = Router();

routes.get('/health', (request, response) => {
  return response.json({ message: 'Hello Dev' });
});
routes.use('/products', productRouter)

export default routes;
