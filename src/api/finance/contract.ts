import { initContract } from "@ts-rest/core";

import { billContract } from "./bill-contract";


export const financeContract = initContract().router({
  bill: billContract,
});
