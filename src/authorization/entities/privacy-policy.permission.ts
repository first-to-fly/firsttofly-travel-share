export const PrivacyPolicyPermissions = {
  // User level permissions
  "user:privacy-policy:view": {
    name: "View Own Privacy Policy",
    description: "Can view own created Privacy Policy", // Assuming 'own' refers to createdBy
  },
  "user:privacy-policy:update": {
    name: "Update Own Privacy Policy",
    description: "Can update own created Privacy Policy",
  },
  "user:privacy-policy:delete": {
    name: "Delete Own Privacy Policy",
    description: "Can delete own created Privacy Policy",
  },

  // Tenant level permissions
  "tenant:privacy-policy:view-list": {
    name: "View Tenant Privacy Policy List",
    description: "Can view list of privacy policies within the tenant",
  },
  "tenant:privacy-policy:view": {
    name: "View Tenant Privacy Policies",
    description: "Can view all Privacy Policies within the tenant",
  },
  "tenant:privacy-policy:create": {
    name: "Create Tenant Privacy Policy",
    description: "Can create Privacy Policies within the tenant",
  },
  "tenant:privacy-policy:update": {
    name: "Update Tenant Privacy Policy",
    description: "Can update any Privacy Policy within the tenant",
  },
  "tenant:privacy-policy:delete": {
    name: "Delete Tenant Privacy Policy",
    description: "Can delete any Privacy Policy within the tenant",
  },
} as const;
