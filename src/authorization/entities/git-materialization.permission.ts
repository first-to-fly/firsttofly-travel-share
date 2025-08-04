export const GitMaterializationPermissions = {
  // User level permissions
  "user:gitMaterialization:view": {
    name: "View GIT Materialization",
    description: "Can view own GIT Materialization",
  },

  // Department level permissions
  "dept:gitMaterialization:view": {
    name: "View Department GIT Materializations",
    description: "Can view all GIT Materializations within the department",
  },
  "dept:gitMaterialization:create": {
    name: "Create Department GIT Materializations",
    description: "Can create GIT Materializations within the department",
  },
  "dept:gitMaterialization:update": {
    name: "Update Department GIT Materializations",
    description: "Can update GIT Materializations within the department",
  },
  "dept:gitMaterialization:delete": {
    name: "Delete Department GIT Materializations",
    description: "Can delete GIT Materializations within the department",
  },

  // Tenant level permissions
  "tenant:gitMaterialization:view-list": {
    name: "View Tenant GIT Materialization List",
    description: "Can view list of GIT Materializations within the tenant",
  },
  "tenant:gitMaterialization:view": {
    name: "View Tenant GIT Materializations",
    description: "Can view all GIT Materializations within the tenant",
  },
  "tenant:gitMaterialization:create": {
    name: "Create Tenant GIT Materializations",
    description: "Can create GIT Materializations within the tenant",
  },
  "tenant:gitMaterialization:update": {
    name: "Update Tenant GIT Materializations",
    description: "Can update GIT Materializations within the tenant",
  },
  "tenant:gitMaterialization:delete": {
    name: "Delete Tenant GIT Materializations",
    description: "Can delete GIT Materializations within the tenant",
  },
};