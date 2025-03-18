export enum EntityType {
  USER = "user",
  GROUP = "group",
  PRODUCT = "product",

  TENANT = "tenant",

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

  LOCATION = "location",
  DEPARTMENT = "department",
  PRIVACY_POLICY = "privacyPolicy",
}
export const EntityTypes = Object.values(EntityType);
