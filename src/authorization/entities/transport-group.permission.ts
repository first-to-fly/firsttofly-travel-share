/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const TransportGroupPermissions = {
  // Department level permissions
  "dept:transport-group:view": {
    name: "View Department Transport Groups",
    description: "Can view Transport Groups within their department",
  },
  "dept:transport-group:create": {
    name: "Create Department Transport Group",
    description: "Can create Transport Group within their department",
  },
  "dept:transport-group:update": {
    name: "Update Department Transport Group",
    description: "Can update Transport Group within their department",
  },
  "dept:transport-group:delete": {
    name: "Delete Department Transport Group",
    description: "Can delete Transport Group within their department",
  },

  // Tenant level permissions
  "tenant:transport-group:view-list": {
    name: "View Tenant Transport Group List",
    description: "Can view list of transport groups within the tenant",
  },
  "tenant:transport-group:view": {
    name: "View Tenant Transport Groups",
    description: "Can view all Transport Groups within the tenant",
  },
  "tenant:transport-group:create": {
    name: "Create Tenant Transport Group",
    description: "Can create Transport Group within the tenant",
  },
  "tenant:transport-group:update": {
    name: "Update Tenant Transport Group",
    description: "Can update Transport Group within the tenant",
  },
  "tenant:transport-group:delete": {
    name: "Delete Tenant Transport Group",
    description: "Can delete Transport Group within the tenant",
  },
};
