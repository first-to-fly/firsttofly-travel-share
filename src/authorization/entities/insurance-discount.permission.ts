export const InsuranceDiscountPermissions = {
  // User level permissions
  "user:insurance-discount:view": {
    name: "View Own Insurance Discounts",
    description: "Can view insurance discounts created by them", // Assuming 'user' scope relates to creator
  },
  "user:insurance-discount:update": {
    name: "Update Own Insurance Discounts",
    description: "Can update insurance discounts created by them",
  },
  "user:insurance-discount:delete": {
    name: "Delete Own Insurance Discounts",
    description: "Can delete insurance discounts created by them",
  },

  // Tenant level permissions
  "tenant:insurance-discount:view-list": {
    name: "View Tenant Insurance Discount List",
    description: "Can view list of insurance discounts within the tenant",
  },
  "tenant:insurance-discount:view": {
    name: "View Tenant Insurance Discounts",
    description: "Can view all insurance discounts within the tenant",
  },
  "tenant:insurance-discount:create": {
    name: "Create Tenant Insurance Discounts",
    description: "Can create insurance discounts within the tenant",
  },
  "tenant:insurance-discount:update": {
    name: "Update Tenant Insurance Discounts",
    description: "Can update any insurance discount within the tenant",
  },
  "tenant:insurance-discount:delete": {
    name: "Delete Tenant Insurance Discounts",
    description: "Can delete any insurance discount within the tenant",
  },
} as const;
