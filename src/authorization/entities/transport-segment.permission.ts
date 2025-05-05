/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const TransportSegmentPermissions = {
  // Department level permissions
  "dept:transport-segment:view": {
    name: "View Department Transport Segments",
    description: "Can view Transport Segments within their department",
  },
  "dept:transport-segment:create": {
    name: "Create Department Transport Segment",
    description: "Can create Transport Segment within their department",
  },
  "dept:transport-segment:update": {
    name: "Update Department Transport Segment",
    description: "Can update Transport Segment within their department",
  },
  "dept:transport-segment:delete": {
    name: "Delete Department Transport Segment",
    description: "Can delete Transport Segment within their department",
  },

  // Tenant level permissions
  "tenant:transport-segment:view": {
    name: "View Tenant Transport Segments",
    description: "Can view all Transport Segments within the tenant",
  },
  "tenant:transport-segment:create": {
    name: "Create Tenant Transport Segment",
    description: "Can create Transport Segment within the tenant",
  },
  "tenant:transport-segment:update": {
    name: "Update Tenant Transport Segment",
    description: "Can update Transport Segment within the tenant",
  },
  "tenant:transport-segment:delete": {
    name: "Delete Tenant Transport Segment",
    description: "Can delete Transport Segment within the tenant",
  },
};
