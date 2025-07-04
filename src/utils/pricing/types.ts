import { GroupTourBookingPaxType } from "../../entities/Sales/GroupTourBookingPax";


export interface LineItemPrice {
  quantity: number;
  currency: string;
  unitPrice: number;
  subTotal: number;
}


export interface PaxConfiguration {
  type: GroupTourBookingPaxType;
  fareType: "full" | "land";
}


export interface CurrencyConversion {
  currency: string;
  rate: number;
}
