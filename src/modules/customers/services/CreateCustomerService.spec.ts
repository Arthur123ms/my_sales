import AppError from 'src/shared/errors/appError';
import FakeCustomerRepositories from '../domain/repositories/fake/FakeCustomerRepositories';
import CreateCustomerService from './CreateCustomerService';
import { customerMock } from '../domain/factories/customerFactories';

let fakeCustomerRepositories: FakeCustomerRepositories;
let createCustomer: CreateCustomerService;

describe('CreateCustomerService', () => {
  beforeEach(() => {
    fakeCustomerRepositories = new FakeCustomerRepositories();
    createCustomer = new CreateCustomerService(fakeCustomerRepositories);
  });

  it('should ne able to create a new customer', async () => {
    const customer = await createCustomer.execute(customerMock);

    expect(customer).toHaveProperty('id');
    expect(customer.name).toBe('Jhon Doe');
    expect(customer.email).toBe('jhon@gmail.com');
  });

  it('should not be able to create a new customerwith email that is already in use', async () => {
    const customer = await createCustomer.execute(customerMock);

    await expect(createCustomer.execute(customerMock)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
