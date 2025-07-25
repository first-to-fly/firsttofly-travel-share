export const TermConditionPermissions = {
  // User level permissions
  "user:term-condition:view": {
    name: "View Own Term Conditions",
    description: "Can view term conditions they created or are associated with",
  },
  "user:term-condition:update": {
    name: "Update Own Term Conditions",
    description: "Can update term conditions they created or are associated with",
  },
  "user:term-condition:delete": {
    name: "Delete Own Term Conditions",
    description: "Can delete term conditions they created or are associated with",
  },

  // Tenant level permissions
  "tenant:term-condition:view-list": {
    name: "View Tenant Term Condition List",
    description: "Can view list of term conditions within the tenant",
  },
  "tenant:term-condition:view": {
    name: "View Tenant Term Conditions",
    description: "Can view all term conditions within the tenant",
  },
  "tenant:term-condition:create": {
    name: "Create Tenant Term Conditions",
    description: "Can create term conditions within the tenant",
  },
  "tenant:term-condition:update": {
    name: "Update Tenant Term Conditions",
    description: "Can update term conditions within the tenant",
  },
  "tenant:term-condition:delete": {
    name: "Delete Tenant Term Conditions",
    description: "Can delete term conditions within the tenant",
  },
} as const;
