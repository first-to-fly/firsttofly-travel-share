/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const ReferenceCodeTreePermissions = {
  // User level permissions
  "user:referenceCodeTree:view": {
    name: "View Reference Code Tree",
    description: "Can view reference code tree",
  },

  // Department level permissions
  "dept:referenceCodeTree:view": {
    name: "View Reference Code Tree",
    description: "Can view reference code tree in department",
  },

  // Tenant level permissions
  "tenant:referenceCodeTree:view": {
    name: "View Reference Code Tree",
    description: "Can view reference code tree in tenant",
  },
  "tenant:referenceCodeTree:create": {
    name: "Create Reference Code Tree",
    description: "Can create reference code tree in tenant",
  },
  "tenant:referenceCodeTree:update": {
    name: "Update Reference Code Tree",
    description: "Can update reference code tree in tenant",
  },
  "tenant:referenceCodeTree:delete": {
    name: "Delete Reference Code Tree",
    description: "Can delete reference code tree in tenant",
  },
};
