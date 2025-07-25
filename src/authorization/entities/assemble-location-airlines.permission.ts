/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const AssembleLocationAirlinesPermissions = {
  // User level permissions
  "user:assemble-location-airlines:view": {
    name: "View Own Assemble Location Airlines",
    description: "Can view own created Assemble Location Airlines",
  },
  "user:assemble-location-airlines:update": {
    name: "Update Own Assemble Location Airlines",
    description: "Can update own created Assemble Location Airlines",
  },
  "user:assemble-location-airlines:delete": {
    name: "Delete Own Assemble Location Airlines",
    description: "Can delete own created Assemble Location Airlines",
  },

  // Tenant scope
  "tenant:assemble-location-airlines:view-list": {
    name: "View Tenant Assemble Location Airlines List",
    description: "Can view list of assemble location airlines within the tenant",
  },
  "tenant:assemble-location-airlines:view": {
    name: "View Assemble Location Airlines",
    description: "Can view assemble location airlines in tenant",
  },
  "tenant:assemble-location-airlines:create": {
    name: "Create Assemble Location Airlines",
    description: "Can create assemble location airlines in tenant",
  },
  "tenant:assemble-location-airlines:update": {
    name: "Update Assemble Location Airlines",
    description: "Can update assemble location airlines in tenant",
  },
  "tenant:assemble-location-airlines:delete": {
    name: "Delete Assemble Location Airlines",
    description: "Can delete assemble location airlines in tenant",
  },
};
