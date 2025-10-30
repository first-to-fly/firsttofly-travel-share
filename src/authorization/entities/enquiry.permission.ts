/**
 * @type {Record<string, import("../permissions.types").PermissionDeclaration>}
 */
export const EnquiryPermissions = {
  // Department level permissions
  "dept:enquiry:view": {
    name: "View Department Enquiries",
    description: "Can view enquiries within their department scope.",
  },
  "dept:enquiry:create": {
    name: "Create Department Enquiries",
    description: "Can create enquiries for customers within their department scope.",
  },
  "dept:enquiry:update": {
    name: "Update Department Enquiries",
    description: "Can update enquiries within their department scope.",
  },
  "dept:enquiry:delete": {
    name: "Delete Department Enquiries",
    description: "Can soft delete enquiries within their department scope.",
  },

  // Tenant level permissions
  "tenant:enquiry:view-list": {
    name: "View Tenant Enquiry List",
    description: "Can view the list of enquiries within the tenant.",
  },
  "tenant:enquiry:view": {
    name: "View Tenant Enquiries",
    description: "Can view all enquiries within the tenant.",
  },
  "tenant:enquiry:create": {
    name: "Create Tenant Enquiries",
    description: "Can create enquiries within the tenant.",
  },
  "tenant:enquiry:update": {
    name: "Update Tenant Enquiries",
    description: "Can update enquiries within the tenant.",
  },
  "tenant:enquiry:delete": {
    name: "Delete Tenant Enquiries",
    description: "Can soft delete enquiries within the tenant.",
  },
};
