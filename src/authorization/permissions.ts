import { DepartmentPermissions } from "./modules/department.permission";
import { ProductPermissions } from "./modules/products.permission";
import { UserPermissions } from "./modules/user.permission";
import type { PermissionDeclaration } from "./permissions.types";


type ExtractObjectKeysRecursive<T> =
  T extends Record<string, unknown> ? keyof T | ExtractObjectKeysRecursive<T[keyof T]> : never;

export type Permission = Exclude<
ExtractObjectKeysRecursive<typeof EntityPermissions>,
keyof typeof EntityPermissions | keyof PermissionDeclaration
>;

const EntityPermissions = {
  User: UserPermissions,
  Department: DepartmentPermissions,
  Product: ProductPermissions,
} as const;

export type PermissionsModules = keyof typeof EntityPermissions;
export type APermissions = (typeof EntityPermissions)[PermissionsModules];


export const AllPermissions: Record<string, Record<string, PermissionDeclaration>> = EntityPermissions;
