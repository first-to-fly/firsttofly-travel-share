import { initContract } from "@ts-rest/core";

import { groupTourBookingContract } from "./group-tour-booking-contract";


export const salesContract = initContract().router({
  groupTourBooking: groupTourBookingContract,
});
