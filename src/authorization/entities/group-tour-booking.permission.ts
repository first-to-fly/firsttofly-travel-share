export const GroupTourBookingPermissions = {
  // User level permissions
  "user:group-tour-booking:view": {
    name: "View Group Tour Booking",
    description: "Can view own Group Tour Booking",
  },

  // Department level permissions
  "dept:group-tour-booking:view": {
    name: "View Department Group Tour Bookings",
    description: "Can view Group Tour Bookings within their department's scope",
  },
  "dept:group-tour-booking:create": {
    name: "Create Department Group Tour Bookings",
    description: "Can create Group Tour Bookings within their department's scope",
  },
  "dept:group-tour-booking:update": {
    name: "Update Department Group Tour Bookings",
    description: "Can update Group Tour Bookings within their department's scope",
  },
  "dept:group-tour-booking:delete": {
    name: "Delete Department Group Tour Bookings",
    description: "Can delete Group Tour Bookings within their department's scope",
  },
  "dept:group-tour-booking:confirm": {
    name: "Confirm Department Group Tour Bookings",
    description: "Can confirm Group Tour Bookings within their department's scope",
  },
  "dept:group-tour-booking:cancel": {
    name: "Cancel Department Group Tour Bookings",
    description: "Can cancel Group Tour Bookings within their department's scope",
  },
  "dept:group-tour-booking:read-snapshot": {
    name: "Read Department Group Tour Booking Snapshot",
    description: "Can read snapshot data of Group Tour Bookings within their department's scope",
  },

  // Tenant level permissions
  "tenant:group-tour-booking:view": {
    name: "View Tenant Group Tour Bookings",
    description: "Can view all Group Tour Bookings within the tenant",
  },
  "tenant:group-tour-booking:create": {
    name: "Create Tenant Group Tour Bookings",
    description: "Can create Group Tour Bookings within the tenant",
  },
  "tenant:group-tour-booking:update": {
    name: "Update Tenant Group Tour Bookings",
    description: "Can update Group Tour Bookings within the tenant",
  },
  "tenant:group-tour-booking:delete": {
    name: "Delete Tenant Group Tour Bookings",
    description: "Can delete Group Tour Bookings within the tenant",
  },
  "tenant:group-tour-booking:confirm": {
    name: "Confirm Tenant Group Tour Bookings",
    description: "Can confirm Group Tour Bookings within the tenant (trigger snapshot)",
  },
  "tenant:group-tour-booking:cancel": {
    name: "Cancel Tenant Group Tour Bookings",
    description: "Can cancel Group Tour Bookings within the tenant",
  },
  "tenant:group-tour-booking:read-snapshot": {
    name: "Read Tenant Group Tour Booking Snapshot",
    description: "Can read snapshot data of Group Tour Bookings within the tenant",
  },
};
