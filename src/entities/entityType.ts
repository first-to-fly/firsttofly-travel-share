export enum EntityType {
  USER = "user",
  USER_TENANT = "userTenant",

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
  SECTOR = "sector",
  SECTOR_GROUP = "sectorGroup",
  TAG = "tag",
  TAG_GROUP = "tagGroup",
  INSURANCE_DISCOUNT = "insuranceDiscount",
  SPECIAL_INSTRUCTION = "specialInstruction",
  TERM_CONDITION = "termCondition",
  STATION_CODE = "stationCode",
  USEFUL_INFO = "usefulInfo",
  ASSEMBLE_LOCATION_AIRLINES = "assembleLocationAirlines",
  DISCOUNT = "discount",
  DISCOUNT_TEMPLATE = "discountTemplate",
  DEPOSIT = "deposit",

  // GENERAL SETTINGS
  DESIGNATION = "designation",
  LOCATION = "location",
  DEPARTMENT = "department",
  PRIVACY_POLICY = "privacyPolicy",
  SUPPLIER_PROFILE = "supplierProfile",
  SUPPLIER_CONTRACT = "supplierContract",

  // REFERENCE CODE
  MENU = "menu",
  COUNTER = "COUNTER",
  COUNTER_COMPONENT = "COUNTER_COMPONENT",
  REFERENCE_CODE = "referenceCode",
  POI = "poi",

  // USER SETTINGS
  ROLE = "role",

  // TRANSPORT MANAGEMENT
  TRANSPORT_GROUP = "transportGroup",
  TRANSPORT_SEGMENT = "transportSegment",

  // OPERATIONS
  TOUR_DEPARTURE = "tourDeparture",
  APPROVAL_REQUEST = "approvalRequest",

  // BOOKING
  TOUR_TRANSACTION = "tourTransaction",
  TOUR_TRANSACTION_ROOM = "tourTransactionRoom",
  TOUR_TRANSACTION_PAX = "tourTransactionPax",
  TOUR_TRANSACTION_TRANSFER = "tourTransactionTransfer",
  TOUR_TRANSACTION_DISCOUNT = "tourTransactionDiscount",
  TOUR_TRANSACTION_ADDON = "tourTransactionAddon",

  // BUDGET
  BUDGET = "budget",
  BUDGET_ENTRY = "budgetEntry",
}
export const EntityTypes = Object.values(EntityType);
