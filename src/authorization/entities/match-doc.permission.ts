export const MatchDocPermissions = {
  // Tenant level permissions
  "tenant:match-doc:view-list": {
    name: "View Tenant Match Doc List",
    description: "Can view list of match docs within the tenant",
  },
  "tenant:match-doc:view": {
    name: "View Tenant Match Docs",
    description: "Can view all match docs within the tenant",
  },
  "tenant:match-doc:create": {
    name: "Create Tenant Match Docs",
    description: "Can create match docs within the tenant",
  },
  "tenant:match-doc:update": {
    name: "Update Tenant Match Docs",
    description: "Can update match docs within the tenant",
  },
  "tenant:match-doc:void": {
    name: "Void Tenant Match Docs",
    description: "Can void match docs within the tenant",
  },
} as const;
