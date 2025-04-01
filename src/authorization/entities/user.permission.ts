export const UserPermissions = {
// User level permissions (Self-management)
  "user:user:view": {
    name: "View Own Profile",
    description: "Can view own user profile details",
  },

  // Department level permissions
  "dept:user:view": {
    name: "View User in Department",
    description: "Can view users within their department",
  },

  // Tenant level permissions
  "tenant:user:view-basic": {
    name: "View User Basic",
    description: "Can view user basic info in tenant (name, avatar)",
  },
  "tenant:user:view": {
    name: "View User",
    description: "Can view user in tenant",
  },
  "tenant:user:create": {
    name: "Create User",
    description: "Can create user in tenant",
  },
  "tenant:user:update": {
    name: "Update User",
    description: "Can update user in tenant",
  },
  "tenant:user:delete": {
    name: "Delete User",
    description: "Can delete user in tenant",
  },
};
