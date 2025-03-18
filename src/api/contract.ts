import { initContract } from "@ts-rest/core";

import { authorizationContract } from "./authorization/contract";
import { i18nContract } from "./i18n/contract";
import { productContract } from "./product/contract";
import { settingsContract } from "./settings/contract";


export const apiContract = initContract().router({
  i18n: i18nContract,
  product: productContract,
  settings: settingsContract,
  authorization: authorizationContract,
});
