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
  COSTING_ITEM_GROUP = "costingItemGroup",
  MEAL = "meal",
  ROOM_CONFIG = "roomConfig",
  ROOM_CONFIG_RULE = "roomConfigRule",
  ROOM_CONFIG_COVERAGE = "roomConfigCoverage",
  SECTOR = "sector",
  SECTOR_GROUP = "sectorGroup",
  TAG = "tag",
  TAG_GROUP = "tagGroup",
  INSURANCE_DISCOUNT = "insuranceDiscount",
  STATION_CODE = "stationCode",

  // GENERAL SETTINGS
  DESIGNATION = "designation",
  LOCATION = "location",
  DEPARTMENT = "department",
  PRIVACY_POLICY = "privacyPolicy",
  // REFERENCE CODE
  MENU = "menu",
  COUNTER = "COUNTER",
  COUNTER_COMPONENT = "COUNTER_COMPONENT",

  // USER SETTINGS
  ROLE = "role",

}
export const EntityTypes = Object.values(EntityType);
