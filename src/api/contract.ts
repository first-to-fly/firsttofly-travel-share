import { initContract } from "@ts-rest/core";

import { activityContract } from "./activity/activity.contract";
import { authorizationContract } from "./authorization/contract";
import { documentContract } from "./document/document-contract";
import { i18nContract } from "./i18n/contract";
import { miscContract } from "./misc/contract";
import { operationsContract } from "./operations/contract";
import { productsContract } from "./products/contract";
import { salesContract } from "./sales/contract";
import { settingsContract } from "./settings/contract";


export const apiContract = initContract().router({
  activity: activityContract,
  i18n: i18nContract,
  products: productsContract,
  operations: operationsContract,
  sales: salesContract,
  settings: settingsContract,
  document: documentContract,
  authorization: authorizationContract,
  misc: miscContract,
});
