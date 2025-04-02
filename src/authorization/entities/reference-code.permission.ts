/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const ReferenceCodePermissions = {
  // User level permissions
  "user:referenceCode:view": {
    name: "View Reference Code",
    description: "Can view reference code",
  },

  // Department level permissions
  "dept:referenceCode:view": {
    name: "View Reference Code",
    description: "Can view reference code in department",
  },

  // Tenant level permissions
  "tenant:referenceCode:view": {
    name: "View Reference Code",
    description: "Can view reference code in tenant",
  },
  "tenant:referenceCode:create": {
    name: "Create Reference Code",
    description: "Can create reference code in tenant",
  },
  "tenant:referenceCode:update": {
    name: "Update Reference Code",
    description: "Can update reference code in tenant",
  },
  "tenant:referenceCode:delete": {
    name: "Delete Reference Code",
    description: "Can delete reference code in tenant",
  },
};
