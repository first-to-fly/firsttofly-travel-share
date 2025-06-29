import { initContract } from "@ts-rest/core";

import { bookingContract } from "./booking-contract";


export const salesContract = initContract().router({
  booking: bookingContract,
});
