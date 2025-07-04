import { z } from "zod";

import { DateISOStringZ } from "../../../types/date";
import { MultiLangRecordZ } from "../../../types/multipleLanguage";
import { FTFSafeMaxNumberZ } from "../../../types/number";
import { EntityOIDZ, EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum UserDataEvents {
  USER_DATA_UPDATED = "USER_DATA_UPDATED",
  USER_DATA_LIST_UPDATED = "USER_DATA_LIST_UPDATED",
}


export const UserZ = EntityZ.extend({
  entityType: z.literal(EntityType.USER),

  // Existing properties
  email: z.string(),

  firstName: z.string(),
  lastName: z.string(),
  preferredName: z.string(),
  dob: DateISOStringZ,
  otherNames: MultiLangRecordZ(z.string()).optional(),
  mobile: z.number(),
  altMobile: z.number().optional(),
  personalEmail: z.string().optional(),
  images: z.array(z.string()).optional(),
  avatar: z.string().optional(),
  emergencyContact: z.object({
    name: z.string(),
    relationship: z.string().optional(),
    mobile: z.number(),
    email: z.string().optional(),
  }).optional(),
  description: z.string().optional(),
  salutation: z.string(),

  // Tenant specific properties
  designationOIDs: z.array(EntityOIDZ),
  departmentOIDs: z.array(EntityOIDZ).optional(),
  roleOIDs: z.array(EntityOIDZ).optional(),

  isActive: z.boolean().default(true),
  staffType: z.string().default("permanent"),
  buddyOID: EntityOIDZ.optional(),

  tourLeadingSkills: z.array(z.object({
    sectorOID: EntityOIDZ,
    termOID: EntityOIDZ,
    startYear: FTFSafeMaxNumberZ({
      name: "Tour leading skills start year",
      max: new Date().getFullYear(),
    }),
  })).optional(),

  languageSkills: z.array(z.object({
    termOID: EntityOIDZ,
  })).optional(),

  documentOIDs: z.array(EntityOIDZ).optional(),
});


export type User = z.infer<typeof UserZ>;
