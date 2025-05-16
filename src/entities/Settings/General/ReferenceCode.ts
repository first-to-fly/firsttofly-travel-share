import { z } from "zod";

import { FTFSafeMaxNumberZ } from "../../../types/number";
import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum CounterType {
  SEQUENTIAL = "Sequential",
  RANDOM = "Random",
}

export enum ResetCounterType {
  DISABLED = "Disabled",
  DAILY = "Daily",
  MONTHLY = "Monthly",
  YEARLY = "Yearly",
}

export enum ReferenceCodeEvents {
  REFERENCE_CODE_UPDATED = "REFERENCE_CODE_UPDATED",
  REFERENCE_CODE_LIST_UPDATED = "REFERENCE_CODE_LIST_UPDATED",
}

interface ReferenceCodeComponentItem {
  name: string;
  type: number;
  seq: number;
  description: string;
}

export const REFERENCE_CODE_COMPONENT: Record<string, ReferenceCodeComponentItem> = {
  NUM: {
    name: "Sequence Number",
    type: 0,
    seq: 2,
    description: "eg. 00001,00002,00003",
  },
  YY: {
    name: "Current Year (Two digit)",
    type: 0,
    seq: 3,
    description: "eg. If today is 07 SEP 2023, it will be 23",
  },
  YYYY: {
    name: "Current Year (Four digit)",
    type: 0,
    seq: 4,
    description: "eg. If today is 07 SEP 2023, it will be 2023",
  },
  MM: {
    name: "Current Month (Two digit)",
    type: 0,
    seq: 5,
    description: "eg. If today is 07 SEP 2023, it will be 09",
  },
  DD: {
    name: "Current day (Two digit)",
    type: 0,
    seq: 6,
    description: "eg. If today is 07 SEP 2023, it will be 07",
  },
  IATAC: {
    name: "IATA Airline Code",
    type: 1,
    seq: 7,
    description: "eg. SQ, AK, JL",
  },
  DEPTCODE: {
    name: "Department Code",
    type: 1,
    seq: 8,
    description: "",
  },
  DPTDATE: {
    name: "Departure Date",
    type: 1,
    seq: 9,
    description: "eg. If depar date is 07 SEP 2023, it will be 230907",
  },
  NOD: {
    name: "No of Days (Tour duration, two digit)",
    type: 1,
    seq: 13,
    description: "eg. 09, 13",
  },
  BOOKINGSTAC: {
    name: "Booking Station Code",
    type: 1,
    seq: 14,
    description: "",
  },
  DPTSTAC: {
    name: "Departure Station Code",
    type: 1,
    seq: 15,
    description: "",
  },
  SUPPLIERC: {
    name: "Supplier Code",
    type: 1,
    seq: 16,
    description: "",
  },
  PC: {
    name: "Product Code",
    type: 1,
    seq: 17,
    description: "",
  },
  PLT: {
    name: "Platform Channel (B2C website, iPad Sales-kit, Web Sales-kit, Mobile Web Sales-kit)",
    type: 2,
    seq: 18,
    description: "eg. WEB, SKPAD (sales-kit iPad), SKWEB, SKMOB",
  },
  SCH: {
    name: "Sales Channel (Counter Sales, B2B, B2B2C, Freelancer)",
    type: 2,
    seq: 19,
    description: "eg. B2C, B2B, B2B2C, KOL",
  },
  DPTYY: {
    name: "Departure Date Year (Two digit)",
    type: 1,
    seq: 10,
    description: "eg. If depar date is 07 SEP 2023, it will be 23",
  },
  DPTMM: {
    name: "Departure Date Month (Two digit)",
    type: 1,
    seq: 11,
    description: "eg. If depar date is 07 SEP 2023, it will be 09",
  },
  DPTDD: {
    name: "Departure Date Day (Two digit)",
    type: 1,
    seq: 12,
    description: "eg. If depar date is 07 SEP 2023, it will be 07",
  },
};


export const ReferenceCodeZ = EntityZ.extend({
  entityType: z.literal(EntityType.REFERENCE_CODE),
  name: z.string(),
  moduleName: z.string(),
  counterType: z.nativeEnum(CounterType).default(CounterType.SEQUENTIAL),
  resetCounterType: z.nativeEnum(ResetCounterType).default(ResetCounterType.DISABLED),
  counterWidth: FTFSafeMaxNumberZ({ name: "Counter width" }).int().nonnegative().default(5),
  template: z.string(),
  machineCode: z.string(),

  availableComponents: z.array(z.string()).optional(),
});


export type ReferenceCode = z.infer<typeof ReferenceCodeZ>;
