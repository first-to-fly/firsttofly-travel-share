import { z } from "zod";
import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";

export enum UsefulInfoEvents {
  USEFUL_INFO_UPDATED = "USEFUL_INFO_UPDATED",
  USEFUL_INFO_LIST_UPDATED = "USEFUL_INFO_LIST_UPDATED",
}

export const UsefulInfoZ = EntityZ.extend({
  entityType: z.literal(EntityType.USEFUL_INFO),

  name: z.string(),
  coverage: z.number().optional(),
  status: z.boolean().default(true),
  offlineOperator: z.string().optional(),
  remarks: z.string().optional(),
  info: z.object({
    otherInfo: z.string().optional(),
    tipping: z.string().optional(),
    visa: z.string().optional(),
    weather: z.string().optional(),
    optionalTours: z.string().optional(),
  }).optional(),

  refOIDs: z.array(z.string()).optional(),
  productTypeOIDs: z.array(z.string()).optional(),
});

export type UsefulInfo = z.infer<typeof UsefulInfoZ>;

export const UsefulInfoRefZ = EntityZ.extend({
  entityType: z.literal(EntityType.USEFUL_INFO_REF),
  usefulInfoOID: z.string(),
  refId: z.number(),
  name: z.string(),
});

export type UsefulInfoRef = z.infer<typeof UsefulInfoRefZ>;

export const UsefulInfoProductTypeZ = EntityZ.extend({
  entityType: z.literal(EntityType.USEFUL_INFO_PRODUCT_TYPE),
  usefulInfoOID: z.string(),
  productTypeOID: z.string(),
  offlineOperator: z.string().optional(),
  productTypeName: z.string().optional(),
});

export type UsefulInfoProductType = z.infer<typeof UsefulInfoProductTypeZ>;
