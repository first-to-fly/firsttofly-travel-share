export const CustomizedTourBookingPaxPermissions = {
  // User level permissions
  "user:customized-tour-booking-pax:view": {
    name: "View Customized Tour Booking Pax",
    description: "Can view customized tour booking pax that they created or are permitted to access.",
  },

  // Department level permissions
  "dept:customized-tour-booking-pax:view": {
    name: "View Department Customized Tour Booking Pax",
    description: "Can view customized tour booking pax within the scope of their department (via customized tour bookings).",
  },
  "dept:customized-tour-booking-pax:create": {
    name: "Create Department Customized Tour Booking Pax",
    description: "Can create customized tour booking pax within the scope of their department (via customized tour bookings).",
  },
  "dept:customized-tour-booking-pax:update": {
    name: "Update Department Customized Tour Booking Pax",
    description: "Can update customized tour booking pax within the scope of their department (via customized tour bookings).",
  },
  "dept:customized-tour-booking-pax:delete": {
    name: "Delete Department Customized Tour Booking Pax",
    description: "Can delete customized tour booking pax within the scope of their department (via customized tour bookings).",
  },

  // Tenant level permissions
  "tenant:customized-tour-booking-pax:view-list": {
    name: "View Tenant Customized Tour Booking Pax List",
    description: "Can list customized tour booking pax within the tenant.",
  },
  "tenant:customized-tour-booking-pax:view": {
    name: "View Tenant Customized Tour Booking Pax",
    description: "Can view customized tour booking pax within the tenant.",
  },
  "tenant:customized-tour-booking-pax:create": {
    name: "Create Tenant Customized Tour Booking Pax",
    description: "Can create customized tour booking pax within the tenant.",
  },
  "tenant:customized-tour-booking-pax:update": {
    name: "Update Tenant Customized Tour Booking Pax",
    description: "Can update customized tour booking pax within the tenant.",
  },
  "tenant:customized-tour-booking-pax:update-confirmed": {
    name: "Update Confirmed Tenant Customized Tour Booking Pax",
    description: "Can update confirmed customized tour booking pax within the tenant.",
  },
  "tenant:customized-tour-booking-pax:update-locked": {
    name: "Update Locked Tenant Customized Tour Booking Pax",
    description: "Can update locked customized tour booking pax within the tenant.",
  },
  "tenant:customized-tour-booking-pax:delete": {
    name: "Delete Tenant Customized Tour Booking Pax",
    description: "Can delete customized tour booking pax within the tenant.",
  },
};
