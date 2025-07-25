export const BadgePermissions = {
  // User level permissions (Creator)
  "user:badge:view": {
    name: "View Own Badge",
    description: "Can view badges they created",
  },
  "user:badge:create": { // Added missing create permission for user scope
    name: "Create Own Badge",
    description: "Can create badges (implicitly linked to user)",
  },
  "user:badge:update": {
    name: "Update Own Badge",
    description: "Can update badges they created",
  },
  "user:badge:delete": {
    name: "Delete Own Badge",
    description: "Can delete badges they created",
  },

  // Tenant level permissions
  "tenant:badge:view-list": {
    name: "View Tenant Badge List",
    description: "Can view list of badges within the tenant",
  },
  "tenant:badge:view": {
    name: "View Tenant Badges",
    description: "Can view all badges within the tenant",
  },
  "tenant:badge:create": {
    name: "Create Tenant Badges",
    description: "Can create badges within the tenant",
  },
  "tenant:badge:update": {
    name: "Update Tenant Badges",
    description: "Can update any badge within the tenant",
  },
  "tenant:badge:delete": {
    name: "Delete Tenant Badges",
    description: "Can delete any badge within the tenant",
  },
} as const;
