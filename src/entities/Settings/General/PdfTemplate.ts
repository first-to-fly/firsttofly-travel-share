import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum PdfTemplateKey {
  BOOKING_CONFIRMATION = "booking.confirmation",
  PAX_STATEMENT = "pax.statement",
}

export const PdfTemplateKeyZ = z.nativeEnum(PdfTemplateKey);

export const PdfTemplateZ = EntityZ.extend({
  entityType: z.literal(EntityType.PDF_TEMPLATE),
  tenantOID: EntityOIDZ.nullish(),
  key: PdfTemplateKeyZ,
  template: z.string(),
});

export type PdfTemplate = z.infer<typeof PdfTemplateZ>;
