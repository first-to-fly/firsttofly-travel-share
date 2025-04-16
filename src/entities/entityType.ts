export enum EntityType {
  USER = "user",
  USER_TENANT = "userTenant",

  PRODUCT = "product",

  GROUP_TOUR_PRODUCT = "groupTourProduct",
  GROUP_TOUR_ITINERARY = "groupTourItinerary",
  GROUP_TOUR_ITINERARY_DAY = "groupTourItineraryDay",
  GROUP_TOUR_ITINERARY_MEAL = "groupTourItineraryMeal",
  GROUP_TOUR_ITINERARY_EVENT = "groupTourItineraryEvent",
  GROUP_TOUR_COSTING = "groupTourCosting",
  GROUP_TOUR_COSTING_ENTRY = "groupTourCostingEntry",
  GROUP_TOUR_PRICING = "groupTourPricing",
  GROUP_TOUR_PNL_SIMULATION = "groupTourPNLSimulation",

  PRODUCT_TYPE = "productType",
  TOUR = "tour",

  TERM = "term",

  TENANT = "tenant",

  DOCUMENT = "document",

  // PRODUCT SETTINGS
  BADGE = "badge",
  BADGE_TRANSLATION = "badgeTranslation",
  COSTING_ITEM = "costingItem",
  COSTING_TEMPLATE = "costingTemplate",
  MEAL = "meal",
  ROOM_CONFIG = "roomConfiguration",
  ROOM_CONFIG_RULE = "roomConfigurationRule",
  ROOM_CONFIG_COVERAGE = "roomConfigurationCoverage",
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
  USEFUL_INFO = "usefulInfo",
  USEFUL_INFO_REF = "usefulInfoRef",
  USEFUL_INFO_PRODUCT_TYPE = "usefulInfoProductType",
  ASSEMBLE_LOCATION_AIRLINES = "assembleLocationAirlines",
  DISCOUNT = "discount",
  DISCOUNT_TEMPLATE = "discountTemplate",

  // GENERAL SETTINGS
  DESIGNATION = "designation",
  LOCATION = "location",
  DEPARTMENT = "department",
  PRIVACY_POLICY = "privacyPolicy",
  // REFERENCE CODE
  MENU = "menu",
  COUNTER = "COUNTER",
  COUNTER_COMPONENT = "COUNTER_COMPONENT",
  REFERENCE_CODE = "referenceCode",
  POI = "poi",

  // USER SETTINGS
  ROLE = "role",

}
export const EntityTypes = Object.values(EntityType);
