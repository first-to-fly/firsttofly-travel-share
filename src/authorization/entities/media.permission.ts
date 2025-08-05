export const MediaPermissions = {
  // User level permissions
  "user:media:view": {
    name: "View Own Media",
    description: "Can view own media files",
  },
  "user:media:update": {
    name: "Update Own Media",
    description: "Can update own media files",
  },
  "user:media:delete": {
    name: "Delete Own Media",
    description: "Can delete own media files",
  },

  // Tenant level permissions
  "tenant:media:view-list": {
    name: "View Tenant Media List",
    description: "Can view list of media files within the tenant",
  },
  "tenant:media:view": {
    name: "View Tenant Media",
    description: "Can view all media files within the tenant",
  },
  "tenant:media:create": {
    name: "Create Tenant Media",
    description: "Can create media files within the tenant",
  },
  "tenant:media:update": {
    name: "Update Tenant Media",
    description: "Can update any media file within the tenant",
  },
  "tenant:media:delete": {
    name: "Delete Tenant Media",
    description: "Can delete any media file within the tenant",
  },
} as const;
