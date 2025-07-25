export const DesignationPermissions = {
  // User level permissions (assuming users can be associated with designations, e.g., via a join table)
  "user:designation:view": {
    name: "View Own Designations", // Or a more specific name if the relationship is indirect
    description: "Can view designations they are associated with",
  },

  // Tenant level permissions
  "tenant:designation:view-list": {
    name: "View Tenant Designation List",
    description: "Can view list of designations within the tenant",
  },
  "tenant:designation:view": {
    name: "View Tenant Designations",
    description: "Can view all designations within the tenant",
  },
  "tenant:designation:create": {
    name: "Create Tenant Designation",
    description: "Can create designations within the tenant",
  },
  "tenant:designation:update": {
    name: "Update Tenant Designation",
    description: "Can update designations within the tenant",
  },
  "tenant:designation:delete": {
    name: "Delete Tenant Designation",
    description: "Can delete designations within the tenant",
  },
} as const;
