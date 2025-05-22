import { initContract } from "@ts-rest/core";

import { tourTransactionContract } from "./tour-transaction-contract";


export const salesContract = initContract().router({
  tourTransaction: tourTransactionContract,
});
