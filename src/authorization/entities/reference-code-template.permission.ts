/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const ReferenceCodeTemplatePermissions = {
  // User level permissions
  "user:referenceCodeTemplate:view": {
    name: "View Reference Code Template",
    description: "Can view reference code template",
  },

  // Department level permissions
  "dept:referenceCodeTemplate:view": {
    name: "View Reference Code Template",
    description: "Can view reference code template in department",
  },

  // Tenant level permissions
  "tenant:referenceCodeTemplate:view": {
    name: "View Reference Code Template",
    description: "Can view reference code template in tenant",
  },
  "tenant:referenceCodeTemplate:create": {
    name: "Create Reference Code Template",
    description: "Can create reference code template in tenant",
  },
  "tenant:referenceCodeTemplate:update": {
    name: "Update Reference Code Template",
    description: "Can update reference code template in tenant",
  },
  "tenant:referenceCodeTemplate:delete": {
    name: "Delete Reference Code Template",
    description: "Can delete reference code template in tenant",
  },
};
