export enum EntityType {
  USER = "user",
  USER_TENANT = "userTenant",

  PRODUCT = "product",
  PRODUCT_TYPE = "productType",

  TERM = "term",

  TENANT = "tenant",

  DOCUMENT = "document",

  // PRODUCT SETTINGS
  BADGE = "badge",
  BADGE_TRANSLATION = "badgeTranslation",
  COSTING_ITEM = "costingItem",
  COSTING_TEMPLATE = "costingTemplate",
  MEAL = "meal",
  ROOM_CONFIG = "roomConfig",
  ROOM_CONFIG_RULE = "roomConfigRule",
  ROOM_CONFIG_COVERAGE = "roomConfigCoverage",
  SECTOR = "sector",
  SECTOR_GROUP = "sectorGroup",
  TAG = "tag",
  TAG_GROUP = "tagGroup",
  INSURANCE_DISCOUNT = "insuranceDiscount",
  SPECIAL_INSTRUCTION = "specialInstruction",
  TERM_CONDITION = "termCondition",
  TERM_CONDITION_COVERAGE = "termConditionCoverage",
  TERM_CONDITION_PRODUCT_TYPES = "termConditionProductTypes",
  STATION_CODE = "stationCode",
  ASSEMBLE_LOCATION_AIRLINES = "assembleLocationAirlines",

  // GENERAL SETTINGS
  DESIGNATION = "designation",
  LOCATION = "location",
  DEPARTMENT = "department",
  PRIVACY_POLICY = "privacyPolicy",
  // REFERENCE CODE
  MENU = "menu",
  COUNTER = "COUNTER",
  COUNTER_COMPONENT = "COUNTER_COMPONENT",
  REFERENCE_CODE_TREE = "referenceCodeTree",
  REFERENCE_CODE_TEMPLATE = "referenceCodeTemplate",
  REFERENCE_CODE_COMPONENT = "referenceCodeComponent",
  POI = "poi",

  // USER SETTINGS
  ROLE = "role",

}
export const EntityTypes = Object.values(EntityType);
