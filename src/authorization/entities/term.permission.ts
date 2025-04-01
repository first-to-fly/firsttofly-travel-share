/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const TermPermissions = {
  // Tenant scope
  "tenant:term:view": {
    name: "View Term",
    description: "Can view terms in tenant",
  },
  "tenant:term:create": {
    name: "Create Term",
    description: "Can create terms in tenant",
  },
  "tenant:term:update": {
    name: "Update Term",
    description: "Can update terms in tenant",
  },
  "tenant:term:delete": {
    name: "Delete Term",
    description: "Can delete terms in tenant",
  },
};
