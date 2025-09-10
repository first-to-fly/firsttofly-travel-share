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
  otherNames: MultiLangRecordZ(z.string()).nullish(),
  mobile: z.number(),
  altMobile: z.number().nullish(),
  personalEmail: z.string().nullish(),
  images: z.array(z.string()).nullish(),
  avatar: z.string().nullish(),
  emergencyContact: z.object({
    name: z.string(),
    relationship: z.string().nullish(),
    mobile: z.number(),
    email: z.string().nullish(),
  }).nullish(),
  description: z.string().nullish(),
  salutation: z.string(),

  // Tenant specific properties
  designationOIDs: z.array(EntityOIDZ),
  departmentOIDs: z.array(EntityOIDZ).nullish(),
  roleOIDs: z.array(EntityOIDZ).nullish(),

  isActive: z.boolean().default(true),
  staffType: z.string().default("permanent"),
  buddyOID: EntityOIDZ.nullish(),

  tourLeadingSkills: z.array(z.object({
    sectorOID: EntityOIDZ,
    termOID: EntityOIDZ,
    startYear: FTFSafeMaxNumberZ({
      name: "Tour leading skills start year",
      max: new Date().getFullYear(),
    }),
  })).nullish(),

  languageSkills: z.array(z.object({
    termOID: EntityOIDZ,
  })).nullish(),

  documentOIDs: z.array(EntityOIDZ).nullish(),
});


export type User = z.infer<typeof UserZ>;
