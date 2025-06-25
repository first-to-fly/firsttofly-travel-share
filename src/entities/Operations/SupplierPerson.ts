import { BaseEntityColumns } from "../base";


export interface SupplierPerson extends BaseEntityColumns {
  id: string;
  supplierId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  position?: string;
  department?: string;
  isPrimary: boolean;
}