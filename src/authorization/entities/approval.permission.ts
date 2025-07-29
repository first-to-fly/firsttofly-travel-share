export const ApprovalPermissions = {
  // Tenant level permissions
  "tenant:approval:view-list": {
    name: "View Tenant Approval List",
    description: "Can view list of approvals within the tenant",
  },
  "tenant:approval:view": {
    name: "View Tenant Approvals",
    description: "Can view all approval configurations within the tenant",
  },
  "tenant:approval:create": {
    name: "Create Tenant Approvals",
    description: "Can create approval configurations within the tenant",
  },
  "tenant:approval:update": {
    name: "Update Tenant Approvals",
    description: "Can update approval configurations within the tenant",
  },
  "tenant:approval:delete": {
    name: "Delete Tenant Approvals",
    description: "Can delete approval configurations within the tenant",
  },

  // Department level permissions
  "dept:approval:view": {
    name: "View Department Approvals",
    description: "Can view approval configurations within their department",
  },
  "dept:approval:update": {
    name: "Update Department Approvals",
    description: "Can update approval configurations within their department",
  },

};
