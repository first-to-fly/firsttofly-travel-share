export const GroupTourBookingRoomPermissions = {
  // User level permissions (view might be relevant if a user can see their own room details)
  "user:group-tour-booking-room:view": {
    name: "View Group Tour Booking Room",
    description: "Can view own Group Tour Booking Room details",
  },

  // Department level permissions
  "dept:group-tour-booking-room:view": {
    name: "View Department Group Tour Booking Rooms",
    description: "Can view Group Tour Booking Rooms within their department's scope (via a group tour booking)",
  },
  "dept:group-tour-booking-room:create": {
    name: "Create Department Group Tour Booking Room",
    description: "Can create Group Tour Booking Rooms within their department's scope (via a group tour booking)",
  },
  "dept:group-tour-booking-room:update": {
    name: "Update Department Group Tour Booking Room",
    description: "Can update Group Tour Booking Rooms within their department's scope (via a group tour booking)",
  },
  "dept:group-tour-booking-room:delete": {
    name: "Delete Department Group Tour Booking Room",
    description: "Can delete Group Tour Booking Rooms within their department's scope (via a group tour booking)",
  },

  // Tenant level permissions (typically rooms are managed in context of a booking)
  "tenant:group-tour-booking-room:view": {
    name: "View Tenant Group Tour Booking Rooms",
    description: "Can view all Group Tour Booking Rooms within the tenant (usually via a group tour booking)",
  },
  "tenant:group-tour-booking-room:create": {
    name: "Create Tenant Group Tour Booking Room",
    description: "Can create Group Tour Booking Rooms within the tenant (usually via a group tour booking)",
  },
  "tenant:group-tour-booking-room:update": {
    name: "Update Tenant Group Tour Booking Room",
    description: "Can update Group Tour Booking Rooms within the tenant (usually via a group tour booking)",
  },
  "tenant:group-tour-booking-room:delete": {
    name: "Delete Tenant Group Tour Booking Room",
    description: "Can delete Group Tour Booking Rooms within the tenant (usually via a group tour booking)",
  },
};
