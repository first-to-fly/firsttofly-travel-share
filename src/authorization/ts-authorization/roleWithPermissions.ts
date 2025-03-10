import { Permissions } from "./permissions";
import { UserRole } from "./roles";


export const ROLE_PERMISSIONS: Record<UserRole, Permissions[]> = {
  [UserRole.ADMIN]: [],

  [UserRole.AUTHENTICATED_USER]: [],

  [UserRole.ANONYMOUS]: [],

};
