export const BookingTransferPermissions = {
  // User level permissions (typically view only for their own associated records, if applicable)
  // "user:booking-transfer:view": {
  //   name: "View Own Booking Transfers",
  //   description: "Can view own booking transfers",
  // },

  // Department level permissions
  "dept:booking-transfer:view": {
    name: "View Department Booking Transfers",
    description: "Can view booking transfers within their department's bookings",
  },
  "dept:booking-transfer:create": {
    name: "Create Department Booking Transfer",
    description: "Can create booking transfers for their department's bookings",
  },
  // Update and Delete are not applicable as transfers are immutable once created.

  // Tenant level permissions
  "tenant:booking-transfer:view": {
    name: "View Tenant Booking Transfers",
    description: "Can view all booking transfers within the tenant",
  },
  "tenant:booking-transfer:create": {
    name: "Create Tenant Booking Transfer",
    description: "Can create booking transfers for any booking within the tenant",
  },
  // Update and Delete are not applicable
};

export type BookingTransferPermission = keyof typeof BookingTransferPermissions;
