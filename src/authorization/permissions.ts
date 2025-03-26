import { DepartmentPermissions } from "./modules/department.permission";
import { UserPermissions } from "./modules/user.permission";
import type { PermissionDeclaration } from "./permissions.types";


type ExtractObjectKeysRecursive<T> =
  T extends Record<string, unknown> ? keyof T | ExtractObjectKeysRecursive<T[keyof T]> : never;

export type Permission = Exclude<
ExtractObjectKeysRecursive<typeof ModulePermissions>,
keyof typeof ModulePermissions | keyof PermissionDeclaration
>;

const ModulePermissions = {
  user: UserPermissions,
  department: DepartmentPermissions,
} as const;

export type PermissionsModules = keyof typeof ModulePermissions;
export type APermissions = (typeof ModulePermissions)[PermissionsModules];


export const AllPermissions: Record<string, Record<string, PermissionDeclaration>> = ModulePermissions;
