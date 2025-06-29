export const BookingPermissions = {
  // User level permissions
  "user:booking:view": {
    name: "View Booking",
    description: "Can view own Booking",
  },

  // Department level permissions
  "dept:booking:view": {
    name: "View Department Bookings",
    description: "Can view Bookings within their department's scope",
  },
  "dept:booking:create": {
    name: "Create Department Bookings",
    description: "Can create Bookings within their department's scope",
  },
  "dept:booking:update": {
    name: "Update Department Bookings",
    description: "Can update Bookings within their department's scope",
  },
  "dept:booking:delete": {
    name: "Delete Department Bookings",
    description: "Can delete Bookings within their department's scope",
  },
  "dept:booking:confirm": {
    name: "Confirm Department Bookings",
    description: "Can confirm Bookings within their department's scope",
  },
  "dept:booking:cancel": {
    name: "Cancel Department Bookings",
    description: "Can cancel Bookings within their department's scope",
  },
  "dept:booking:read-snapshot": {
    name: "Read Department Booking Snapshot",
    description: "Can read snapshot data of Bookings within their department's scope",
  },

  // Tenant level permissions
  "tenant:booking:view": {
    name: "View Tenant Bookings",
    description: "Can view all Bookings within the tenant",
  },
  "tenant:booking:create": {
    name: "Create Tenant Bookings",
    description: "Can create Bookings within the tenant",
  },
  "tenant:booking:update": {
    name: "Update Tenant Bookings",
    description: "Can update Bookings within the tenant",
  },
  "tenant:booking:delete": {
    name: "Delete Tenant Bookings",
    description: "Can delete Bookings within the tenant",
  },
  "tenant:booking:confirm": {
    name: "Confirm Tenant Bookings",
    description: "Can confirm Bookings within the tenant (trigger snapshot)",
  },
  "tenant:booking:cancel": {
    name: "Cancel Tenant Bookings",
    description: "Can cancel Bookings within the tenant",
  },
  "tenant:booking:read-snapshot": {
    name: "Read Tenant Booking Snapshot",
    description: "Can read snapshot data of Bookings within the tenant",
  },
};
