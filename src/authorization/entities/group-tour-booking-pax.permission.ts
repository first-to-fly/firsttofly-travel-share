export const GroupTourBookingPaxPermissions = {
  // User level permissions
  "user:group-tour-booking-pax:view": {
    name: "View Group Tour Booking Pax",
    description: "Can view own Group Tour Booking Pax details",
  },

  // Department level permissions
  "dept:group-tour-booking-pax:view": {
    name: "View Department Group Tour Booking Pax",
    description: "Can view Group Tour Booking Pax within their department's scope (via a transaction/room)",
  },
  "dept:group-tour-booking-pax:create": {
    name: "Create Department Group Tour Booking Pax",
    description: "Can create Group Tour Booking Pax within their department's scope (via a transaction/room)",
  },
  "dept:group-tour-booking-pax:update": {
    name: "Update Department Group Tour Booking Pax",
    description: "Can update Group Tour Booking Pax within their department's scope (via a transaction/room)",
  },
  "dept:group-tour-booking-pax:delete": {
    name: "Delete Department Group Tour Booking Pax",
    description: "Can delete Group Tour Booking Pax within their department's scope (via a transaction/room)",
  },

  // Tenant level permissions (pax are managed in context of a transaction/room)
  "tenant:group-tour-booking-pax:view": {
    name: "View Tenant Group Tour Booking Pax",
    description: "Can view all Group Tour Booking Pax within the tenant (usually via a transaction)",
  },
  "tenant:group-tour-booking-pax:create": {
    name: "Create Tenant Group Tour Booking Pax",
    description: "Can create Group Tour Booking Pax within the tenant (usually via a transaction)",
  },
  "tenant:group-tour-booking-pax:update": {
    name: "Update Tenant Group Tour Booking Pax",
    description: "Can update Group Tour Booking Pax within the tenant (usually via a transaction)",
  },
  "tenant:group-tour-booking-pax:delete": {
    name: "Delete Tenant Group Tour Booking Pax",
    description: "Can delete Group Tour Booking Pax within the tenant (usually via a transaction)",
  },
};
