export const BillPermissions = {
  // User level permissions
  "user:bill:view": {
    name: "View Bill",
    description: "Can view own Bills",
  },

  // Department level permissions
  "dept:bill:view": {
    name: "View Department Bills",
    description: "Can view Bills within their department",
  },
  "dept:bill:create": {
    name: "Create Department Bill",
    description: "Can create Bills within their department",
  },
  "dept:bill:update": {
    name: "Update Department Bill",
    description: "Can update Bills within their department",
  },
  "dept:bill:delete": {
    name: "Delete Department Bill",
    description: "Can delete Bills within their department",
  },

  // Tenant level permissions
  "tenant:bill:view-list": {
    name: "View Tenant Bill List",
    description: "Can view list of bills within the tenant",
  },
  "tenant:bill:view": {
    name: "View Tenant Bills",
    description: "Can view all Bills within the tenant",
  },
  "tenant:bill:create": {
    name: "Create Tenant Bills",
    description: "Can create Bills within the tenant",
  },
  "tenant:bill:update": {
    name: "Update Tenant Bills",
    description: "Can update Bills within the tenant",
  },
  "tenant:bill:delete": {
    name: "Delete Tenant Bills",
    description: "Can delete Bills within the tenant",
  },
  "tenant:bill:approve": {
    name: "Approve Tenant Bills",
    description: "Can approve Bills within the tenant",
  },
  "tenant:bill:reject": {
    name: "Reject Tenant Bills",
    description: "Can reject Bills within the tenant",
  },
  "tenant:bill:sync-xero": {
    name: "Sync Bills to Xero",
    description: "Can sync Bills to Xero accounting system",
  },
};
