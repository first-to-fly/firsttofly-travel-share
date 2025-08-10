import { AccountCodePermissions } from "./entities/account-code.permission";
import { ApprovalPermissions } from "./entities/approval.permission";
import { ApprovalRequestPermissions } from "./entities/approval-request.permission";
import { AssembleLocationAirlinesPermissions } from "./entities/assemble-location-airlines.permission";
import { BadgePermissions } from "./entities/badge.permission";
import { BillPermissions } from "./entities/bill.permission";
import { BudgetPermissions } from "./entities/budget.permission";
import { CostingItemPermissions } from "./entities/costing-item.permission";
import { CostingTemplatePermissions } from "./entities/costing-template.permission";
import { DepartmentPermissions } from "./entities/department.permission";
import { DepositPermissions } from "./entities/deposit.permission";
import { DesignationPermissions } from "./entities/designation.permission";
import { DiscountPermissions, DiscountTemplatePermissions } from "./entities/discount.permission"; // Import new permissions
import { DocumentPermissions } from "./entities/document.permission";
import { ExchangeOrderPermissions } from "./entities/exchange-order.permission";
import { GroupTourBookingPermissions } from "./entities/group-tour-booking.permission";
import { GroupTourBookingPaxPermissions } from "./entities/group-tour-booking-pax.permission";
import { GroupTourBookingRoomPermissions } from "./entities/group-tour-booking-room.permission";
import { GroupTourCostingPermissions } from "./entities/group-tour-costing.permission";
import { GroupTourItineraryPermissions } from "./entities/group-tour-itinerary.permission";
import { GroupTourPricingPermissions } from "./entities/group-tour-pricing.permission";
import { GroupTourProductPermissions } from "./entities/group-tour-product.permission";
import { IndependentTourBookingPermissions } from "./entities/independent-tour-booking.permission";
import { IndependentTourProductPermissions } from "./entities/independent-tour-product.permission";
import { InsuranceDiscountPermissions } from "./entities/insurance-discount.permission";
import { LocationPermissions } from "./entities/location.permission";
import { MatchDocPermissions } from "./entities/match-doc.permission";
import { MealPermissions } from "./entities/meal.permission";
import { MediaPermissions } from "./entities/media.permission";
import { PaymentOrderPermissions } from "./entities/payment-order.permission";
import { PaymentWayPermissions } from "./entities/payment-way.permission";
import { POIPermissions } from "./entities/poi.permission";
import { PrivacyPolicyPermissions } from "./entities/privacy-policy.permission";
import { ProductPermissions } from "./entities/product.permission";
import { ReferenceCodePermissions } from "./entities/reference-code.permission";
import { RolePermissions } from "./entities/role.permission"; // Corrected import path and name
import { RoomConfigurationPermissions } from "./entities/room-configuration.permission";
import { SectorPermissions } from "./entities/sector.permission";
import { SectorGroupPermissions } from "./entities/sector-group.permission";
import { SpecialInstructionPermissions } from "./entities/special-instruction.permission";
import { StationCodePermissions } from "./entities/station-code.permission";
import { SupplierPermissions } from "./entities/supplier.permission";
import { TenantPermissions } from "./entities/tenant.permission";
import { TermPermissions } from "./entities/term.permission";
import { TermConditionPermissions } from "./entities/term-condition.permission";
import { TourDeparturePermissions } from "./entities/tour-departure.permission";
import { TransactionPermissions } from "./entities/transaction.permission";
import { TransportGroupPermissions } from "./entities/transport-group.permission";
import { TransportPlanPermissions } from "./entities/transport-plan.permission";
import { TransportSegmentPermissions } from "./entities/transport-segment.permission";
import { UsefulInfoPermissions } from "./entities/useful-info.permission";
import { UserPermissions } from "./entities/user.permission";
import { UserMessagePermissions } from "./entities/user-message.permission";
import type { PermissionDeclaration } from "./permissions.types";


type ExtractObjectKeysRecursive<T> =
  T extends Record<string, unknown> ? keyof T | ExtractObjectKeysRecursive<T[keyof T]> : never;

export type Permission = Exclude<
ExtractObjectKeysRecursive<typeof EntityPermissions>,
keyof typeof EntityPermissions | keyof PermissionDeclaration
>;

const EntityPermissions = {
  User: UserPermissions,
  Department: DepartmentPermissions,
  Deposit: DepositPermissions,
  Document: DocumentPermissions,
  Media: MediaPermissions,
  Product: ProductPermissions,
  Badge: BadgePermissions,
  "Costing Item": CostingItemPermissions,
  "Costing Template": CostingTemplatePermissions,
  Designation: DesignationPermissions,
  "Insurance Discount": InsuranceDiscountPermissions,
  Location: LocationPermissions,
  "Point of Interest": POIPermissions,
  "Privacy Policy": PrivacyPolicyPermissions,
  "Reference Code": ReferenceCodePermissions,
  Role: RolePermissions,
  "Special Instruction": SpecialInstructionPermissions,
  "Station Code": StationCodePermissions,
  Tenant: TenantPermissions,
  "Term Condition": TermConditionPermissions,
  Meal: MealPermissions,
  Sector: SectorPermissions,
  "Sector Group": SectorGroupPermissions,
  Term: TermPermissions,
  "Useful Info": UsefulInfoPermissions,
  "Assemble Location Airlines": AssembleLocationAirlinesPermissions,
  "Room Configuration": RoomConfigurationPermissions,
  Discount: DiscountPermissions,
  "Group Tour Booking Room": GroupTourBookingRoomPermissions,
  "Group Tour Booking Pax": GroupTourBookingPaxPermissions,
  "Discount Template": DiscountTemplatePermissions,
  "Group Tour Costing": GroupTourCostingPermissions,
  "Group Tour Product": GroupTourProductPermissions,
  "Group Tour Pricing": GroupTourPricingPermissions,
  "Group Tour Itinerary": GroupTourItineraryPermissions,
  "Independent Tour Product": IndependentTourProductPermissions,
  "Tour Departure": TourDeparturePermissions,
  Budget: BudgetPermissions,
  Bill: BillPermissions,
  "Match Doc": MatchDocPermissions,
  "Account Code": AccountCodePermissions,
  "Payment Way": PaymentWayPermissions,
  "Transport Group": TransportGroupPermissions,
  "Transport Segment": TransportSegmentPermissions,
  "Transport Plan": TransportPlanPermissions,
  Supplier: SupplierPermissions,
  "Group Tour Booking": GroupTourBookingPermissions,
  "Independent Tour Booking": IndependentTourBookingPermissions,
  "Approval Management": ApprovalPermissions,
  "Approval Request": ApprovalRequestPermissions,
  "User Message": UserMessagePermissions,
  "Payment Order": PaymentOrderPermissions,
  Transaction: TransactionPermissions,
  "Exchange Order": ExchangeOrderPermissions,
} as const;

export type PermissionsModules = keyof typeof EntityPermissions;
export type APermissions = (typeof EntityPermissions)[PermissionsModules];


export const AllPermissions: Record<
keyof typeof EntityPermissions,
Record<string, PermissionDeclaration>
> = EntityPermissions;
