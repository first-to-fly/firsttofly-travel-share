import { z } from "zod";

import { DateISOStringZ } from "../../types/date";
import { NamedURLZ } from "../../types/url";
import { EntityZ } from "../entity";
import { EntityType } from "../entityType";


export enum DocumentEvents {
  DOCUMENT_UPDATED = "DOCUMENT_UPDATED",
  DOCUMENT_LIST_UPDATED = "DOCUMENT_LIST_UPDATED",
}

export enum DocumentType {
  PASSPORT = "passport",
  NATIONAL_ID = "national_id",
  DRIVING_LICENSE = "driving_license",
  VISA = "visa",
  MARRIAGE_CERTIFICATE = "marriage_certificate",
  BIRTH_CERTIFICATE = "birth_certificate",
  TRAVEL_PERMIT = "travel_permit",
  OTHER = "other",
}

export const DocumentTypeZ = z.nativeEnum(DocumentType);

export const DocumentZ = EntityZ.extend({
  entityType: z.literal(EntityType.DOCUMENT),

  entityOID: z.string(), // linkage to the entity that owns this document

  type: DocumentTypeZ,
  name: z.string(),
  docIdentification: z.string(),

  issueDate: DateISOStringZ,
  expiryDate: DateISOStringZ,

  files: z.array(NamedURLZ).nullable(),
});

export type Document = z.infer<typeof DocumentZ>;
