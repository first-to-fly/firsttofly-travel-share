import type { PermissionDeclaration } from "../permissions.types";


export const PdfTemplatePermissions: Record<string, PermissionDeclaration> = {
  "tenant:pdf-template:view-list": {
    name: "View Tenant PDF Template List",
    description: "Can view list of PDF templates within the tenant",
  },
  "tenant:pdf-template:view": {
    name: "View Tenant PDF Templates",
    description: "Can view all PDF templates within the tenant",
  },
  "tenant:pdf-template:manage": {
    name: "Manage Tenant PDF Templates",
    description: "Can create, update, and delete PDF templates within the tenant",
  },
};
