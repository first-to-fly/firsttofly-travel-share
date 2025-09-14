export const CustomerBookingLinkPermissions = {
  // User level permissions
  "user:customer-booking-link:view": {
    name: "View Customer Booking Link",
    description: "Can view own customer booking links",
  },

  // Department level permissions
  "dept:customer-booking-link:view": {
    name: "View Department Customer Booking Links",
    description: "Can view customer booking links within their department's scope",
  },
  "dept:customer-booking-link:create": {
    name: "Create Department Customer Booking Links",
    description: "Can create customer booking links within their department's scope",
  },
  "dept:customer-booking-link:update": {
    name: "Update Department Customer Booking Links",
    description: "Can update customer booking links within their department's scope",
  },
  "dept:customer-booking-link:delete": {
    name: "Delete Department Customer Booking Links",
    description: "Can delete customer booking links within their department's scope",
  },
  "dept:customer-booking-link:regenerate": {
    name: "Regenerate Department Customer Booking Links",
    description: "Can regenerate tokens for customer booking links within their department's scope",
  },

  // Tenant level permissions
  "tenant:customer-booking-link:view-list": {
    name: "View Tenant Customer Booking Link List",
    description: "Can view list of customer booking links within the tenant",
  },
  "tenant:customer-booking-link:view": {
    name: "View Tenant Customer Booking Links",
    description: "Can view all customer booking links within the tenant",
  },
  "tenant:customer-booking-link:create": {
    name: "Create Tenant Customer Booking Links",
    description: "Can create customer booking links within the tenant",
  },
  "tenant:customer-booking-link:update": {
    name: "Update Tenant Customer Booking Links",
    description: "Can update customer booking links within the tenant",
  },
  "tenant:customer-booking-link:delete": {
    name: "Delete Tenant Customer Booking Links",
    description: "Can delete customer booking links within the tenant",
  },
  "tenant:customer-booking-link:regenerate": {
    name: "Regenerate Tenant Customer Booking Links",
    description: "Can regenerate tokens for customer booking links within the tenant",
  },
};
