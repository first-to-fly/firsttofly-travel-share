/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const LocationPermissions = {
  // Department level permissions
  "dept:location:view": {
    name: "View Department Locations",
    description: "Can view Locations within their department",
  },
  "dept:location:create": {
    name: "Create Department Location",
    description: "Can create Location within their department",
  },
  "dept:location:update": {
    name: "Update Department Location",
    description: "Can update Location within their department",
  },
  "dept:location:delete": {
    name: "Delete Department Location",
    description: "Can delete Location within their department",
  },

  // Tenant level permissions
  "tenant:location:view-list": {
    name: "View Tenant Location List",
    description: "Can view list of locations within the tenant",
  },
  "tenant:location:view": {
    name: "View Tenant Locations",
    description: "Can view all Locations within the tenant",
  },
  "tenant:location:create": {
    name: "Create Tenant Location",
    description: "Can create Location within the tenant",
  },
  "tenant:location:update": {
    name: "Update Tenant Location",
    description: "Can update Location within the tenant",
  },
  "tenant:location:delete": {
    name: "Delete Tenant Location",
    description: "Can delete Location within the tenant",
  },
  // Add other permissions as needed
};
