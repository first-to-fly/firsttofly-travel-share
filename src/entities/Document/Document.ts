import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { NamedURLZ } from "../../types/url";
import { EntityZ } from "../entity";
import { EntityType } from "../entityType";


export enum DocumentEvents {
  DOCUMENT_UPDATED = "DOCUMENT_UPDATED",
  DOCUMENT_LIST_UPDATED = "DOCUMENT_LIST_UPDATED",
}

export const DocumentZ = EntityZ.extend({
  entityType: z.literal(EntityType.DOCUMENT),

  entityOID: z.string(), // linkage to the entity that owns this document

  type: z.string(),
  name: z.string(),
  docIdentification: z.string(),

  issueDate: DateISOStringZ,
  expiryDate: DateISOStringZ,

  files: z.array(NamedURLZ).nullable(),
});

export type Document = z.infer<typeof DocumentZ>;
