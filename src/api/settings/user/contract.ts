import { initContract } from "@ts-rest/core";

import { departmentContract } from "./department-contract";
import { designationContract } from "./designation-contract";
import { userContract } from "./user-contract";


export const userManagementContract = initContract().router({
  user: userContract,
  departmentContract: departmentContract,
  designationContract: designationContract,
});
