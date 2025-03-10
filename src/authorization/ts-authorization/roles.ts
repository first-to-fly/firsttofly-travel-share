import { fromArrayToDict } from "../../utils/arrayUtils";


export enum UserRole {

  //  GLOBAL ROLES
  ANONYMOUS = "anonymous",
  AUTHENTICATED_USER = "authenticated-user",
  ADMIN = "admin",

}

export type GlobalRole =
  UserRole.ANONYMOUS |
  UserRole.AUTHENTICATED_USER |
  UserRole.ADMIN;

const roleDict = fromArrayToDict(Object.values(UserRole));
export const isUserRole = (roleID: string): roleID is UserRole => (
  !!roleDict[roleID as UserRole]
);
