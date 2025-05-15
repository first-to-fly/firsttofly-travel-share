import { AssembleLocationAirlinesPermissions } from "./entities/assemble-location-airlines.permission";
import { BadgePermissions } from "./entities/badge.permission";
import { CostingItemPermissions } from "./entities/costing-item.permission";
import { CostingTemplatePermissions } from "./entities/costing-template.permission";
import { DepartmentPermissions } from "./entities/department.permission";
import { DesignationPermissions } from "./entities/designation.permission";
import { DiscountPermissions, DiscountTemplatePermissions } from "./entities/discount.permission"; // Import new permissions
import { DocumentPermissions } from "./entities/document.permission";
import { GroupTourCostingPermissions } from "./entities/group-tour-costing.permission";
import { GroupTourItineraryPermissions } from "./entities/group-tour-itinerary.permission";
import { GroupTourPricingPermissions } from "./entities/group-tour-pricing.permission";
import { GroupTourProductPermissions } from "./entities/group-tour-product.permission";
import { InsuranceDiscountPermissions } from "./entities/insurance-discount.permission";
import { LocationPermissions } from "./entities/location.permission";
import { MealPermissions } from "./entities/meal.permission";
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
import { SupplierContractPermissions } from "./entities/supplier-contract.permission";
import { SupplierProfilePermissions } from "./entities/supplier-profile.permission";
import { TenantPermissions } from "./entities/tenant.permission";
import { TermPermissions } from "./entities/term.permission";
import { TermConditionPermissions } from "./entities/term-condition.permission";
import { TourDeparturePermissions } from "./entities/tour-departure.permission";
import { TourTransactionPermissions } from "./entities/tour-transaction.permission";
import { TourTransactionPaxPermissions } from "./entities/tour-transaction-pax.permission";
import { TourTransactionRoomPermissions } from "./entities/tour-transaction-room.permission";
import { TourTransactionTransferPermissions } from "./entities/tour-transaction-transfer.permission";
import { TransportGroupPermissions } from "./entities/transport-group.permission";
import { TransportSegmentPermissions } from "./entities/transport-segment.permission";
import { UsefulInfoPermissions } from "./entities/useful-info.permission";
import { UserPermissions } from "./entities/user.permission";
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
  Document: DocumentPermissions,
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
  TourTransaction: TourTransactionPermissions,
  TourTransactionRoom: TourTransactionRoomPermissions,
  TourTransactionPax: TourTransactionPaxPermissions,
  TourTransactionTransfer: TourTransactionTransferPermissions,
  "Discount Template": DiscountTemplatePermissions,
  "Group Tour Costing": GroupTourCostingPermissions,
  "Group Tour Product": GroupTourProductPermissions,
  "Group Tour Pricing": GroupTourPricingPermissions,
  "Group Tour Itinerary": GroupTourItineraryPermissions,
  "Tour Departure": TourDeparturePermissions,
  "Transport Group": TransportGroupPermissions,
  "Transport Segment": TransportSegmentPermissions,
  "Supplier Profile": SupplierProfilePermissions,
  "Supplier Contract": SupplierContractPermissions,
} as const;

export type PermissionsModules = keyof typeof EntityPermissions;
export type APermissions = (typeof EntityPermissions)[PermissionsModules];


export const AllPermissions: Record<
keyof typeof EntityPermissions,
Record<string, PermissionDeclaration>
> = EntityPermissions;
