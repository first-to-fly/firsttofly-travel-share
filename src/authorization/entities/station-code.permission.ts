/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const StationCodePermissions = {

  // Tenant level permissions
  "tenant:stationCode:view": {
    name: "View Station Code",
    description: "Can view station code in tenant",
  },
  "tenant:stationCode:create": {
    name: "Create Station Code",
    description: "Can create station code in tenant",
  },
  "tenant:stationCode:update": {
    name: "Update Station Code",
    description: "Can update station code in tenant",
  },
  "tenant:stationCode:delete": {
    name: "Delete Station Code",
    description: "Can delete station code in tenant",
  },
};
