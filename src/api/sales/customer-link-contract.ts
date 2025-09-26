// simple-import-sort
import { initContract } from "@ts-rest/core";

import { customerBookingLinkContract } from "./customer-booking-link-contract";
import { customerPaxContract } from "./customer-pax-contract";


export const customerLinkContract = initContract().router({
  bookingLink: customerBookingLinkContract,
  pax: customerPaxContract,
});
