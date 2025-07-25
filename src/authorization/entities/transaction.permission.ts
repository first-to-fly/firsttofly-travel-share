// Transaction permissions - Full CRUD permissions
export const TransactionPermissions = {
  "dept:transaction:view": {
    name: "View Department Transactions",
    description: "Can view transactions within their department",
  },
  "dept:transaction:create": {
    name: "Create Department Transaction",
    description: "Can create transactions within their department",
  },
  "dept:transaction:update": {
    name: "Update Department Transaction",
    description: "Can update transactions within their department",
  },
  "dept:transaction:delete": {
    name: "Delete Department Transaction",
    description: "Can delete transactions within their department",
  },
  "tenant:transaction:view-list": {
    name: "View Tenant Transaction List",
    description: "Can view list of transactions within the tenant",
  },
  "tenant:transaction:view": {
    name: "View Tenant Transactions",
    description: "Can view all transactions within the tenant",
  },
  "tenant:transaction:create": {
    name: "Create Tenant Transactions",
    description: "Can create transactions within the tenant",
  },
  "tenant:transaction:update": {
    name: "Update Tenant Transactions",
    description: "Can update transactions within the tenant",
  },
  "tenant:transaction:delete": {
    name: "Delete Tenant Transactions",
    description: "Can delete transactions within the tenant",
  },
};
