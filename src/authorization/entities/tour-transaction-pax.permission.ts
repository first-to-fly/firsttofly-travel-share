export const TourTransactionPaxPermissions = {
  // User level permissions
  "user:tour-transaction-pax:view": {
    name: "View Tour Transaction Pax",
    description: "Can view own Tour Transaction Pax details",
  },

  // Department level permissions
  "dept:tour-transaction-pax:view": {
    name: "View Department Tour Transaction Pax",
    description: "Can view Tour Transaction Pax within their department's scope (via a transaction/room)",
  },
  "dept:tour-transaction-pax:create": {
    name: "Create Department Tour Transaction Pax",
    description: "Can create Tour Transaction Pax within their department's scope (via a transaction/room)",
  },
  "dept:tour-transaction-pax:update": {
    name: "Update Department Tour Transaction Pax",
    description: "Can update Tour Transaction Pax within their department's scope (via a transaction/room)",
  },
  "dept:tour-transaction-pax:delete": {
    name: "Delete Department Tour Transaction Pax",
    description: "Can delete Tour Transaction Pax within their department's scope (via a transaction/room)",
  },

  // Tenant level permissions (pax are managed in context of a transaction/room)
  "tenant:tour-transaction-pax:view": {
    name: "View Tenant Tour Transaction Pax",
    description: "Can view all Tour Transaction Pax within the tenant (usually via a transaction)",
  },
  "tenant:tour-transaction-pax:create": {
    name: "Create Tenant Tour Transaction Pax",
    description: "Can create Tour Transaction Pax within the tenant (usually via a transaction)",
  },
  "tenant:tour-transaction-pax:update": {
    name: "Update Tenant Tour Transaction Pax",
    description: "Can update Tour Transaction Pax within the tenant (usually via a transaction)",
  },
  "tenant:tour-transaction-pax:delete": {
    name: "Delete Tenant Tour Transaction Pax",
    description: "Can delete Tour Transaction Pax within the tenant (usually via a transaction)",
  },
};
