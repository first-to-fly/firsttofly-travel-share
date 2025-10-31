import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../entity";
import { EntityType } from "../entityType";


export enum ReportTemplateEvents {
  REPORT_TEMPLATE_UPDATED = "REPORT_TEMPLATE_UPDATED",
  REPORT_TEMPLATE_LIST_UPDATED = "REPORT_TEMPLATE_LIST_UPDATED",
}

export const ReportTemplateZ = EntityZ.extend({
  entityType: z.literal(EntityType.REPORT_TEMPLATE),
  tenantOID: EntityOIDZ.nullish(),
  key: z.string(),
  template: z.string(),
});

export type ReportTemplate = z.infer<typeof ReportTemplateZ>;
