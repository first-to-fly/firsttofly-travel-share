export const CustomizedTourBookingPermissions = {
  // User level permissions
  "user:customized-tour-booking:view": {
    name: "View Customized Tour Booking",
    description: "Can view own Customized Tour Bookings",
  },

  // Department level permissions
  "dept:customized-tour-booking:view": {
    name: "View Department Customized Tour Bookings",
    description: "Can view Customized Tour Bookings within their department's scope",
  },
  "dept:customized-tour-booking:create": {
    name: "Create Department Customized Tour Bookings",
    description: "Can create Customized Tour Bookings within their department's scope",
  },
  "dept:customized-tour-booking:update": {
    name: "Update Department Customized Tour Bookings",
    description: "Can update Customized Tour Bookings within their department's scope",
  },
  "dept:customized-tour-booking:delete": {
    name: "Delete Department Customized Tour Bookings",
    description: "Can delete Customized Tour Bookings within their department's scope",
  },
  "dept:customized-tour-booking:confirm": {
    name: "Confirm Department Customized Tour Bookings",
    description: "Can confirm Customized Tour Bookings within their department's scope",
  },
  "dept:customized-tour-booking:cancel": {
    name: "Cancel Department Customized Tour Bookings",
    description: "Can cancel Customized Tour Bookings within their department's scope",
  },

  // Tenant level permissions
  "tenant:customized-tour-booking:view-list": {
    name: "View Tenant Customized Tour Booking List",
    description: "Can view list of Customized Tour Bookings within the tenant",
  },
  "tenant:customized-tour-booking:view": {
    name: "View Tenant Customized Tour Bookings",
    description: "Can view all Customized Tour Bookings within the tenant",
  },
  "tenant:customized-tour-booking:create": {
    name: "Create Tenant Customized Tour Bookings",
    description: "Can create Customized Tour Bookings within the tenant",
  },
  "tenant:customized-tour-booking:update": {
    name: "Update Tenant Customized Tour Bookings",
    description: "Can update Customized Tour Bookings within the tenant",
  },
  "tenant:customized-tour-booking:delete": {
    name: "Delete Tenant Customized Tour Bookings",
    description: "Can delete Customized Tour Bookings within the tenant",
  },
  "tenant:customized-tour-booking:confirm": {
    name: "Confirm Tenant Customized Tour Bookings",
    description: "Can confirm Customized Tour Bookings within the tenant",
  },
  "tenant:customized-tour-booking:cancel": {
    name: "Cancel Tenant Customized Tour Bookings",
    description: "Can cancel Customized Tour Bookings within the tenant",
  },
} as const;
