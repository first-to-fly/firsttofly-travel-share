export const SupplierProfilePermissions = {
  // User level permissions
  "user:supplier-profile:view": {
    name: "View Supplier Profile",
    description: "Can view own Supplier Profile (if applicable, typically not for this entity)",
  },

  // Department level permissions (assuming supplier profiles are not department-specific)
  // If they were, these would be uncommented and adjusted:
  // 'dept:supplier-profile:view': {
  //   name: 'View Department Supplier Profiles',
  //   description: 'Can view Supplier Profiles within their department',
  // },
  // 'dept:supplier-profile:create': {
  //   name: 'Create Department Supplier Profile',
  //   description: 'Can create Supplier Profile within their department',
  // },
  // 'dept:supplier-profile:update': {
  //   name: 'Update Department Supplier Profile',
  //   description: 'Can update Supplier Profile within their department',
  // },
  // 'dept:supplier-profile:delete': {
  //   name: 'Delete Department Supplier Profile',
  //   description: 'Can delete Supplier Profile within their department',
  // },

  // Tenant level permissions
  "tenant:supplier-profile:view": {
    name: "View Tenant Supplier Profiles",
    description: "Can view all Supplier Profiles within the tenant",
  },
  "tenant:supplier-profile:create": {
    name: "Create Tenant Supplier Profile",
    description: "Can create Supplier Profile within the tenant",
  },
  "tenant:supplier-profile:update": {
    name: "Update Tenant Supplier Profile",
    description: "Can update Supplier Profile within the tenant",
  },
  "tenant:supplier-profile:delete": {
    name: "Delete Tenant Supplier Profile",
    description: "Can delete Supplier Profile within the tenant",
  },
};
