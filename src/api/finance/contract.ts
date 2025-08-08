import { initContract } from "@ts-rest/core";

import { billContract } from "./bill-contract";
import { matchDocContract } from "./match-doc-contract";


export const financeContract = initContract().router({
  bill: billContract,
  matchDoc: matchDocContract,
});
