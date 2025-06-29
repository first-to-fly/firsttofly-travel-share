import { BookingPaxType } from "../../entities/Sales/BookingPax";


export interface LineItemPrice {
  quantity: number;
  currency: string;
  unitPrice: number;
  subTotal: number;
}


export interface PaxConfiguration {
  type: BookingPaxType;
  fareType: "full" | "land";
}


export interface CurrencyConversion {
  currency: string;
  rate: number;
}
