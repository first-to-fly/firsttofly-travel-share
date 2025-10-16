import { initContract } from "@ts-rest/core";

import { approvalRequestContract } from "./approval-request-contract";
import { budgetContract } from "./budget-contract";
import { budgetEntryContract } from "./budget-entry-contract";
import { exchangeOrderContract } from "./exchange-order-contract";
import { exchangeOrderItemContract } from "./exchange-order-item-contract";
import { reportEntityContract } from "./report-entity-contract";
import { reportsContract } from "./reports-contract";
import { scheduledReportContract } from "./scheduled-report-contract";
import { supplierAddressContract } from "./supplier-address-contract";
import { supplierContract } from "./supplier-contract";
import { supplierPaymentContract } from "./supplier-payment-contract";
import { supplierPersonContract } from "./supplier-person-contract";
import { tourDepartureAccommodationContract } from "./tour-departure-accommodation-contract";
import { tourDepartureContract } from "./tour-departure-contract";
import { tourDepartureRoomAllocationContract } from "./tour-departure-room-allocation-contract";
import { transportGroupContract } from "./transport-group-contract";
import { transportSegmentContract } from "./transport-segment-contract";


export const operationsContract = initContract().router({
  approvalRequest: approvalRequestContract,
  budget: budgetContract,
  budgetEntry: budgetEntryContract,
  exchangeOrder: exchangeOrderContract,
  exchangeOrderItem: exchangeOrderItemContract,
  supplier: supplierContract,
  supplierAddress: supplierAddressContract,
  supplierPayment: supplierPaymentContract,
  supplierPerson: supplierPersonContract,
  reportEntity: reportEntityContract,
  reports: reportsContract,
  scheduledReport: scheduledReportContract,
  tourDeparture: tourDepartureContract,
  tourDepartureAccommodation: tourDepartureAccommodationContract,
  tourDepartureRoomAllocation: tourDepartureRoomAllocationContract,
  transportGroup: transportGroupContract,
  transportSegment: transportSegmentContract,
});
