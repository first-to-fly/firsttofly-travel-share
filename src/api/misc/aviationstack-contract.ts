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
    .default(100),
  offset: z.coerce.number().min(0).optional().default(0),
});

// Airport schemas
const AirportResponseZ = z.object({
  airportName: z.string(),
  iataCode: z.string(),
  icaoCode: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  geonameId: z.string().nullable(),
  timezone: z.string(),
  gmt: z.string(),
  phoneNumber: z.string().nullable(),
  countryName: z.string(),
  countryIso2: z.string(),
  cityIataCode: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Airline schemas
const AirlineResponseZ = z.object({
  airlineName: z.string(),
  iataCode: z.string(),
  icaoCode: z.string(),
  callsign: z.string().nullable(),
  type: z.string().nullable(),
  status: z.string().nullable(),
  fleetSize: z.string().nullable(),
  fleetAverageAge: z.string().nullable(),
  dateFounded: z.string().nullable(),
  hubCode: z.string().nullable(),
  countryName: z.string(),
  countryIso2: z.string(),
  iataPrefixAccounting: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Airplane schemas
const AirplaneResponseZ = z.object({
  registrationNumber: z.string(),
  productionLine: z.string().nullable(),
  iataType: z.string(),
  modelName: z.string().nullable(),
  modelCode: z.string().nullable(),
  icaoCodeHex: z.string().nullable(),
  iataCodeShort: z.string().nullable(),
  iataCodeLong: z.string().nullable(),
  constructionNumber: z.string().nullable(),
  testRegistrationNumber: z.string().nullable(),
  rolloutDate: z.string().nullable(),
  firstFlightDate: z.string().nullable(),
  deliveryDate: z.string().nullable(),
  registrationDate: z.string().nullable(),
  lineNumber: z.string().nullable(),
  planeSeries: z.string().nullable(),
  airlineIataCode: z.string().nullable(),
  airlineIcaoCode: z.string().nullable(),
  planeOwner: z.string().nullable(),
  enginesCount: z.string().nullable(),
  enginesType: z.string().nullable(),
  planeAge: z.string().nullable(),
  planeStatus: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Flight schemas
const GetFlightsQueryZ = PaginationQueryZ.extend({
  flightStatus: z.nativeEnum(FlightStatus).optional(),
  flightDate: z.string().optional(),
  depIata: z.string().optional(),
  arrIata: z.string().optional(),
  depIcao: z.string().optional(),
  arrIcao: z.string().optional(),
  airlineName: z.string().optional(),
  airlineIata: z.string().optional(),
  airlineIcao: z.string().optional(),
  flightNumber: z.string().optional(),
  flightIata: z.string().optional(),
  flightIcao: z.string().optional(),
  minDelayDep: z.coerce.number().optional(),
  minDelayArr: z.coerce.number().optional(),
  maxDelayDep: z.coerce.number().optional(),
  maxDelayArr: z.coerce.number().optional(),
  arrScheduledTimeArr: z.string().optional(),
  arrScheduledTimeDep: z.string().optional(),
});


const GetFlightsResponseZ = z.object({
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
  data: z.array(FlightInfoZ),
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
});

// Export types
export type GetFlightsQuery = z.infer<typeof GetFlightsQueryZ>;
