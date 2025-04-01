/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const MealPermissions = {
  // Tenant scope
  "tenant:meal:view": {
    name: "View Meal",
    description: "Can view meals in tenant",
  },
  "tenant:meal:create": {
    name: "Create Meal",
    description: "Can create meals in tenant",
  },
  "tenant:meal:update": {
    name: "Update Meal",
    description: "Can update meals in tenant",
  },
  "tenant:meal:delete": {
    name: "Delete Meal",
    description: "Can delete meals in tenant",
  },
};
