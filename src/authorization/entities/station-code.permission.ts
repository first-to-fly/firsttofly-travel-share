export const StationCodePermissions = {
  // User level permissions
  "user:station-code:view": {
    name: "View Own Station Codes",
    description: "Can view station codes they created or are associated with",
  },
  "user:station-code:update": {
    name: "Update Own Station Codes",
    description: "Can update station codes they created or are associated with",
  },
  "user:station-code:delete": {
    name: "Delete Own Station Codes",
    description: "Can delete station codes they created or are associated with",
  },

  // Tenant level permissions
  "tenant:station-code:view-list": {
    name: "View Tenant Station Code List",
    description: "Can view list of station codes within the tenant",
  },
  "tenant:station-code:view": {
    name: "View Tenant Station Codes",
    description: "Can view all station codes within the tenant",
  },
  "tenant:station-code:create": {
    name: "Create Tenant Station Codes",
    description: "Can create station codes within the tenant",
  },
  "tenant:station-code:update": {
    name: "Update Tenant Station Codes",
    description: "Can update station codes within the tenant",
  },
  "tenant:station-code:delete": {
    name: "Delete Tenant Station Codes",
    description: "Can delete station codes within the tenant",
  },
} as const;
