export const TransportPlanPermissions = {
  // Department level permissions
  "dept:transport-plan:view": {
    name: "View Department Transport Plans",
    description: "Can view transport plans within their department",
  },
  "dept:transport-plan:create": {
    name: "Create Department Transport Plan",
    description: "Can create transport plan within their department",
  },
  "dept:transport-plan:update": {
    name: "Update Department Transport Plan",
    description: "Can update transport plan within their department",
  },
  "dept:transport-plan:delete": {
    name: "Delete Department Transport Plan",
    description: "Can delete transport plan within their department",
  },

  // Tenant level permissions
  "tenant:transport-plan:view-list": {
    name: "View Tenant Transport Plan List",
    description: "Can view list of transport plans within the tenant",
  },
  "tenant:transport-plan:view": {
    name: "View Tenant Transport Plans",
    description: "Can view all transport plans within the tenant",
  },
  "tenant:transport-plan:create": {
    name: "Create Tenant Transport Plans",
    description: "Can create transport plans within the tenant",
  },
  "tenant:transport-plan:update": {
    name: "Update Tenant Transport Plans",
    description: "Can update transport plans within the tenant",
  },
  "tenant:transport-plan:delete": {
    name: "Delete Tenant Transport Plans",
    description: "Can delete transport plans within the tenant",
  },
};
