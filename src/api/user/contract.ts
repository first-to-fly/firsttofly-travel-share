import { initContract } from "@ts-rest/core";

import { userMessageContract } from "./user-message-contract";


export const userContract = initContract().router({
  message: userMessageContract,
});