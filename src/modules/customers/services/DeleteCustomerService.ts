import AppError from 'src/shared/errors/appError';
import { ICustomerRepositories } from '../domain/repositories/ICustomerRepositories';
import { inject, injectable } from 'tsyringe';


interface IDeleteCustomerService {
  id: number;
}

@injectable()
export default class DeleteCustomerService {
  constructor (
    @inject('CustomerRepositories')
    private readonly customerRepositories: ICustomerRepositories) { }

  public async execute({ id }: IDeleteCustomerService): Promise<void> {
    const custumer = await this.customerRepositories.findById(id);

    if (!custumer) {
      throw new AppError('Customer not found', 404);
    }

    await this.customerRepositories.remove(custumer);
  }
}
