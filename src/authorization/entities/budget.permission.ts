export const BudgetPermissions = {
  // User level permissions
  "user:budget:view": {
    name: "View Budget",
    description: "Can view own Budget",
  },

  // Department level permissions
  "dept:budget:view": {
    name: "View Department Budgets",
    description: "Can view Budgets within their department",
  },
  "dept:budget:create": {
    name: "Create Department Budget",
    description: "Can create Budget within their department",
  },
  "dept:budget:update": {
    name: "Update Department Budget",
    description: "Can update Budget within their department",
  },
  "dept:budget:delete": {
    name: "Delete Department Budget",
    description: "Can delete Budget within their department",
  },

  // Tenant level permissions
  "tenant:budget:view": {
    name: "View Tenant Budgets",
    description: "Can view all Budgets within the tenant",
  },
  "tenant:budget:create": {
    name: "Create Tenant Budgets",
    description: "Can create Budgets within the tenant",
  },
  "tenant:budget:update": {
    name: "Update Tenant Budgets",
    description: "Can update Budgets within the tenant",
  },
  "tenant:budget:delete": {
    name: "Delete Tenant Budgets",
    description: "Can delete Budgets within the tenant",
  },
};
