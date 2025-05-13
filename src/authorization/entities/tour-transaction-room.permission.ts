export const TourTransactionRoomPermissions = {
  // User level permissions (view might be relevant if a user can see their own room details)
  "user:tour-transaction-room:view": {
    name: "View Tour Transaction Room",
    description: "Can view own Tour Transaction Room details",
  },

  // Department level permissions
  "dept:tour-transaction-room:view": {
    name: "View Department Tour Transaction Rooms",
    description: "Can view Tour Transaction Rooms within their department's scope (via a transaction)",
  },
  "dept:tour-transaction-room:create": {
    name: "Create Department Tour Transaction Room",
    description: "Can create Tour Transaction Rooms within their department's scope (via a transaction)",
  },
  "dept:tour-transaction-room:update": {
    name: "Update Department Tour Transaction Room",
    description: "Can update Tour Transaction Rooms within their department's scope (via a transaction)",
  },
  "dept:tour-transaction-room:delete": {
    name: "Delete Department Tour Transaction Room",
    description: "Can delete Tour Transaction Rooms within their department's scope (via a transaction)",
  },

  // Tenant level permissions (typically rooms are managed in context of a transaction)
  "tenant:tour-transaction-room:view": {
    name: "View Tenant Tour Transaction Rooms",
    description: "Can view all Tour Transaction Rooms within the tenant (usually via a transaction)",
  },
  "tenant:tour-transaction-room:create": {
    name: "Create Tenant Tour Transaction Room",
    description: "Can create Tour Transaction Rooms within the tenant (usually via a transaction)",
  },
  "tenant:tour-transaction-room:update": {
    name: "Update Tenant Tour Transaction Room",
    description: "Can update Tour Transaction Rooms within the tenant (usually via a transaction)",
  },
  "tenant:tour-transaction-room:delete": {
    name: "Delete Tenant Tour Transaction Room",
    description: "Can delete Tour Transaction Rooms within the tenant (usually via a transaction)",
  },
};
