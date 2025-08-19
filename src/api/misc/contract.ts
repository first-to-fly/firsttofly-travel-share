import { initContract } from "@ts-rest/core";

import { airlineMealCodeContract } from "./airline-meal-code-contract";
import { aviationStackContract } from "./aviationstack-contract";
import { uploadContract } from "./upload/upload.contract";


export const miscContract = initContract().router({
  airlineMealCode: airlineMealCodeContract,
  aviationStack: aviationStackContract,
  upload: uploadContract,
});
