import { initContract } from "@ts-rest/core";

import { aviationStackContract } from "./aviationstack-contract";
import { uploadContract } from "./upload/upload.contract";


export const miscContract = initContract().router({
  aviationStack: aviationStackContract,
  upload: uploadContract,
});
