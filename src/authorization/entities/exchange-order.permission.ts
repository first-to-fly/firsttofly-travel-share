export const ExchangeOrderPermissions = {
  // User level permissions
  "user:exchange-order:view": {
    name: "View Exchange Order",
    description: "Can view own Exchange Order",
  },

  // Department level permissions
  "dept:exchange-order:view": {
    name: "View Department Exchange Orders",
    description: "Can view Exchange Orders within their department",
  },
  "dept:exchange-order:create": {
    name: "Create Department Exchange Order",
    description: "Can create Exchange Order within their department",
  },
  "dept:exchange-order:update": {
    name: "Update Department Exchange Order",
    description: "Can update Exchange Order within their department",
  },
  "dept:exchange-order:delete": {
    name: "Delete Department Exchange Order",
    description: "Can delete Exchange Order within their department",
  },

  // Tenant level permissions
  "tenant:exchange-order:view-list": {
    name: "View Tenant Exchange Order List",
    description: "Can view list of exchange orders within the tenant",
  },
  "tenant:exchange-order:view": {
    name: "View Tenant Exchange Orders",
    description: "Can view all Exchange Orders within the tenant",
  },
  "tenant:exchange-order:create": {
    name: "Create Tenant Exchange Orders",
    description: "Can create Exchange Orders within the tenant",
  },
  "tenant:exchange-order:update": {
    name: "Update Tenant Exchange Orders",
    description: "Can update Exchange Orders within the tenant",
  },
  "tenant:exchange-order:delete": {
    name: "Delete Tenant Exchange Orders",
    description: "Can delete Exchange Orders within the tenant",
  },
};
