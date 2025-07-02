import { initContract } from "@ts-rest/core";

import { groupTourBookingContract } from "./group-tour-booking-contract";
import { transactionContract } from "./transaction-contract";


export const salesContract = initContract().router({
  groupTourBooking: groupTourBookingContract,
  transaction: transactionContract,
});
