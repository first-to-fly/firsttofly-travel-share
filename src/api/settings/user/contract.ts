import { initContract } from "@ts-rest/core";

import { departmentContract } from "./department-contract";
import { designationContract } from "./designation-contract";
import { roleContract } from "./role-contract";
import { userContract } from "./user-contract";


export const userManagementContract = initContract().router({
  user: userContract,
  department: departmentContract,
  designation: designationContract,
  roles: roleContract,
});
