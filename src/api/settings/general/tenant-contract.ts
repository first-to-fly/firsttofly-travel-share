import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { TenantZ } from "../../../entities/Settings/General/Tenant";


const basePath = "/api/settings/tenants";

const CreateTenantZ = TenantZ.pick({
  name: true,
  logo: true,
  description: true,
  domain: true,
  localizationSupportLanguages: true,
  homeCurrency: true,
  currencyExtra: true,
  defaultTaxConfig: true,
  pdfHeader: true,
});

const UpdateTenantZ = CreateTenantZ.partial();

export type UpdateTenant = z.infer<typeof UpdateTenantZ>;
export type CreateTenant = z.infer<typeof CreateTenantZ>;

export const tenantContract = initContract().router({

  createTenant: {
    summary: "Create a new tenant",
    method: "POST",
    path: basePath,
    body: CreateTenantZ,
    responses: {
      200: z.string(),
    },
  },

  updateTenant: {
    summary: "Update an existing tenant",
    method: "PATCH",
    path: `${basePath}/:tenantOID`,
    body: UpdateTenantZ,
    responses: {
      200: z.string(),
    },
  },

  updateTenants: {
    summary: "Update multiple existing tenants",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of tenant to update"),
      UpdateTenantZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated tenants")),
    },
  },

  deleteTenant: {
    summary: "Delete a tenant",
    method: "DELETE",
    path: `${basePath}/:tenantOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteTenants: {
    summary: "Delete multiple tenants",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      tenantOIDs: z.array(z.string().describe("OIDs of tenants to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
