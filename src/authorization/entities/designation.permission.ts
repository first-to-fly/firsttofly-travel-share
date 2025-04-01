/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const DesignationPermissions = {
  // User level permissions
  "user:designation:view": {
    name: "View Designation",
    description: "Can view designation",
  },

  // Department level permissions
  "dept:designation:view": {
    name: "View Designation",
    description: "Can view designation in department",
  },

  // Tenant level permissions
  "tenant:designation:view": {
    name: "View Designation",
    description: "Can view designation in tenant",
  },
  "tenant:designation:create": {
    name: "Create Designation",
    description: "Can create designation in tenant",
  },
  "tenant:designation:update": {
    name: "Update Designation",
    description: "Can update designation in tenant",
  },
  "tenant:designation:delete": {
    name: "Delete Designation",
    description: "Can delete designation in tenant",
  },
};
