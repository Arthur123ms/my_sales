import { AppDataSource } from 'src/shared/infra/typeorm/data-source';
import request from 'supertest';
import app from 'src/shared/infra/http/app'

jest.setTimeout(20000);

describe('Create User', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(async () => {
    const entities = AppDataSource.entityMetadatas;

    for (const entity of entities) {
      const repository = AppDataSource.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    }
  });

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('johndoe@example.com');
  });

  it('should not be able to create a user with duplicate email', async () => {
    await request(app).post('/users').send({
      name: 'Jhon Doe',
      email: 'jhondoeduplicate@example.com',
      password: '123456',
    });

    const response = await request(app).post('/users').send({
      name: 'Jhon Doe',
      email: 'jhondoeduplicate@example.com',
      password: '654321',
    });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty(
      'message',
      'Email address already used.',
    );
  });
});
