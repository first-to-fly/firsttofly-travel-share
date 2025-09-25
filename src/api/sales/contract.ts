import { initContract } from "@ts-rest/core";

import { customerLinkContract } from "./customer-link-contract";
import { groupTourBookingContract } from "./group-tour-booking-contract";
import { independentTourBookingContract } from "./independent-tour-booking-contract";
import { paymentOrderContract } from "./payment-order-contract";
import { transactionContract } from "./transaction-contract";


export const salesContract = initContract().router({
  customer: customerLinkContract,
  groupTourBooking: groupTourBookingContract,
  independentTourBooking: independentTourBookingContract,
  paymentOrder: paymentOrderContract,
  transaction: transactionContract,
});
