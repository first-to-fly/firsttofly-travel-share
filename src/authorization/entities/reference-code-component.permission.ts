/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const ReferenceCodeComponentPermissions = {
  // User level permissions
  "user:referenceCodeComponent:view": {
    name: "View Reference Code Component",
    description: "Can view reference code component",
  },

  // Department level permissions
  "dept:referenceCodeComponent:view": {
    name: "View Reference Code Component",
    description: "Can view reference code component in department",
  },

  // Tenant level permissions
  "tenant:referenceCodeComponent:view": {
    name: "View Reference Code Component",
    description: "Can view reference code component in tenant",
  },
  "tenant:referenceCodeComponent:create": {
    name: "Create Reference Code Component",
    description: "Can create reference code component in tenant",
  },
  "tenant:referenceCodeComponent:update": {
    name: "Update Reference Code Component",
    description: "Can update reference code component in tenant",
  },
  "tenant:referenceCodeComponent:delete": {
    name: "Delete Reference Code Component",
    description: "Can delete reference code component in tenant",
  },
};
