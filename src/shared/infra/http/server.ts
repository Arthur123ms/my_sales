import app from './app';
import { AppDataSource } from 'src/shared/infra/typeorm/data-source';

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to the database! 🎉');

    app.listen(3333, () => {
      console.log('Server started on port 3333! 🏆');
    });
  })
  .catch(error => {
    console.error('Failed to connect to the database:', error);
  });