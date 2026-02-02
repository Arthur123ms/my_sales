import { Customer } from "../database/entities/Customer";
import { customerRespositories } from "../database/repositories/CustomerRepositories";

export default class LisCustomerService {
  async execute(): Promise<Customer[]> {
    const customer = customerRespositories.find()

    return customer
  }
}
