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

  // INDEPENDENT TOUR PRODUCTS
  INDEPENDENT_TOUR_PRODUCT = "independentTourProduct",
  INDEPENDENT_TOUR_ACCOMMODATION = "independentTourAccommodation",
  INDEPENDENT_TOUR_MISCELLANEOUS = "independentTourMiscellaneous",
  INDEPENDENT_TOUR_OPTIONAL_SERVICE = "independentTourOptionalService",
  INDEPENDENT_TOUR_ITINERARY = "independentTourItinerary",
  INDEPENDENT_TOUR_ITINERARY_DAY = "independentTourItineraryDay",
  INDEPENDENT_TOUR_ITINERARY_EVENT = "independentTourItineraryEvent",
  INDEPENDENT_TOUR_ITINERARY_MEAL = "independentTourItineraryMeal",

  PRODUCT_TYPE = "productType",

  TERM = "term",

  TENANT = "tenant",

  DOCUMENT = "document",
  MEDIA = "media",

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
  TENANT_CONFIG = "tenantConfig",
  EMAIL_TEMPLATE = "emailTemplate",

  // SUPPLIER MANAGEMENT
  SUPPLIER = "supplier",
  SUPPLIER_ADDRESS = "supplierAddress",
  SUPPLIER_PAYMENT = "supplierPayment",
  SUPPLIER_PERSON = "supplierPerson",

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
  TRANSPORT_PLAN = "transportPlan",

  // OPERATIONS
  TOUR_DEPARTURE = "tourDeparture",
  TOUR_DEPARTURE_ACCOMMODATION = "tourDepartureAccommodation",
  EXCHANGE_ORDER = "exchangeOrder",
  EXCHANGE_ORDER_ITEM = "exchangeOrderItem",
  REPORT = "report",
  SCHEDULED_REPORT = "scheduledReport",

  // APPROVAL MANAGEMENT
  APPROVAL = "approval",
  APPROVAL_REQUEST = "approvalRequest",

  // GROUP TOUR BOOKING
  GROUP_TOUR_BOOKING = "groupTourBooking",
  GROUP_TOUR_BOOKING_ROOM = "groupTourBookingRoom",
  GROUP_TOUR_BOOKING_PAX = "groupTourBookingPax",
  GROUP_TOUR_BOOKING_DISCOUNT = "groupTourBookingDiscount",
  GROUP_TOUR_BOOKING_ADDON = "groupTourBookingAddon",

  // CUSTOMER BOOKING LINK
  CUSTOMER_BOOKING_LINK = "customerBookingLink",

  // INDEPENDENT TOUR BOOKING
  INDEPENDENT_TOUR_BOOKING = "independentTourBooking",
  INDEPENDENT_TOUR_BOOKING_ROOM = "independentTourBookingRoom",
  INDEPENDENT_TOUR_BOOKING_PAX = "independentTourBookingPax",
  INDEPENDENT_TOUR_BOOKING_ADDON = "independentTourBookingAddon",
  INDEPENDENT_TOUR_BOOKING_DISCOUNT = "independentTourBookingDiscount",

  // PAYMENT AND TRANSACTION
  PAYMENT_ORDER = "paymentOrder",
  TRANSACTION = "transaction",

  // BUDGET
  BUDGET = "budget",
  BUDGET_ENTRY = "budgetEntry",

  // FINANCE
  BILL = "bill",
  MATCH_DOC = "matchDoc",
  ACCOUNT_CODE = "accountCode",
  PAYMENT_WAY = "paymentWay",
  JOURNAL = "journal",

  // USER MESSAGES
  USER_MESSAGE = "userMessage",

  // WAREHOUSE MANAGEMENT
  WAREHOUSE = "warehouse",
}
export const EntityTypes = Object.values(EntityType);
