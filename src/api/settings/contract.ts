import { initContract } from "@ts-rest/core";

import { generalSettingContract } from "./general/contract";
import { productSettingContract } from "./product/contract";
import { userManagementContract } from "./user/contract";


export const settingsContract = initContract().router({
  product: productSettingContract,
  general: generalSettingContract,
  userMgmt: userManagementContract,
});
