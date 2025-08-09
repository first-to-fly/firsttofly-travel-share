/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const AccountCodePermissions = {
  // Department level permissions
  "dept:account-code:view": {
    name: "View Department Account Codes",
    description: "Can view Account Codes within their department",
  },
  "dept:account-code:create": {
    name: "Create Department Account Code",
    description: "Can create Account Code within their department",
  },
  "dept:account-code:update": {
    name: "Update Department Account Code",
    description: "Can update Account Code within their department",
  },
  "dept:account-code:delete": {
    name: "Delete Department Account Code",
    description: "Can delete Account Code within their department",
  },

  // Tenant level permissions
  "tenant:account-code:view-list": {
    name: "View Tenant Account Code List",
    description: "Can view list of account codes within the tenant",
  },
  "tenant:account-code:view": {
    name: "View Tenant Account Codes",
    description: "Can view all Account Codes within the tenant",
  },
  "tenant:account-code:create": {
    name: "Create Tenant Account Code",
    description: "Can create Account Code within the tenant",
  },
  "tenant:account-code:update": {
    name: "Update Tenant Account Code",
    description: "Can update Account Code within the tenant",
  },
  "tenant:account-code:delete": {
    name: "Delete Tenant Account Code",
    description: "Can delete Account Code within the tenant",
  },
  "tenant:account-code:sync-xero": {
    name: "Sync Account Codes from Xero",
    description: "Can sync account codes from Xero accounting system",
  },
  "tenant:account-code:manage-defaults": {
    name: "Manage Default Account Codes",
    description: "Can manage default account codes for the tenant",
  },
  // Add other permissions as needed
};
