import type { PermissionDeclaration } from "../permissions.types";


export const EmailTemplatePermissions: Record<string, PermissionDeclaration> = {
  "tenant:email-template:view-list": {
    name: "View Tenant Email Template List",
    description: "Can view list of email templates within the tenant",
  },
  "tenant:email-template:view": {
    name: "View Tenant Email Templates",
    description: "Can view all email templates within the tenant",
  },
  "tenant:email-template:manage": {
    name: "Manage Tenant Email Templates",
    description: "Can create, update, and delete email templates within the tenant",
  },
};
