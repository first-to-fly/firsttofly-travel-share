import type { PermissionDeclaration } from "../permissions.types";


export const PaymentWayPermissions: Record<string, PermissionDeclaration> = {
  // Tenant level permissions
  "tenant:payment-way:view-list": {
    name: "View Tenant Payment Way List",
    description: "Can view list of payment ways within the tenant",
  },
  "tenant:payment-way:view": {
    name: "View Tenant Payment Ways",
    description: "Can view all payment ways within the tenant",
  },
  "tenant:payment-way:create": {
    name: "Create Tenant Payment Way",
    description: "Can create payment way within the tenant",
  },
  "tenant:payment-way:update": {
    name: "Update Tenant Payment Way",
    description: "Can update payment way within the tenant",
  },
  "tenant:payment-way:delete": {
    name: "Delete Tenant Payment Way",
    description: "Can delete payment way within the tenant",
  },
  "tenant:payment-way:bulk-import": {
    name: "Bulk Import Payment Ways",
    description: "Can bulk import payment ways for the tenant",
  },
  "tenant:payment-way:manage-defaults": {
    name: "Manage Default Payment Way",
    description: "Can manage default payment way for the tenant",
  },
  "tenant:payment-way:calculate-fees": {
    name: "Calculate Payment Way Fees",
    description: "Can calculate fees for payment ways",
  },
  // Add other permissions as needed
};