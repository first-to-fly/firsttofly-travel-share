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

export enum ReferenceMachineCode {
  // Operation Module
  OPERATION_COSTING = "operation_costing",
  OPERATION_TOUR_DEPARTURE = "operation_tour_departure",
  OPERATION_PRICE_CODES = "operation_price_codes",
  OPERATION_EO = "operation_eo",
  OPERATION_APPROVAL = "operation_approval",

  // Sales Module
  SALES_GIT_BOOKINGS = "sales_git_bookings",
  SALES_FIT_BOOKINGS = "sales_fit_bookings",
  SALES_CANCELLATION_FEE_REQUEST = "sales_cancellation_fee_request",
  SALES_AMEND_GIT_BOOKING = "sales_amend_git_booking",

  // Finance Module
  FINANCE_BILL = "finance_bill",
  FINANCE_RECEIPT = "finance_receipt",
  FINANCE_PAYMENT_MADE = "finance_payment_made",
  FINANCE_CREDIT_NOTE = "finance_credit_note",
  FINANCE_PAYMENT_RECEIVED = "finance_payment_received",
  FINANCE_BUDGET_TRANSFER = "finance_budget_transfer",
  FINANCE_REFUND = "finance_refund",
  FINANCE_MANUAL_JOURNAL = "finance_manual_journal",
  FINANCE_JOURNAL = "finance_journal",
  FINANCE_CANCELLATION_FEE = "finance_cancellation_fee",
  FINANCE_REFUND_REQUEST = "finance_refund_request",
  FINANCE_REVERSE_RECEIPT = "finance_reverse_receipt",
  FINANCE_REVERSE_REFUND = "finance_reverse_refund",
  FINANCE_REVERSE_MANUAL_JOURNAL = "finance_reverse_manual_journal",
  FINANCE_REVERSE_JOURNAL = "finance_reverse_journal",
  FINANCE_REVERSE_CANCELLATION_FEE = "finance_reverse_cancellation_fee",
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
  machineCode: z.nativeEnum(ReferenceMachineCode),

  availableComponents: z.array(z.string()).optional(),

  // Metadata field for flexible additional data
  metadata: z.record(z.string(), z.unknown()).optional(),
});


export type ReferenceCode = z.infer<typeof ReferenceCodeZ>;
