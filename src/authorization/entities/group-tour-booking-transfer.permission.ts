export const GroupTourBookingTransferPermissions = {
  // User level permissions (typically view only for their own associated records, if applicable)
  // "user:group-tour-booking-transfer:view": {
  //   name: "View Own Group Tour Booking Transfers",
  //   description: "Can view own group tour booking transfers",
  // },

  // Department level permissions
  "dept:group-tour-booking-transfer:view": {
    name: "View Department Group Tour Booking Transfers",
    description: "Can view group tour booking transfers within their department's bookings",
  },
  "dept:group-tour-booking-transfer:create": {
    name: "Create Department Group Tour Booking Transfer",
    description: "Can create group tour booking transfers for their department's bookings",
  },
  // Update and Delete are not applicable as transfers are immutable once created.

  // Tenant level permissions
  "tenant:group-tour-booking-transfer:view": {
    name: "View Tenant Group Tour Booking Transfers",
    description: "Can view all group tour booking transfers within the tenant",
  },
  "tenant:group-tour-booking-transfer:create": {
    name: "Create Tenant Group Tour Booking Transfer",
    description: "Can create group tour booking transfers for any booking within the tenant",
  },
  // Update and Delete are not applicable
};

export type GroupTourBookingTransferPermission = keyof typeof GroupTourBookingTransferPermissions;
