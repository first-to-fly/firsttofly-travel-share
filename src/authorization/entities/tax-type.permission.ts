import type { PermissionDeclaration } from "../permissions.types";


export const TaxTypePermissions: Record<string, PermissionDeclaration> = {
  // Tenant level permissions
  "tenant:tax-type:view-list": {
    name: "View Tenant Tax Type List",
    description: "Can view list of tax types within the tenant",
  },
  "tenant:tax-type:view": {
    name: "View Tenant Tax Types",
    description: "Can view all Tax Types within the tenant",
  },
};
