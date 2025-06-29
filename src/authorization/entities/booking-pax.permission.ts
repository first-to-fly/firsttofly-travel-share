export const BookingPaxPermissions = {
  // User level permissions
  "user:booking-pax:view": {
    name: "View Booking Pax",
    description: "Can view own Booking Pax details",
  },

  // Department level permissions
  "dept:booking-pax:view": {
    name: "View Department Booking Pax",
    description: "Can view Booking Pax within their department's scope (via a transaction/room)",
  },
  "dept:booking-pax:create": {
    name: "Create Department Booking Pax",
    description: "Can create Booking Pax within their department's scope (via a transaction/room)",
  },
  "dept:booking-pax:update": {
    name: "Update Department Booking Pax",
    description: "Can update Booking Pax within their department's scope (via a transaction/room)",
  },
  "dept:booking-pax:delete": {
    name: "Delete Department Booking Pax",
    description: "Can delete Booking Pax within their department's scope (via a transaction/room)",
  },

  // Tenant level permissions (pax are managed in context of a transaction/room)
  "tenant:booking-pax:view": {
    name: "View Tenant Booking Pax",
    description: "Can view all Booking Pax within the tenant (usually via a transaction)",
  },
  "tenant:booking-pax:create": {
    name: "Create Tenant Booking Pax",
    description: "Can create Booking Pax within the tenant (usually via a transaction)",
  },
  "tenant:booking-pax:update": {
    name: "Update Tenant Booking Pax",
    description: "Can update Booking Pax within the tenant (usually via a transaction)",
  },
  "tenant:booking-pax:delete": {
    name: "Delete Tenant Booking Pax",
    description: "Can delete Booking Pax within the tenant (usually via a transaction)",
  },
};
