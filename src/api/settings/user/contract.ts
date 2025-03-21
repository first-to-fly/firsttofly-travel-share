import { initContract } from "@ts-rest/core";

import { basicUserContract } from "./user-contract";


export const userContract = initContract().router({
  basic: basicUserContract,
});
