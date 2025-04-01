/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const CostingTemplatePermissions = {
  // User level permissions
  "user:costing-template:view": {
    name: "View Costing Template",
    description: "Can view costing template",
  },

  // Department level permissions
  "dept:costing-template:view": {
    name: "View Costing Template",
    description: "Can view costing template in department",
  },

  // Tenant level permissions
  "tenant:costing-template:view": {
    name: "View Costing Template",
    description: "Can view costing template in tenant",
  },
  "tenant:costing-template:create": {
    name: "Create Costing Template",
    description: "Can create costing template in tenant",
  },
  "tenant:costing-template:update": {
    name: "Update Costing Template",
    description: "Can update costing template in tenant",
  },
  "tenant:costing-template:delete": {
    name: "Delete Costing Template",
    description: "Can delete costing template in tenant",
  },
};
