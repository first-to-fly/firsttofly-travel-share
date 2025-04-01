/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const SpecialInstructionPermissions = {
  // User level permissions
  "user:special-instruction:view": {
    name: "View Special Instruction",
    description: "Can view special instruction",
  },

  // Department level permissions
  "dept:special-instruction:view": {
    name: "View Special Instruction",
    description: "Can view special instruction in department",
  },

  // Tenant level permissions
  "tenant:special-instruction:view": {
    name: "View Special Instruction",
    description: "Can view special instruction in tenant",
  },
  "tenant:special-instruction:create": {
    name: "Create Special Instruction",
    description: "Can create special instruction in tenant",
  },
  "tenant:special-instruction:update": {
    name: "Update Special Instruction",
    description: "Can update special instruction in tenant",
  },
  "tenant:special-instruction:delete": {
    name: "Delete Special Instruction",
    description: "Can delete special instruction in tenant",
  },
};
