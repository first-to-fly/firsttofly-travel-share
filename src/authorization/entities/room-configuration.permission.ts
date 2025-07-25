/**
 * @type {Record<string, import("../RoomConfiguration.types").PermissionDeclaration>}
 */
export const RoomConfigurationPermissions = {
  // User level permissions
  "user:room-configuration:view": {
    name: "View Own Room Configuration",
    description: "Can view own created Room Configuration",
  },
  "user:room-configuration:update": {
    name: "Update Own Room Configuration",
    description: "Can update own created Room Configuration",
  },
  "user:room-configuration:delete": {
    name: "Delete Own Room Configuration",
    description: "Can delete own created Room Configuration",
  },

  // Tenant level permissions
  "tenant:room-configuration:view-list": {
    name: "View Tenant Room Configuration List",
    description: "Can view list of room configurations within the tenant",
  },
  "tenant:room-configuration:view": {
    name: "View Tenant Room Configurations",
    description: "Can view all Room Configurations within the tenant",
  },
  "tenant:room-configuration:create": {
    name: "Create Tenant Room Configuration",
    description: "Can create Room Configurations within the tenant",
  },
  "tenant:room-configuration:update": {
    name: "Update Tenant Room Configuration",
    description: "Can update any Room Configuration within the tenant",
  },
  "tenant:room-configuration:delete": {
    name: "Delete Tenant Room Configuration",
    description: "Can delete any Room Configuration within the tenant",
  },
};
