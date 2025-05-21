export const TourTransactionTransferPermissions = {
  // User level permissions (typically view only for their own associated records, if applicable)
  // "user:tour-transaction-transfer:view": {
  //   name: "View Own Tour Transaction Transfers",
  //   description: "Can view own tour transaction transfers",
  // },

  // Department level permissions
  "dept:tour-transaction-transfer:view": {
    name: "View Department Tour Transaction Transfers",
    description: "Can view tour transaction transfers within their department's bookings",
  },
  "dept:tour-transaction-transfer:create": {
    name: "Create Department Tour Transaction Transfer",
    description: "Can create tour transaction transfers for their department's bookings",
  },
  // Update and Delete are not applicable as transfers are immutable once created.

  // Tenant level permissions
  "tenant:tour-transaction-transfer:view": {
    name: "View Tenant Tour Transaction Transfers",
    description: "Can view all tour transaction transfers within the tenant",
  },
  "tenant:tour-transaction-transfer:create": {
    name: "Create Tenant Tour Transaction Transfer",
    description: "Can create tour transaction transfers for any booking within the tenant",
  },
  // Update and Delete are not applicable
};

export type TourTransactionTransferPermission = keyof typeof TourTransactionTransferPermissions;
