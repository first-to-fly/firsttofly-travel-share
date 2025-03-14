import { initContract } from "@ts-rest/core";

import { departmentContract } from "./department-contract";
import { locationContract } from "./location-contract";
import { privacyPolicyContract } from "./privacy-policy-contract";
import { productSettingContract } from "./product/contract";
import { userContract } from "./user-contract";


export const settingsContract = initContract().router({
  product: productSettingContract,
  department: departmentContract,
  location: locationContract,
  privacyPolicy: privacyPolicyContract,
  user: userContract,
});
