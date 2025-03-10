import { initContract } from "@ts-rest/core";

import { productSettingContract } from "./product/contract";


export const settingsContract = initContract().router({
  product: productSettingContract,
});
