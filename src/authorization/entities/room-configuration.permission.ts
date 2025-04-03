/**
 * @type {Record<string, import("../RoomConfiguration.types").PermissionDeclaration>}
 */
export const RoomConfigurationPermissions = {
  // User level permissions
  "user:room-configuration:view": {
    name: "View Special RoomConfiguration",
    description: "Can view Room Configuration",
  },

  // Tenant level permissions
  "tenant:room-configuration:view": {
    name: "View Special Instruction",
    description: "Can view Room Configuration in tenant",
  },
  "tenant:room-configuration:create": {
    name: "Create Special Instruction",
    description: "Can create Room Configuration in tenant",
  },
  "tenant:room-configuration:update": {
    name: "Update Special Instruction",
    description: "Can update Room Configuration in tenant",
  },
  "tenant:room-configuration:delete": {
    name: "Delete Special Instruction",
    description: "Can delete Room Configuration in tenant",
  },
};
