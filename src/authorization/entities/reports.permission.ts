/**
 * Reports module permissions cover:
 * 1. Catalogue access, execution, and export actions (by team)
 * 2. CRUD operations on persisted report entities
 */
export const ReportsPermissions = {
  // Catalogue permissions
  "tenant:reports:catalogue:view": {
    name: "View Reports Catalogue",
    description: "Can view the reports catalogue and metadata",
  },
  "dept:reports:catalogue:view": {
    name: "View Department Reports Catalogue",
    description: "Can view the reports catalogue for assigned departments",
  },

  // Report entity CRUD permissions (for managing saved/generated reports)
  "user:report:view": {
    name: "View Own Reports",
    description: "Can view reports created by themselves",
  },
  "dept:report:view": {
    name: "View Department Reports",
    description: "Can view reports within their department",
  },
  "dept:report:create": {
    name: "Create Department Reports",
    description: "Can create reports within their department",
  },
  "dept:report:update": {
    name: "Update Department Reports",
    description: "Can update reports within their department",
  },
  "dept:report:delete": {
    name: "Delete Department Reports",
    description: "Can delete reports within their department",
  },
  "tenant:report:view-list": {
    name: "View Tenant Report List",
    description: "Can view list of reports within the tenant",
  },
  "tenant:report:view": {
    name: "View Tenant Reports",
    description: "Can view all reports within the tenant",
  },
  "tenant:report:create": {
    name: "Create Tenant Reports",
    description: "Can create reports within the tenant",
  },
  "tenant:report:update": {
    name: "Update Tenant Reports",
    description: "Can update reports within the tenant",
  },
  "tenant:report:delete": {
    name: "Delete Tenant Reports",
    description: "Can delete reports within the tenant",
  },

  // Scheduled Report CRUD permissions
  "user:scheduled-report:view": {
    name: "View Own Scheduled Reports",
    description: "Can view scheduled reports created by themselves",
  },
  "dept:scheduled-report:view": {
    name: "View Department Scheduled Reports",
    description: "Can view scheduled reports within their department",
  },
  "dept:scheduled-report:create": {
    name: "Create Department Scheduled Reports",
    description: "Can create scheduled reports within their department",
  },
  "dept:scheduled-report:update": {
    name: "Update Department Scheduled Reports",
    description: "Can update scheduled reports within their department",
  },
  "dept:scheduled-report:delete": {
    name: "Delete Department Scheduled Reports",
    description: "Can delete scheduled reports within their department",
  },
  "tenant:scheduled-report:view-list": {
    name: "View Tenant Scheduled Report List",
    description: "Can view list of scheduled reports within the tenant",
  },
  "tenant:scheduled-report:view": {
    name: "View Tenant Scheduled Reports",
    description: "Can view all scheduled reports within the tenant",
  },
  "tenant:scheduled-report:create": {
    name: "Create Tenant Scheduled Reports",
    description: "Can create scheduled reports within the tenant",
  },
  "tenant:scheduled-report:update": {
    name: "Update Tenant Scheduled Reports",
    description: "Can update scheduled reports within the tenant",
  },
  "tenant:scheduled-report:delete": {
    name: "Delete Tenant Scheduled Reports",
    description: "Can delete scheduled reports within the tenant",
  },

  // Team-based execution permissions (existing)
  "tenant:reports:sales:run": {
    name: "Run Sales Reports",
    description: "Can run sales report queries",
  },
  "tenant:reports:sales:export": {
    name: "Export Sales Reports",
    description: "Can export sales report data",
  },
  "tenant:reports:finance:run": {
    name: "Run Finance Reports",
    description: "Can run finance report queries",
  },
  "tenant:reports:finance:export": {
    name: "Export Finance Reports",
    description: "Can export finance report data",
  },
  "tenant:reports:operations:run": {
    name: "Run Operations Reports",
    description: "Can run operations report queries",
  },
  "tenant:reports:management:run": {
    name: "Run Management Reports",
    description: "Can run management report queries",
  },
  "dept:reports:sales:run": {
    name: "Run Department Sales Reports",
    description: "Can run sales report queries within assigned departments",
  },
  "dept:reports:sales:export": {
    name: "Export Department Sales Reports",
    description: "Can export sales report data within assigned departments",
  },
  "dept:reports:finance:run": {
    name: "Run Department Finance Reports",
    description: "Can run finance report queries within assigned departments",
  },
  "dept:reports:finance:export": {
    name: "Export Department Finance Reports",
    description: "Can export finance report data within assigned departments",
  },
  "dept:reports:operations:run": {
    name: "Run Department Operations Reports",
    description: "Can run operations report queries within assigned departments",
  },
  "dept:reports:management:run": {
    name: "Run Department Management Reports",
    description: "Can run management report queries within assigned departments",
  },
};
