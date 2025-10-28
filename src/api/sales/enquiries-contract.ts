import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../../entities/entity";
import {
  EnquiryStatus,
  EnquiryStatusZ,
  EnquiryZ,
} from "../../entities/Sales/Enquiry";


const basePath = "/api/sales/enquiries";

const CreateEnquiryZ = EnquiryZ.extend({
  tenantOID: EntityOIDZ,
}).extend({
  destinations: EnquiryZ.shape.destinations.max(20),
  shortlistProductOIDs: EnquiryZ.shape.shortlistProductOIDs.max(10),
  status: EnquiryZ.shape.status.default(EnquiryStatus.OPEN),
}).pick({
  tenantOID: true,
  customerName: true,
  mobile: true,
  email: true,
  productType: true,
  enquiryChannel: true,
  occupancy: true,
  budget: true,
  travelPeriod: true,
  destinations: true,
  shortlistProductOIDs: true,
  notes: true,
  status: true,
  statusReason: true,
});

const UpdateEnquiryZ = CreateEnquiryZ.omit({
  tenantOID: true,
}).partial();

const BatchUpdateEnquiryZ = z.record(EntityOIDZ.describe("Enquiry OID"), UpdateEnquiryZ);

const ListEnquiriesQueryZ = z.object({
  tenantOID: EntityOIDZ,
  status: z.array(EnquiryStatusZ).max(6).nullish(),
  search: z.string().nullish(),
  page: z.number().int().min(1).nullish(),
  pageSize: z.number().int().min(1).max(100)
    .nullish(),
}).passthrough();

const EnquiryListResponseZ = z.object({
  items: z.array(EnquiryZ),
  total: z.number().int(),
  page: z.number().int(),
  pageSize: z.number().int(),
});

export type CreateEnquiry = z.infer<typeof CreateEnquiryZ>;
export type UpdateEnquiry = z.infer<typeof UpdateEnquiryZ>;

export const enquiriesContract = initContract().router({
  getEnquiries: {
    summary: "Get enquiries with filters",
    method: "GET",
    path: basePath,
    query: ListEnquiriesQueryZ,
    responses: {
      200: EnquiryListResponseZ,
    },
  },

  createEnquiry: {
    summary: "Create a new enquiry",
    method: "POST",
    path: basePath,
    body: CreateEnquiryZ,
    responses: {
      200: z.string(),
    },
  },

  updateEnquiries: {
    summary: "Batch update enquiries",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: BatchUpdateEnquiryZ,
    responses: {
      200: z.array(EntityOIDZ),
    },
  },

  deleteEnquiries: {
    summary: "Batch delete enquiries",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      enquiryOIDs: z.array(EntityOIDZ),
      tenantOID: EntityOIDZ,
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
