export const SupplierPermissions = {
  // User level permissions
  "user:supplier:view": {
    name: "View Supplier",
    description: "Can view own Supplier",
  },

  // Department level permissions
  "dept:supplier:view": {
    name: "View Department Suppliers",
    description: "Can view all Suppliers within the department",
  },
  "dept:supplier:create": {
    name: "Create Department Suppliers",
    description: "Can create Suppliers within the department",
  },
  "dept:supplier:update": {
    name: "Update Department Suppliers",
    description: "Can update Suppliers within the department",
  },
  "dept:supplier:delete": {
    name: "Delete Department Suppliers",
    description: "Can delete Suppliers within the department",
  },

  // Tenant level permissions
  "tenant:supplier:view": {
    name: "View Tenant Suppliers",
    description: "Can view all Suppliers within the tenant",
  },
  "tenant:supplier:create": {
    name: "Create Tenant Suppliers",
    description: "Can create Suppliers within the tenant",
  },
  "tenant:supplier:update": {
    name: "Update Tenant Suppliers",
    description: "Can update Suppliers within the tenant",
  },
  "tenant:supplier:delete": {
    name: "Delete Tenant Suppliers",
    description: "Can delete Suppliers within the tenant",
  },
};
