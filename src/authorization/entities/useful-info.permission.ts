export const UsefulInfoPermissions = {
  // User level permissions
  "user:useful-info:view": {
    name: "View Own Useful Info",
    description: "Can view useful info they created or are associated with",
  },
  "user:useful-info:update": {
    name: "Update Own Useful Info",
    description: "Can update useful info they created or are associated with",
  },
  "user:useful-info:delete": {
    name: "Delete Own Useful Info",
    description: "Can delete useful info they created or are associated with",
  },

  // Tenant level permissions
  "tenant:useful-info:view": {
    name: "View Tenant Useful Info",
    description: "Can view all useful info within the tenant",
  },
  "tenant:useful-info:create": {
    name: "Create Tenant Useful Info",
    description: "Can create useful info within the tenant",
  },
  "tenant:useful-info:update": {
    name: "Update Tenant Useful Info",
    description: "Can update useful info within the tenant",
  },
  "tenant:useful-info:delete": {
    name: "Delete Tenant Useful Info",
    description: "Can delete useful info within the tenant",
  },
} as const;
