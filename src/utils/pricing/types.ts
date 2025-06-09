import { TourTransactionPaxType } from "../../entities/Sales/TourTransactionPax";


export interface LineItemPrice {
  quantity: number;
  currency: string;
  unitPrice: number;
  subTotal: number;
}


export interface PaxConfiguration {
  type: TourTransactionPaxType;
  fareType: "full" | "land";
}


export interface CurrencyConversion {
  currency: string;
  rate: number;
}
