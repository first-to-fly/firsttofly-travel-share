/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const InsuranceDiscountPermissions = {
  // User level permissions
  "user:insurance-discount:view": {
    name: "View Insurance Discount",
    description: "Can view insurance discount",
  },

  // Tenant level permissions
  "tenant:insurance-discount:view": {
    name: "View Insurance Discount",
    description: "Can view insurance discount in tenant",
  },
  "tenant:insurance-discount:create": {
    name: "Create Insurance Discount",
    description: "Can create insurance discount in tenant",
  },
  "tenant:insurance-discount:update": {
    name: "Update Insurance Discount",
    description: "Can update insurance discount in tenant",
  },
  "tenant:insurance-discount:delete": {
    name: "Delete Insurance Discount",
    description: "Can delete insurance discount in tenant",
  },
};
