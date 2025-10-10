import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";


export const PaymentInfoZ = z.object({
  notes: z.string().nullish(),
  referenceNumber: z.string().nullish(),
}).nullish();

export const SupplierPaymentZ = EntityZ.extend({
  supplierOID: EntityOIDZ,
  bankName: z.string(),
  accountNumber: z.string().nullish(),
  accountName: z.string().nullish(),
  bankCode: z.string().nullish(),
  routingNumber: z.string().nullish(),
  swiftCode: z.string().nullish(),
  iban: z.string().nullish(),
  currencies: z.array(z.string()),
  cnapCode: z.string().nullish(),
  bicCode: z.string().nullish(),
  branchNo: z.string().nullish(),
  branch: z.string().nullish(),
  beneficiaryInfo: z.object({
    name: z.string(),
    uen: z.string().nullish(),
    gst: z.string().nullish(),
  }),
  remarks: z.string().nullish(),
});

export type SupplierPayment = z.infer<typeof SupplierPaymentZ>;
export type PaymentInfo = z.infer<typeof PaymentInfoZ>;

export enum SupplierPaymentEvents {
  SUPPLIER_PAYMENT_UPDATED = "SUPPLIER_PAYMENT_UPDATED",
  SUPPLIER_PAYMENT_LIST_UPDATED = "SUPPLIER_PAYMENT_LIST_UPDATED",
}
