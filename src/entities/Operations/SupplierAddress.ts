import { BaseEntityColumns } from "../base";


export interface SupplierAddress extends BaseEntityColumns {
  id: string;
  supplierId: string;
  addressType: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  isDefault: boolean;
}