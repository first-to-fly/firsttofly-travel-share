/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const TermConditionPermissions = {
  // User level permissions
  "user:termCondition:view": {
    name: "View Term & Condition",
    description: "Can view term & condition",
  },

  // Tenant level permissions
  "tenant:termCondition:view": {
    name: "View Term & Condition",
    description: "Can view term & condition in tenant",
  },
  "tenant:termCondition:create": {
    name: "Create Term & Condition",
    description: "Can create term & condition in tenant",
  },
  "tenant:termCondition:update": {
    name: "Update Term & Condition",
    description: "Can update term & condition in tenant",
  },
  "tenant:termCondition:delete": {
    name: "Delete Term & Condition",
    description: "Can delete term & condition in tenant",
  },
};
