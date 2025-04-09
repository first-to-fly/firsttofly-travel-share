import { AssembleLocationAirlinesPermissions } from "./entities/assemble-location-airlines.permission";
import { BadgePermissions } from "./entities/badge.permission";
import { CostingItemPermissions } from "./entities/costing-item.permission";
import { CostingTemplatePermissions } from "./entities/costing-template.permission";
import { DepartmentPermissions } from "./entities/department.permission";
import { DesignationPermissions } from "./entities/designation.permission";
import { DiscountPermissions, DiscountTemplatePermissions } from "./entities/discount.permission"; // Import new permissions
import { DocumentPermissions } from "./entities/document.permission";
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
import { TenantPermissions } from "./entities/tenant.permission";
import { TermPermissions } from "./entities/term.permission";
import { TermConditionPermissions } from "./entities/term-condition.permission";
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
  CostingItem: CostingItemPermissions,
  CostingTemplate: CostingTemplatePermissions,
  Designation: DesignationPermissions,
  InsuranceDiscount: InsuranceDiscountPermissions,
  Location: LocationPermissions,
  POI: POIPermissions,
  PrivacyPolicy: PrivacyPolicyPermissions,
  ReferenceCode: ReferenceCodePermissions,
  Role: RolePermissions,
  SpecialInstruction: SpecialInstructionPermissions,
  StationCode: StationCodePermissions,
  Tenant: TenantPermissions,
  TermCondition: TermConditionPermissions,
  Meal: MealPermissions,
  Sector: SectorPermissions,
  SectorGroup: SectorGroupPermissions,
  Term: TermPermissions,
  UsefulInfo: UsefulInfoPermissions,
  AssembleLocationAirlines: AssembleLocationAirlinesPermissions,
  RoomConfiguration: RoomConfigurationPermissions,
  Discount: DiscountPermissions, // Add Discount
  DiscountTemplate: DiscountTemplatePermissions, // Add DiscountTemplate
} as const;

export type PermissionsModules = keyof typeof EntityPermissions;
export type APermissions = (typeof EntityPermissions)[PermissionsModules];


export const AllPermissions: Record<
keyof typeof EntityPermissions,
Record<string, PermissionDeclaration>
> = EntityPermissions;
