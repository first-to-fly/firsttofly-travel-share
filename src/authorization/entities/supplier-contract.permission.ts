export const SupplierContractPermissions = {
  // User level permissions (typically not applicable for contracts directly)
  "user:supplier-contract:view": {
    name: "View Supplier Contract",
    description: "Can view own Supplier Contract (if applicable)",
  },

  // Department level permissions (assuming contracts are not department-specific)
  // 'dept:supplier-contract:view': {
  //   name: 'View Department Supplier Contracts',
  //   description: 'Can view Supplier Contracts within their department',
  // },
  // 'dept:supplier-contract:create': {
  //   name: 'Create Department Supplier Contract',
  //   description: 'Can create Supplier Contract within their department',
  // },
  // 'dept:supplier-contract:update': {
  //   name: 'Update Department Supplier Contract',
  //   description: 'Can update Supplier Contract within their department',
  // },
  // 'dept:supplier-contract:delete': {
  //   name: 'Delete Department Supplier Contract',
  //   description: 'Can delete Supplier Contract within their department',
  // },

  // Tenant level permissions
  "tenant:supplier-contract:view": {
    name: "View Tenant Supplier Contracts",
    description: "Can view all Supplier Contracts within the tenant",
  },
  "tenant:supplier-contract:create": {
    name: "Create Tenant Supplier Contract",
    description: "Can create Supplier Contract within the tenant",
  },
  "tenant:supplier-contract:update": {
    name: "Update Tenant Supplier Contract",
    description: "Can update Supplier Contract within the tenant",
  },
  "tenant:supplier-contract:delete": {
    name: "Delete Tenant Supplier Contract",
    description: "Can delete Supplier Contract within the tenant",
  },
};
