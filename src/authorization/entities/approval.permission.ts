export const ApprovalPermissions = {
  // Tenant level permissions
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

  // Approval Request permissions
  "tenant:approval-request:view": {
    name: "View Tenant Approval Requests",
    description: "Can view all approval requests within the tenant",
  },
  "tenant:approval-request:create": {
    name: "Create Tenant Approval Requests",
    description: "Can create approval requests within the tenant",
  },
  "tenant:approval-request:update": {
    name: "Update Tenant Approval Requests",
    description: "Can update approval requests within the tenant",
  },
  "tenant:approval-request:cancel": {
    name: "Cancel Tenant Approval Requests",
    description: "Can cancel approval requests within the tenant",
  },
  "tenant:approval-request:approve": {
    name: "Approve Tenant Approval Requests",
    description: "Can approve approval requests within the tenant",
  },
  "tenant:approval-request:reject": {
    name: "Reject Tenant Approval Requests",
    description: "Can reject approval requests within the tenant",
  },

  "dept:approval-request:view": {
    name: "View Department Approval Requests",
    description: "Can view approval requests within their department",
  },

  "user:approval-request:view": {
    name: "View User Approval Requests",
    description: "Can view approval requests submitted by the user or where the user is an approver",
  },
  "user:approval-request:create": {
    name: "Create User Approval Requests",
    description: "Can submit entities for approval, creating approval requests",
  },
  "user:approval-request:update": {
    name: "Update User Approval Requests",
    description: "Can update their own approval requests",
  },
  "user:approval-request:approve": {
    name: "Approve User Approval Requests",
    description: "Can approve approval requests where assigned as approver",
  },
  "user:approval-request:reject": {
    name: "Reject User Approval Requests",
    description: "Can reject approval requests where assigned as approver",
  },
  "user:approval-request:cancel": {
    name: "Cancel User Approval Requests",
    description: "Can cancel their own approval requests",
  },

};
