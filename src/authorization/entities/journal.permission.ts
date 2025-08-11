export const JournalPermissions = {
  // User level permissions
  "user:journal:view": {
    name: "View Journal",
    description: "Can view own Journals",
  },

  // Department level permissions
  "dept:journal:view": {
    name: "View Department Journals",
    description: "Can view Journals within their department",
  },
  "dept:journal:create": {
    name: "Create Department Journal",
    description: "Can create Journals within their department",
  },
  "dept:journal:update": {
    name: "Update Department Journal",
    description: "Can update Journals within their department",
  },
  "dept:journal:delete": {
    name: "Delete Department Journal",
    description: "Can delete Journals within their department",
  },

  // Tenant level permissions
  "tenant:journal:view-list": {
    name: "View Tenant Journal List",
    description: "Can view list of journals within the tenant",
  },
  "tenant:journal:view": {
    name: "View Tenant Journals",
    description: "Can view all Journals within the tenant",
  },
  "tenant:journal:create": {
    name: "Create Tenant Journals",
    description: "Can create Journals within the tenant",
  },
  "tenant:journal:update": {
    name: "Update Tenant Journals",
    description: "Can update Journals within the tenant",
  },
  "tenant:journal:delete": {
    name: "Delete Tenant Journals",
    description: "Can delete Journals within the tenant",
  },
  "tenant:journal:reverse": {
    name: "Reverse Tenant Journals",
    description: "Can reverse Journal entries within the tenant",
  },
  "tenant:journal:void": {
    name: "Void Tenant Journals",
    description: "Can void Journal entries within the tenant",
  },
};
