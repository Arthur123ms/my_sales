import { Customer } from '@moodules/customers/infra/database/entities/Customer';
import { ICreateCustomer } from '../../models/ICreateUser';
import { ICustomer } from '../../models/ICustomer';
import { ICustomerRepository, Pagination } from '../ICustomerRepositories';

export default class FakeCustomerRepositories implements ICustomerRepository {
  public async remove(customer: ICustomer): Promise<void> {
    const index = this.customer.findIndex(c => c.id === customer.id);
    if (index !== -1) {
      this.customer.splice(index, 1);
    }
  }
  public async findAll(): Promise<Customer[] | undefined> {
    return this.customer;
  }

  public async findById(id: number): Promise<Customer | null> {
    const customer = this.customer.find(customer => customer.id === id);
    return customer as Customer | null;
  }
  public async findAndCount(pagination: Pagination): Promise<[ICustomer[], number]> {
    throw new Error('Method not implemented.');
  }
  public async findByName(name: string): Promise<Customer | null> {
    const customer = this.customer.find(customer => customer.name === name);
    return customer as Customer | null;
  }
  private customer: Customer[] = [];

  public async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.customer.find(customer => customer.email === email);
    return customer as Customer | null;
  }
  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    ((customer.id = this.customer.length + 1),
      (customer.name = name),
      (customer.email = email));

    this.customer.push(customer);
    return customer;
  }
  public async save(customer: Customer): Promise<Customer> {
    const findIndex = this.customer.findIndex(
      findCustomer => findCustomer.id === customer.id,
    );

    this.customer[findIndex] = customer;

    return customer;
  }
}
