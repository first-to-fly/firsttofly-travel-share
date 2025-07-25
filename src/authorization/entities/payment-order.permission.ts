// PaymentOrder permissions - Internal only, minimal permissions
export const PaymentOrderPermissions = {
  "dept:payment-order:view": {
    name: "View Department Payment Orders",
    description: "Can view payment orders within their department",
  },
  "tenant:payment-order:view-list": {
    name: "View Tenant Payment Order List",
    description: "Can view list of payment orders within the tenant",
  },
  "tenant:payment-order:view": {
    name: "View Tenant Payment Orders",
    description: "Can view all payment orders within the tenant",
  },
};
