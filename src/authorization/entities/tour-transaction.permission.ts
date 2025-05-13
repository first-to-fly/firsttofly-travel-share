export const TourTransactionPermissions = {
  // User level permissions
  "user:tour-transaction:view": {
    name: "View Tour Transaction",
    description: "Can view own Tour Transaction",
  },

  // Department level permissions
  "dept:tour-transaction:view": {
    name: "View Department Tour Transactions",
    description: "Can view Tour Transactions within their department's scope",
  },
  "dept:tour-transaction:create": {
    name: "Create Department Tour Transactions",
    description: "Can create Tour Transactions within their department's scope",
  },
  "dept:tour-transaction:update": {
    name: "Update Department Tour Transactions",
    description: "Can update Tour Transactions within their department's scope",
  },
  "dept:tour-transaction:delete": {
    name: "Delete Department Tour Transactions",
    description: "Can delete Tour Transactions within their department's scope",
  },
  "dept:tour-transaction:confirm": {
    name: "Confirm Department Tour Transactions",
    description: "Can confirm Tour Transactions within their department's scope",
  },
  "dept:tour-transaction:cancel": {
    name: "Cancel Department Tour Transactions",
    description: "Can cancel Tour Transactions within their department's scope",
  },
  "dept:tour-transaction:read-snapshot": {
    name: "Read Department Tour Transaction Snapshot",
    description: "Can read snapshot data of Tour Transactions within their department's scope",
  },

  // Tenant level permissions
  "tenant:tour-transaction:view": {
    name: "View Tenant Tour Transactions",
    description: "Can view all Tour Transactions within the tenant",
  },
  "tenant:tour-transaction:create": {
    name: "Create Tenant Tour Transactions",
    description: "Can create Tour Transactions within the tenant",
  },
  "tenant:tour-transaction:update": {
    name: "Update Tenant Tour Transactions",
    description: "Can update Tour Transactions within the tenant",
  },
  "tenant:tour-transaction:delete": {
    name: "Delete Tenant Tour Transactions",
    description: "Can delete Tour Transactions within the tenant",
  },
  "tenant:tour-transaction:confirm": {
    name: "Confirm Tenant Tour Transactions",
    description: "Can confirm Tour Transactions within the tenant (trigger snapshot)",
  },
  "tenant:tour-transaction:cancel": {
    name: "Cancel Tenant Tour Transactions",
    description: "Can cancel Tour Transactions within the tenant",
  },
  "tenant:tour-transaction:read-snapshot": {
    name: "Read Tenant Tour Transaction Snapshot",
    description: "Can read snapshot data of Tour Transactions within the tenant",
  },
};
