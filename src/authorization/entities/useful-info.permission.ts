/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const UsefulInfoPermissions = {
  // Tenant scope
  "tenant:useful-info:view": {
    name: "View Useful Info",
    description: "Can view useful info in tenant",
  },
  "tenant:useful-info:create": {
    name: "Create Useful Info",
    description: "Can create useful info in tenant",
  },
  "tenant:useful-info:update": {
    name: "Update Useful Info",
    description: "Can update useful info in tenant",
  },
  "tenant:useful-info:delete": {
    name: "Delete Useful Info",
    description: "Can delete useful info in tenant",
  },
};
