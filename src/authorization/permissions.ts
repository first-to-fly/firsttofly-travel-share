import { DepartmentPermissions } from "./modules/department.permission";
import { ProductPermissions } from "./modules/products.permission";
import { UserPermissions } from "./modules/user.permission";
import type { PermissionDeclaration } from "./permissions.types";


type ExtractObjectKeysRecursive<T> =
  T extends Record<string, unknown> ? keyof T | ExtractObjectKeysRecursive<T[keyof T]> : never;

export type Permission = Exclude<
ExtractObjectKeysRecursive<typeof ModulePermissions>,
keyof typeof ModulePermissions | keyof PermissionDeclaration
>;

const ModulePermissions = {
  "User Management": UserPermissions,
  "Department Management": DepartmentPermissions,
  "Product Management": ProductPermissions,
} as const;

export type PermissionsModules = keyof typeof ModulePermissions;
export type APermissions = (typeof ModulePermissions)[PermissionsModules];


export const AllPermissions: Record<string, Record<string, PermissionDeclaration>> = ModulePermissions;
