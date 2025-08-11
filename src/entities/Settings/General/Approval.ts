import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


/**
 * Standardized approval types used throughout the approval system.
 * These correspond to the 'approvalType' field in the approvals table
 * and are used for handler registration and targeting.
 */
export enum ApprovalType {
  /**
   * Group tour booking approval workflow
   */
  GROUP_TOUR_BOOKING = "group-tour-booking-approval",

  /**
   * Group tour booking special discount approval workflow
   */
  GROUP_TOUR_BOOKING_SPECIAL_DISCOUNT = "group-tour-booking-special-discount-approval",

  /**
   * Group tour booking transfer approval workflow
   */
  GROUP_TOUR_BOOKING_TRANSFER = "group-tour-booking-transfer-approval",

  /**
   * Group tour booking amendment approval workflow
   */
  GROUP_TOUR_BOOKING_AMENDMENT = "group-tour-booking-amendment-approval",

  /**
   * Budget approval workflow
   */
  BUDGET_APPROVAL = "budget-approval",

  /**
   * Travel request approval workflow
   */
  TRAVEL_REQUEST = "travel-request-approval",

  /**
   * Expense report approval workflow
   */
  EXPENSE_REPORT = "expense-report-approval",

  /**
   * Purchase order approval workflow
   */
  PURCHASE_ORDER = "purchase-order-approval",

  /**
   * Contract approval workflow
   */
  CONTRACT_APPROVAL = "contract-approval",

  /**
   * Vendor approval workflow
   */
  VENDOR_APPROVAL = "vendor-approval",

  /**
   * Policy exception approval workflow
   */
  POLICY_EXCEPTION = "policy-exception-approval",

  /**
   * Equipment request approval workflow
   */
  EQUIPMENT_REQUEST = "equipment-request-approval",

  /**
   * Leave request approval workflow
   */
  LEAVE_REQUEST = "leave-request-approval",

  /**
   * Exchange order DRAFT to WFA status change approval workflow
   */
  EXCHANGE_ORDER_DRAFT_TO_WFA = "exchange-order-draft-to-wfa-approval",

  /**
   * Independent tour booking approval workflows
   */
  INDEPENDENT_TOUR_BOOKING = "independent-tour-booking-approval",
  INDEPENDENT_TOUR_BOOKING_SPECIAL_DISCOUNT = "independent-tour-booking-special-discount-approval",
  INDEPENDENT_TOUR_BOOKING_AMENDMENT = "independent-tour-booking-amendment-approval",
}

export enum ApprovalLevelApproverType {
  DEPARTMENT = "DEPARTMENT",
  USER = "USER",
}

export const ApprovalLevelApproverZ = z.object({
  type: z.nativeEnum(ApprovalLevelApproverType),
  id: z.string(),
});

export const ApprovalLevelZ = z.object({
  minApprovers: z.number().int().positive(),
  allowSelfApproval: z.boolean(),
  approvers: z.array(ApprovalLevelApproverZ),
  levelTimeout: z.number().int().positive().default(604800000), // 7 days in milliseconds
});

export const TemporalWorkflowContextZ = z.object({
  workflowId: z.string(),
  runId: z.string(),
  startedAt: z.string(),
  taskQueue: z.string().optional(),
});


export const ApprovalZ = EntityZ.extend({
  entityType: z.literal(EntityType.APPROVAL),
  name: z.string().min(1).max(255),
  approvalType: z.nativeEnum(ApprovalType),
  groups: z.array(z.string()).optional(),
  sendEmail: z.boolean().default(true),
  notifySubmitterOnFinalOutcome: z.boolean().default(true),
  levels: z.array(ApprovalLevelZ),
  isEnabled: z.boolean().default(true),
});

export type Approval = z.infer<typeof ApprovalZ>;
export type ApprovalLevel = z.infer<typeof ApprovalLevelZ>;
export type ApprovalLevelApprover = z.infer<typeof ApprovalLevelApproverZ>;
export type TemporalWorkflowContext = z.infer<typeof TemporalWorkflowContextZ>;
