import { initContract } from "@ts-rest/core";

import { activityContract } from "./activity/activity.contract";
import { authorizationContract } from "./authorization/contract";
import { documentContract } from "./document/document-contract";
import { i18nContract } from "./i18n/contract";
import { iataContract } from "./iata/iata.contract";
import { productsContract } from "./products/contract";
import { settingsContract } from "./settings/contract";
import { termContract } from "./term/term-contract";


export const apiContract = initContract().router({
  activity: activityContract,
  iata: iataContract,
  i18n: i18nContract,
  products: productsContract,
  settings: settingsContract,
  term: termContract,
  document: documentContract,
  authorization: authorizationContract,
});
