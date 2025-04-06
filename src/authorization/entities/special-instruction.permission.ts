export const SpecialInstructionPermissions = {
  // User level permissions
  "user:special-instruction:view": {
    name: "View Own Special Instructions",
    description: "Can view special instructions they created or are associated with",
  },
  "user:special-instruction:update": {
    name: "Update Own Special Instructions",
    description: "Can update special instructions they created or are associated with",
  },
  "user:special-instruction:delete": {
    name: "Delete Own Special Instructions",
    description: "Can delete special instructions they created or are associated with",
  },

  // Tenant level permissions
  "tenant:special-instruction:view": {
    name: "View Tenant Special Instructions",
    description: "Can view all special instructions within the tenant",
  },
  "tenant:special-instruction:create": {
    name: "Create Tenant Special Instructions",
    description: "Can create special instructions within the tenant",
  },
  "tenant:special-instruction:update": {
    name: "Update Tenant Special Instructions",
    description: "Can update special instructions within the tenant",
  },
  "tenant:special-instruction:delete": {
    name: "Delete Tenant Special Instructions",
    description: "Can delete special instructions within the tenant",
  },
} as const;
