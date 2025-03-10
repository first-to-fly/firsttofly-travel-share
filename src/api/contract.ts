import { initContract } from "@ts-rest/core";

import { i18nContract } from "./i18n/contract";


export const apiContract = initContract().router({
  i18n: i18nContract,
});
