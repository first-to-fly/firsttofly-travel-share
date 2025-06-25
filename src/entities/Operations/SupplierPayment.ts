interface BaseEntityColumns {
  createdAt: string;
  updatedAt?: string;
  createdBy: string;
  updatedBy?: string;
}

export interface SupplierPayment extends BaseEntityColumns {
  id: string;
  supplierId: string;
  paymentType: string;
  accountName?: string;
  accountNumber?: string;
  bankName?: string;
  bankCode?: string;
  swiftCode?: string;
  routingNumber?: string;
  isDefault: boolean;
}