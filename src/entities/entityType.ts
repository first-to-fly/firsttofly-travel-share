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

  // GENERAL SETTINGS
  DESIGNATION = "designation",
  LOCATION = "location",
  DEPARTMENT = "department",
  PRIVACY_POLICY = "privacyPolicy",

  // USER SETTINGS
  ROLE = "role",
}
export const EntityTypes = Object.values(EntityType);
