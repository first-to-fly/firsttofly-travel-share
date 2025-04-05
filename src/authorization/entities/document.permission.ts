export const DocumentPermissions = {
  // User level permissions
  "user:document:view": {
    name: "View Own Document",
    description: "Can view own documents",
  },
  "user:document:update": {
    name: "Update Own Document",
    description: "Can update own documents",
  },
  "user:document:delete": {
    name: "Delete Own Document",
    description: "Can delete own documents",
  },

  // Tenant level permissions
  "tenant:document:view": {
    name: "View Tenant Documents",
    description: "Can view all documents within the tenant",
  },
  "tenant:document:create": {
    name: "Create Tenant Document",
    description: "Can create documents within the tenant",
  },
  "tenant:document:update": {
    name: "Update Tenant Document",
    description: "Can update any document within the tenant",
  },
  "tenant:document:delete": {
    name: "Delete Tenant Document",
    description: "Can delete any document within the tenant",
  },
} as const;
