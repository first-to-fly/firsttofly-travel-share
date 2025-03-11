import { initContract } from "@ts-rest/core";

import { departmentContract } from "./department-contract";
import { locationContract } from "./location-contract";
import { productSettingContract } from "./product/contract";


export const settingsContract = initContract().router({
  product: productSettingContract,
  department: departmentContract,
  location: locationContract,
});
