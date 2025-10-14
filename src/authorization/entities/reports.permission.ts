/**
 * Reports module permissions cover catalogue access, execution, and export actions
 * across the main business functions (sales, finance, operations, management).
 */
export const ReportsPermissions = {
  "tenant:reports:catalogue:view": {
    name: "View Reports Catalogue",
    description: "Can view the reports catalogue and metadata",
  },
  "dept:reports:catalogue:view": {
    name: "View Department Reports Catalogue",
    description: "Can view the reports catalogue for assigned departments",
  },
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
