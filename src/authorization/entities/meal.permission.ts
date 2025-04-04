export const MealPermissions = {
  // User level permissions (based on createdBy)
  "user:meal:view": {
    name: "View Own Meal",
    description: "Can view meals created by the user",
  },
  "user:meal:update": {
    name: "Update Own Meal",
    description: "Can update meals created by the user",
  },
  "user:meal:delete": {
    name: "Delete Own Meal",
    description: "Can delete meals created by the user",
  },

  // Tenant level permissions
  "tenant:meal:view": {
    name: "View Tenant Meals",
    description: "Can view all Meals within the tenant",
  },
  "tenant:meal:create": {
    name: "Create Tenant Meal",
    description: "Can create Meals within the tenant",
  },
  "tenant:meal:update": {
    name: "Update Tenant Meals",
    description: "Can update any Meal within the tenant",
  },
  "tenant:meal:delete": {
    name: "Delete Tenant Meals",
    description: "Can delete any Meal within the tenant",
  },
} as const;
