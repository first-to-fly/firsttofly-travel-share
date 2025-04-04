export const CostingTemplatePermissions = {
  // User level permissions
  "user:costing-template:view": {
    name: "View Costing Template",
    description: "Can view own Costing Template",
  },
  "user:costing-template:update": {
    name: "Update Costing Template",
    description: "Can update own Costing Template",
  },
  "user:costing-template:delete": {
    name: "Delete Costing Template",
    description: "Can delete own Costing Template",
  },

  // Tenant level permissions
  "tenant:costing-template:view": {
    name: "View Tenant Costing Templates",
    description: "Can view all Costing Templates within the tenant",
  },
  "tenant:costing-template:create": {
    name: "Create Tenant Costing Templates",
    description: "Can create Costing Templates within the tenant",
  },
  "tenant:costing-template:update": {
    name: "Update Tenant Costing Templates",
    description: "Can update Costing Templates within the tenant",
  },
  "tenant:costing-template:delete": {
    name: "Delete Tenant Costing Templates",
    description: "Can delete Costing Templates within the tenant",
  },
};
