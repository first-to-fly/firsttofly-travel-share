import { z } from "zod";

import { EntityZ } from "../entity";
import { EntityType } from "../entityType";


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
}

export enum ApprovalLevelApproverType {
  DEPARTMENT = "DEPARTMENT",
  USER = "USER",
}

export const ApprovalLevelApproverZ = z.object({
  type: z.nativeEnum(ApprovalLevelApproverType),
  id: z.string().uuid(),
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
  targetEntityType: z.string(),
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

/**
 * Helper function to get all approval types as an array of strings
 */
export function getAllApprovalTypes(): string[] {
  return Object.values(ApprovalType);
}

/**
 * Helper function to check if a string is a valid approval type
 */
export function isValidApprovalType(type: string): type is ApprovalType {
  return Object.values(ApprovalType).includes(type as ApprovalType);
}

/**
 * Helper function to get the display name for an approval type
 */
export function getApprovalTypeDisplayName(type: ApprovalType): string {
  const displayNames: Record<ApprovalType, string> = {
    [ApprovalType.GROUP_TOUR_BOOKING]: "Group Tour Booking Approval",
    [ApprovalType.BUDGET_APPROVAL]: "Budget Approval",
    [ApprovalType.TRAVEL_REQUEST]: "Travel Request Approval",
    [ApprovalType.EXPENSE_REPORT]: "Expense Report Approval",
    [ApprovalType.PURCHASE_ORDER]: "Purchase Order Approval",
    [ApprovalType.CONTRACT_APPROVAL]: "Contract Approval",
    [ApprovalType.VENDOR_APPROVAL]: "Vendor Approval",
    [ApprovalType.POLICY_EXCEPTION]: "Policy Exception Approval",
    [ApprovalType.EQUIPMENT_REQUEST]: "Equipment Request Approval",
    [ApprovalType.LEAVE_REQUEST]: "Leave Request Approval",
  };

  return displayNames[type] || type;
}
