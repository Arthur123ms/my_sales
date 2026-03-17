import { ICustomer } from "@moodules/customers/domain/models/ICustomer";
import { ICreateOrderProducts } from "./ICreateOrderProducts";

export interface ICreateOrder {
  customer: ICustomer,
  products: ICreateOrderProducts[];
}