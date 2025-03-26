/**
 * @type {Record<string, PermissionDeclaration>}
 */
export const DepartmentPermissions = {
  // User level permissions
  "user:department:view": {
    name: "View Department",
    description: "Can view department",
  },
  // Department level permissions
  "dept:department:view": {
    name: "View Department",
    description: "Can view department",
  },
  "dept:department:update": {
    name: "Update Department",
    description: "Can update department",
  },
  // Department user management permissions
  "dept:department:assign-user": {
    name: "Assign User to Department",
    description: "Can assign user to department",
  },
  "dept:department:unassign-user": {
    name: "Unassign User from Department",
    description: "Can unassign user from department",
  },

  // Tenant level permissions
  "tenant:department:view": {
    name: "View Department",
    description: "Can view department",
  },
  "tenant:department:create": {
    name: "Create Department",
    description: "Can create department",
  },
  "tenant:department:update": {
    name: "Update Department",
    description: "Can update department",
  },
  "tenant:department:delete": {
    name: "Delete Department",
    description: "Can delete department",
  },
  "tenant:department:assign-user": {
    name: "Assign User to Department",
    description: "Can assign user to department",
  },
  "tenant:department:unassign-user": {
    name: "Unassign User from Department",
    description: "Can unassign user from department",
  },
};
