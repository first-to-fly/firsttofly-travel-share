export const ApprovalRequestPermissions = {
  // User level permissions
  "user:approval-request:view": {
    name: "View User Approval Requests",
    description: "Can view all approval requests assigned to the user",
  },
  "user:approval-request:update": {
    name: "Update User Approval Requests",
    description: "Can update approval requests assigned to the user",
  },
  "user:approval-request:approve": {
    name: "Approve User Approval Requests",
    description: "Can approve approval requests assigned to the user",
  },
  "user:approval-request:reject": {
    name: "Reject User Approval Requests",
    description: "Can reject approval requests assigned to the user",
  },
  "user:approval-request:cancel": {
    name: "Cancel User Approval Requests",
    description: "Can cancel approval requests assigned to the user",
  },

  // Tenant level permissions
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
  "tenant:approval-request:approve": {
    name: "Approve Tenant Approval Requests",
    description: "Can approve approval requests within the tenant",
  },
  "tenant:approval-request:reject": {
    name: "Reject Tenant Approval Requests",
    description: "Can reject approval requests within the tenant",
  },
};
