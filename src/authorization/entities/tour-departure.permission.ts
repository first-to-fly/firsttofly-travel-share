export const TourDeparturePermissions = {
  // User level permissions
  "user:tourDeparture:view": {
    name: "View Tour Departure",
    description: "Can view own Tour Departure",
  },

  // Department level permissions
  "dept:tourDeparture:view": {
    name: "View Department Tour Departures",
    description: "Can view Tour Departures within their department",
  },
  "dept:tourDeparture:create": {
    name: "Create Department Tour Departure",
    description: "Can create Tour Departure within their department",
  },
  "dept:tourDeparture:update": {
    name: "Update Department Tour Departure",
    description: "Can update Tour Departure within their department",
  },
  "dept:tourDeparture:delete": {
    name: "Delete Department Tour Departure",
    description: "Can delete Tour Departure within their department",
  },

  // Tenant level permissions
  "tenant:tourDeparture:view": {
    name: "View Tenant Tour Departures",
    description: "Can view all Tour Departures within the tenant",
  },
  "tenant:tourDeparture:create": {
    name: "Create Tenant Tour Departures",
    description: "Can create Tour Departures within the tenant",
  },
  "tenant:tourDeparture:update": {
    name: "Update Tenant Tour Departures",
    description: "Can update Tour Departures within the tenant",
  },
  "tenant:tourDeparture:delete": {
    name: "Delete Tenant Tour Departures",
    description: "Can delete Tour Departures within the tenant",
  },
};
