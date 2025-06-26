import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { FlightInfoZ } from "../../entities/Operations/TransportSegment";


export enum FlightStatus {
  SCHEDULED = "scheduled",
  ACTIVE = "active",
  LANDED = "landed",
  CANCELLED = "cancelled",
  INCIDENT = "incident",
  DIVERTED = "diverted",
}


const basePath = "/api/misc/aviationstack";

// Base pagination schema
const PaginationQueryZ = z.object({
  limit: z.coerce.number().min(1).max(1000).optional()
    .default(100)
    .describe("Specify a limit of results to return in your API response. Maximum allowed value is 100 below Professional Plan and 1000 on and above Professional Plan. Default value is 100"),
  offset: z.coerce.number().min(0).optional().default(0)
    .describe("Specify an offset for pagination. Example: Specifying an offset of 10 in combination with a limit of 10 will show results 10-20. Default offset value is 0, starting with the first available result"),
});

// Airport schemas
const AirportResponseZ = z.object({
  airportName: z.string().describe("The full name of the airport. Example: San Francisco International, John F. Kennedy International"),
  iataCode: z.string().describe("The IATA code associated with the airport. Example: SFO, JFK, LAX"),
  icaoCode: z.string().describe("The ICAO code associated with the airport. Example: KSFO, KJFK, KLAX"),
  latitude: z.string().describe("The latitude coordinate associated with the airport location. Example: 37.621311, 40.641766"),
  longitude: z.string().describe("The longitude coordinate associated with the airport location. Example: -122.378968, -73.780968"),
  geonameId: z.string().nullable().describe("The GeoNames ID of the airport for geographical identification"),
  timezone: z.string().describe("The timezone the airport is in. Example: America/Los_Angeles, America/New_York"),
  gmt: z.string().describe("The GMT offset in hours. Example: -8, -5, +1"),
  phoneNumber: z.string().nullable().describe("The phone number of the airport for contact information"),
  countryName: z.string().describe("The name of the country the airport is in. Example: United States, France, Germany"),
  countryIso2: z.string().describe("The ISO code of the country the airport is in. Example: US, FR, DE"),
  cityIataCode: z.string().describe("The IATA code of the city the airport is in. Example: SFO, NYC, LAX"),
  createdAt: z.date().describe("The timestamp when this airport record was created in the database"),
  updatedAt: z.date().describe("The timestamp when this airport record was last updated in the database"),
});

// Airline schemas
const AirlineResponseZ = z.object({
  airlineName: z.string().describe("The full name of the airline. Example: American Airlines, Delta Air Lines, Air France"),
  iataCode: z.string().describe("The IATA code of the airline. Example: AA, DL, AF"),
  icaoCode: z.string().describe("The ICAO code of the airline. Example: AAL, DAL, AFR"),
  callsign: z.string().nullable().describe("The ICAO callsign of the airline. Example: AMERICAN, DELTA, AIRFRANS"),
  type: z.string().nullable().describe("The type of airline operation. Example: scheduled, charter, cargo"),
  status: z.string().nullable().describe("The current operational status of the airline. Example: active, inactive, suspended"),
  fleetSize: z.string().nullable().describe("The total number of aircraft in the airline's fleet. Example: 963, 325, 220"),
  fleetAverageAge: z.string().nullable().describe("The average age of aircraft in the fleet in years. Example: 10.9, 8.5, 12.3"),
  dateFounded: z.string().nullable().describe("The founding year of the airline. Example: 1934, 1929, 1933"),
  hubCode: z.string().nullable().describe("The main hub airport code associated with the airline. Example: DFW, ATL, CDG"),
  countryName: z.string().describe("The name of the origin country of the airline. Example: United States, France, Germany"),
  countryIso2: z.string().describe("The 2-letter ISO code of the origin country of the airline. Example: US, FR, DE"),
  iataPrefixAccounting: z.string().nullable().describe("The IATA prefix or accounting code of the airline. Example: 1, 006, 057"),
  createdAt: z.date().describe("The timestamp when this airline record was created in the database"),
  updatedAt: z.date().describe("The timestamp when this airline record was last updated in the database"),
});

// Airplane schemas
const AirplaneResponseZ = z.object({
  registrationNumber: z.string().describe("The registration number of the airplane. Example: N160AN, G-EUUU, F-HPJA"),
  productionLine: z.string().nullable().describe("The production line identifier of the airplane. Example: Boeing 737 Classic, Airbus A320 Family"),
  iataType: z.string().describe("The IATA type code of the airplane. Example: B737-300, A320, B777-200"),
  modelName: z.string().nullable().describe("The model name of the airplane. Example: 737, A320, 777"),
  modelCode: z.string().nullable().describe("The specific model code of the airplane. Example: B737-377, A320-214, B777-223"),
  icaoCodeHex: z.string().nullable().describe("The HEX ICAO code of the airplane for tracking purposes. Example: 4A0823, 400CB6"),
  iataCodeShort: z.string().nullable().describe("The short IATA code of the airplane. Example: 733, 320, 772"),
  iataCodeLong: z.string().nullable().describe("The long IATA code of the airplane. Example: B733, A320, B772"),
  constructionNumber: z.string().nullable().describe("The construction number assigned during manufacturing. Example: 23653, 691, 26956"),
  testRegistrationNumber: z.string().nullable().describe("The test registration number used during aircraft testing phase"),
  rolloutDate: z.string().nullable().describe("The rollout date when the airplane was first moved out of the factory. Format: YYYY-MM-DD"),
  firstFlightDate: z.string().nullable().describe("The first flight date of the airplane. Format: YYYY-MM-DD"),
  deliveryDate: z.string().nullable().describe("The initial delivery date to the first operator. Format: YYYY-MM-DD"),
  registrationDate: z.string().nullable().describe("The initial registration date with aviation authorities. Format: YYYY-MM-DD"),
  lineNumber: z.string().nullable().describe("The production line number assigned during manufacturing. Example: 1260, 691, 456"),
  planeSeries: z.string().nullable().describe("The airplane series designation. Example: 377, 214, 223"),
  airlineIataCode: z.string().nullable().describe("The IATA code of the current operating airline. Example: AA, DL, AF"),
  airlineIcaoCode: z.string().nullable().describe("The ICAO code of the current operating airline. Example: AAL, DAL, AFR"),
  planeOwner: z.string().nullable().describe("The name of the current owner or leasing company. Example: American Airlines, GECAS, AerCap"),
  enginesCount: z.string().nullable().describe("The number of engines on the airplane. Example: 2, 4"),
  enginesType: z.string().nullable().describe("The type of engines used. Example: JET, TURBOPROP"),
  planeAge: z.string().nullable().describe("The age of the airplane in years since first flight. Example: 31, 15, 8"),
  planeStatus: z.string().nullable().describe("The current operational status of the airplane. Example: active, stored, scrapped"),
  createdAt: z.date().describe("The timestamp when this airplane record was created in the database"),
  updatedAt: z.date().describe("The timestamp when this airplane record was last updated in the database"),
});

// Flight schemas
const GetFlightsQueryZ = PaginationQueryZ.extend({
  flightStatus: z.nativeEnum(FlightStatus).optional().describe("Filter your results by flight status. Available values: scheduled, active, landed, cancelled, incident, diverted"),
  flightDate: z.string().optional().describe("Filter your results by providing a flight date in the format YYYY-MM-DD. Example: 2019-02-28"),
  depIata: z.string().optional().describe("Filter your results by departure city or airport using an IATA code. Example: JFK, LAX, SFO"),
  arrIata: z.string().optional().describe("Filter your results by arrival city or airport using an IATA code. Example: JFK, LAX, SFO"),
  depIcao: z.string().optional().describe("Filter your results by departure airport using an ICAO code. Example: KJFK, KLAX, KSFO"),
  arrIcao: z.string().optional().describe("Filter your results by arrival airport using an ICAO code. Example: KJFK, KLAX, KSFO"),
  airlineName: z.string().optional().describe("Filter your results by airline name. Example: American Airlines, Delta Air Lines"),
  airlineIata: z.string().optional().describe("Filter your results by airline IATA code. Example: AA, DL, AF"),
  airlineIcao: z.string().optional().describe("Filter your results by airline ICAO code. Example: AAL, DAL, AFR"),
  flightNumber: z.string().optional().describe("Filter your results by providing a flight number. Example: 2557, 1004"),
  flightIata: z.string().optional().describe("Filter your results by providing a flight IATA code. Example: MU2557, AA1004"),
  flightIcao: z.string().optional().describe("Filter your results by providing a flight ICAO code. Example: CES2557, AAL1004"),
  minDelayDep: z.coerce.number().optional().describe("Filter your results by providing a minimum amount of minutes in departure delay. Example: 7 for seven minutes of delay in departure"),
  minDelayArr: z.coerce.number().optional().describe("Filter your results by providing a minimum amount of minutes in arrival delay. Example: 7 for seven minutes of delay in arrival"),
  maxDelayDep: z.coerce.number().optional().describe("Filter your results by providing a maximum amount of minutes in departure delay. Example: 60 for one hour of delay in departure"),
  maxDelayArr: z.coerce.number().optional().describe("Filter your results by providing a maximum amount of minutes in arrival delay. Example: 60 for one hour of delay in arrival"),
  arrScheduledTimeArr: z.string().optional().describe("Filter your results by providing an arrival date in the format YYYY-MM-DD. Example: 2019-02-28"),
  arrScheduledTimeDep: z.string().optional().describe("Filter your results by providing a departure date in the format YYYY-MM-DD. Example: 2019-02-28"),
});


const GetFlightsResponseZ = z.object({
  total: z.number().describe("The total number of flight results found for your API request"),
  limit: z.number().describe("The specified or default limit of results per pagination page"),
  offset: z.number().describe("The specified or default pagination offset"),
  data: z.array(FlightInfoZ).describe("An array of flight information objects containing detailed flight data including departure, arrival, airline, aircraft, and live tracking information"),
});

// Flight Schedules schemas
const GetFlightSchedulesQueryZ = PaginationQueryZ.extend({
  iataCode: z.string().describe("The IATA code of the airport you'd like to request data from. Example: JFK, DXB"),
  type: z.enum(["departure", "arrival"]).describe("Airport schedule type. Available values: departure or arrival"),
  status: z.enum(["landed", "scheduled", "cancelled", "active", "incident", "diverted", "redirected", "unknown"]).optional().describe("The status of the flight. Available values: landed, scheduled, cancelled, active, incident, diverted, redirected, unknown"),
  depTerminal: z.string().optional().describe("The terminal at the departure airport. Example: 1, 2, 3, 4, 5 etc"),
  depDelay: z.coerce.number().optional().describe("The delay in minutes at departure. Example: 10, 20, 45, etc. It is not possible to set a delay range"),
  depSchTime: z.string().optional().describe("The scheduled flight's departure in the format YYYY-MM-DDTHH:mm:ss.sss. Example: 2023-06-07T05:00:00.000"),
  depEstTime: z.string().optional().describe("The estimated departure time in the format YYYY-MM-DDTHH:mm:ss.sss. Example: 2023-06-07T05:00:00.000"),
  depActTime: z.string().optional().describe("The actual flight departure time in the format YYYY-MM-DDTHH:mm:ss.sss. Example: 2023-06-07T05:00:00.000"),
  depEstRunway: z.string().optional().describe("The estimated departure time at runway in the format YYYY-MM-DDTHH:mm:ss.sss. Example: 2023-06-07T05:00:00.000"),
  depActRunway: z.string().optional().describe("The actual departure time at runway in the format YYYY-MM-DDTHH:mm:ss.sss. Example: 2023-06-07T05:00:00.000"),
  arrTerminal: z.string().optional().describe("The terminal at the arrival airport. Example: 1, 2, 3, 4, etc"),
  arrDelay: z.coerce.number().optional().describe("The delay in minutes at arrival. Example: 10, 20, 45, etc. It is not possible to set a delay range"),
  arrSchTime: z.string().optional().describe("The scheduled flight's arrival in the format YYYY-MM-DDTHH:mm:ss.sss. Example: 2023-06-07T05:00:00.000"),
  arrEstTime: z.string().optional().describe("The estimated arrival time in the format YYYY-MM-DDTHH:mm:ss.sss. Example: 2023-06-07T05:00:00.000"),
  arrActTime: z.string().optional().describe("The actual flight arrival time in the format YYYY-MM-DDTHH:mm:ss.sss. Example: 2023-06-07T05:00:00.000"),
  arrEstRunway: z.string().optional().describe("The estimated arrival time at runway in the format YYYY-MM-DDTHH:mm:ss.sss. Example: 2023-06-07T05:00:00.000"),
  arrActRunway: z.string().optional().describe("The actual arrival time at runway in the format YYYY-MM-DDTHH:mm:ss.sss. Example: 2023-06-07T05:00:00.000"),
  airlineName: z.string().optional().describe("The name of the airline. Example: Air France, American Airlines, Delta Air Lines, etc"),
  airlineIata: z.string().optional().describe("IATA code of an airline. Example: AA, DL, AF"),
  airlineIcao: z.string().optional().describe("ICAO code of an airline. Example: AAL, DAL, AFR"),
  flightNum: z.string().optional().describe("The flight number based on 1 to 4 digits. Example: 171, 1004"),
  flightIata: z.string().optional().describe("The flight IATA number consisting of digits and letters, usually of the airline IATA code. Example: AA171, DL1004"),
  flightIcao: z.string().optional().describe("The flight ICAO number consisting of digits and letters, usually the airline ICAO code. Example: AAL171, DAL1004"),
  lang: z.string().optional().describe("Translations are available of the airport names, city names and country names to 43 different languages"),
});

const FlightScheduleLocationZ = z.object({
  actualRunway: z.string().nullable().describe("The actual runway time of departure/arrival"),
  actualTime: z.string().nullable().describe("The actual departure/arrival time"),
  baggage: z.string().nullable().describe("The baggage claim information"),
  delay: z.string().nullable().describe("The departure/arrival delay in minutes"),
  estimatedRunway: z.string().nullable().describe("The estimated runway time of departure/arrival"),
  estimatedTime: z.string().nullable().describe("The estimated departure/arrival time"),
  gate: z.string().nullable().describe("The departure/arrival gate"),
  iataCode: z.string().describe("The IATA code of the departure/arrival airport. Example: JFK, LAX"),
  icaoCode: z.string().describe("The ICAO code of the departure/arrival airport. Example: KJFK, KLAX"),
  scheduledTime: z.string().describe("The scheduled departure/arrival time"),
  terminal: z.string().nullable().describe("The departure/arrival terminal"),
});

const FlightScheduleAirlineZ = z.object({
  iataCode: z.string().describe("The IATA code of the airline. Example: AA, DL"),
  icaoCode: z.string().describe("The ICAO code of the airline. Example: AAL, DAL"),
  name: z.string().describe("The full name of the airline. Example: American Airlines, Delta Air Lines"),
});

const FlightScheduleFlightZ = z.object({
  iataNumber: z.string().describe("The IATA flight number assigned by the airline. Example: AA171, DL1004"),
  icaoNumber: z.string().describe("The ICAO flight number assigned by the airline. Example: AAL171, DAL1004"),
  number: z.string().describe("The flight number without the airline code. Example: 171, 1004"),
});

const FlightScheduleCodesharedZ = z.object({
  airline: FlightScheduleAirlineZ.describe("The airline operating the codeshare flight"),
  flight: FlightScheduleFlightZ.describe("The flight details assigned by the codeshare airline"),
});

const FlightScheduleZ = z.object({
  airline: FlightScheduleAirlineZ.describe("The airline information for this flight"),
  arrival: FlightScheduleLocationZ.describe("The arrival information including airport, times, gate, and terminal"),
  codeshared: FlightScheduleCodesharedZ.nullable().describe("Codeshare flight information, or null if no codeshare exists"),
  departure: FlightScheduleLocationZ.describe("The departure information including airport, times, gate, and terminal"),
  flight: FlightScheduleFlightZ.describe("The flight information including numbers and codes"),
  status: z.string().describe("The current status of the flight. Possible values: scheduled, active, landed, cancelled, incident, diverted"),
  type: z.enum(["departure", "arrival"]).describe("The type of flight schedule (departure or arrival)"),
});

const GetFlightSchedulesResponseZ = z.object({
  pagination: z.object({
    limit: z.number().describe("The specified limit of results per pagination page"),
    offset: z.number().describe("The specified pagination offset"),
    count: z.number().describe("The number of results found on the current pagination page"),
    total: z.number().describe("The total number of results found for your API request"),
  }).describe("Pagination information for the response"),
  data: z.array(FlightScheduleZ).describe("An array of flight schedule results"),
});

// Flight Future Schedules schemas
const GetFlightFutureSchedulesQueryZ = PaginationQueryZ.extend({
  iataCode: z.string().describe("The IATA code of the airport you'd like to request data from. Example: JFK, DXB"),
  type: z.enum(["departure", "arrival"]).describe("Airport schedule type. Available values: departure or arrival"),
  date: z.string().describe("Filter your results by providing a flight date in the format YYYY-MM-DD. Example: 2024-11-02"),
  airlineIata: z.string().optional().describe("Filter your results by airline IATA code. Example: AA, DL, AF"),
  airlineIcao: z.string().optional().describe("Filter your results by airline ICAO code. Example: AAL, DAL, AFR"),
  flightNumber: z.string().optional().describe("Filter your results by providing a flight number. Example: AF1135, AA171"),
});

const FlightFutureScheduleLocationZ = z.object({
  iataCode: z.string().describe("The IATA code of the departure/arrival location/airport. Example: JFK, LAX"),
  icaoCode: z.string().describe("The ICAO code of the departure/arrival location/airport. Example: KJFK, KLAX"),
  terminal: z.string().nullable().describe("The departure/arrival terminal"),
  gate: z.string().nullable().describe("The departure/arrival gate"),
  scheduledTime: z.string().describe("The scheduled departure/arrival time. Example: 06:15, 08:05"),
});

const FlightFutureScheduleAircraftZ = z.object({
  modelCode: z.string().describe("The model code of the aircraft. Example: b738, a320"),
  modelText: z.string().describe("The full model name of the aircraft. Example: Boeing 737-800, Airbus A320-200"),
});

const FlightFutureScheduleZ = z.object({
  weekday: z.string().describe("The weekday number. Example: 1 (Monday), 7 (Sunday)"),
  departure: FlightFutureScheduleLocationZ.describe("The departure information including airport, terminal, gate, and scheduled time"),
  arrival: FlightFutureScheduleLocationZ.describe("The arrival information including airport, terminal, gate, and scheduled time"),
  aircraft: FlightFutureScheduleAircraftZ.describe("The aircraft information including model code and description"),
  airline: FlightScheduleAirlineZ.describe("The airline information for this flight"),
  flight: FlightScheduleFlightZ.describe("The flight information including numbers and codes"),
  codeshared: FlightScheduleCodesharedZ.nullable().describe("Codeshare flight information, or null if no codeshare exists"),
});

const GetFlightFutureSchedulesResponseZ = z.object({
  pagination: z.object({
    limit: z.number().describe("The specified or default limit of results per pagination page"),
    offset: z.number().describe("The specified or default pagination offset"),
    count: z.number().describe("The number of results found on the current pagination page"),
    total: z.number().describe("The total number of results found for your API request"),
  }).describe("Pagination information for the response"),
  data: z.array(FlightFutureScheduleZ).describe("An array of future flight schedule results"),
});

// Export the contract
export const aviationStackContract = initContract().router({
  getAirports: {
    summary: "Get all airports from database",
    method: "GET",
    path: `${basePath}/airports`,
    responses: {
      200: z.array(AirportResponseZ),
    },
  },

  getAirportById: {
    summary: "Get airport by IATA code",
    method: "GET",
    path: `${basePath}/airports/:iataCode`,
    responses: {
      200: AirportResponseZ,
      404: z.object({ message: z.string() }),
    },
  },

  getAirlines: {
    summary: "Get all airlines from database",
    method: "GET",
    path: `${basePath}/airlines`,
    responses: {
      200: z.array(AirlineResponseZ),
    },
  },

  getAirlineById: {
    summary: "Get airline by IATA code",
    method: "GET",
    path: `${basePath}/airlines/:iataCode`,
    responses: {
      200: AirlineResponseZ,
      404: z.object({ message: z.string() }),
    },
  },

  getAirplanes: {
    summary: "Get all airplanes from database",
    method: "GET",
    path: `${basePath}/airplanes`,
    responses: {
      200: z.array(AirplaneResponseZ),
    },
  },

  getAirplaneById: {
    summary: "Get airplane by IATA type",
    method: "GET",
    path: `${basePath}/airplanes/:iataType`,
    responses: {
      200: AirplaneResponseZ,
      404: z.object({ message: z.string() }),
    },
  },

  getFlights: {
    summary: "Get flights from AviationStack API",
    method: "GET",
    path: `${basePath}/flights`,
    query: GetFlightsQueryZ,
    responses: {
      200: GetFlightsResponseZ,
    },
  },

  getFlightSchedules: {
    summary: "Get current day flight schedules (timetable) for a specific airport",
    method: "GET",
    path: `${basePath}/flight-schedules`,
    query: GetFlightSchedulesQueryZ,
    responses: {
      200: GetFlightSchedulesResponseZ,
    },
  },

  getFlightFutureSchedules: {
    summary: "Get future flight schedules for a specific airport and date",
    method: "GET",
    path: `${basePath}/flight-future-schedules`,
    query: GetFlightFutureSchedulesQueryZ,
    responses: {
      200: GetFlightFutureSchedulesResponseZ,
    },
  },
});

// Export types
export type GetFlightsQuery = z.infer<typeof GetFlightsQueryZ>;
export type GetFlightSchedulesQuery = z.infer<typeof GetFlightSchedulesQueryZ>;
export type GetFlightFutureSchedulesQuery = z.infer<typeof GetFlightFutureSchedulesQueryZ>;
export type FlightSchedule = z.infer<typeof FlightScheduleZ>;
export type GetFlightSchedulesResponse = z.infer<typeof GetFlightSchedulesResponseZ>;
export type FlightFutureSchedule = z.infer<typeof FlightFutureScheduleZ>;
export type GetFlightFutureSchedulesResponse = z.infer<typeof GetFlightFutureSchedulesResponseZ>;
