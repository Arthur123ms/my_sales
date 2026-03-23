import AppError from 'src/shared/errors/appError';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepositories';
import { inject, injectable } from 'tsyringe';


interface IDeleteCustomerService {
  id: number;
}

@injectable()
export default class DeleteCustomerService {
  constructor (
    @inject('CustomerRepository')
    private readonly customerRepositories: ICustomerRepository) { }

  public async execute({ id }: IDeleteCustomerService): Promise<void> {
    const custumer = await this.customerRepositories.findById(id);

    if (!custumer) {
      throw new AppError('Customer not found', 404);
    }

    await this.customerRepositories.remove(custumer);
  }
}
