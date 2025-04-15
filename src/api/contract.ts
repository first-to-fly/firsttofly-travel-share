import { initContract } from "@ts-rest/core";

import { authorizationContract } from "./authorization/contract";
import { documentContract } from "./document/document-contract";
import { i18nContract } from "./i18n/contract";
import { productsContract } from "./products/contract";
import { settingsContract } from "./settings/contract";
import { termContract } from "./term/term-contract";


export const apiContract = initContract().router({
  i18n: i18nContract,
  products: productsContract,
  settings: settingsContract,
  term: termContract,
  document: documentContract,
  authorization: authorizationContract,
});
