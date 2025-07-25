export const ProductPermissions = {

  // User level permissions
  "user:product:view": {
    name: "View Product",
    description: "Can view product",
  },
  "user:product:update": {
    name: "Update Product",
    description: "Can update product",
  },
  "user:product:delete": {
    name: "Delete Product",
    description: "Can delete product",
  },

  // Department level permissions
  "dept:product:view": {
    name: "View Product",
    description: "Can view product in department",
  },
  "dept:product:create": {
    name: "Create Product",
    description: "Can create product in department",
  },
  "dept:product:update": {
    name: "Update Product",
    description: "Can update product in department",
  },
  "dept:product:delete": {
    name: "Delete Product",
    description: "Can delete product in department",
  },

  // Tenant level permissions
  "tenant:product:view-basic": {
    name: "View Product Basic",
    description: "Can view product basic info in tenant (name, avatar)",
  },
  "tenant:product:view-list": {
    name: "View Tenant Product List",
    description: "Can view list of products within the tenant",
  },
  "tenant:product:view": {
    name: "View Product",
    description: "Can view product in tenant",
  },
  "tenant:product:create": {
    name: "Create Product",
    description: "Can create product in tenant",
  },
  "tenant:product:update": {
    name: "Update Product",
    description: "Can update product in tenant",
  },
  "tenant:product:delete": {
    name: "Delete Product",
    description: "Can delete product in tenant",
  },
};
