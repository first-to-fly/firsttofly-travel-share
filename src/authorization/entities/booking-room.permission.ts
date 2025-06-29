export const BookingRoomPermissions = {
  // User level permissions (view might be relevant if a user can see their own room details)
  "user:booking-room:view": {
    name: "View Booking Room",
    description: "Can view own Booking Room details",
  },

  // Department level permissions
  "dept:booking-room:view": {
    name: "View Department Booking Rooms",
    description: "Can view Booking Rooms within their department's scope (via a transaction)",
  },
  "dept:booking-room:create": {
    name: "Create Department Booking Room",
    description: "Can create Booking Rooms within their department's scope (via a transaction)",
  },
  "dept:booking-room:update": {
    name: "Update Department Booking Room",
    description: "Can update Booking Rooms within their department's scope (via a transaction)",
  },
  "dept:booking-room:delete": {
    name: "Delete Department Booking Room",
    description: "Can delete Booking Rooms within their department's scope (via a transaction)",
  },

  // Tenant level permissions (typically rooms are managed in context of a transaction)
  "tenant:booking-room:view": {
    name: "View Tenant Booking Rooms",
    description: "Can view all Booking Rooms within the tenant (usually via a transaction)",
  },
  "tenant:booking-room:create": {
    name: "Create Tenant Booking Room",
    description: "Can create Booking Rooms within the tenant (usually via a transaction)",
  },
  "tenant:booking-room:update": {
    name: "Update Tenant Booking Room",
    description: "Can update Booking Rooms within the tenant (usually via a transaction)",
  },
  "tenant:booking-room:delete": {
    name: "Delete Tenant Booking Room",
    description: "Can delete Booking Rooms within the tenant (usually via a transaction)",
  },
};
