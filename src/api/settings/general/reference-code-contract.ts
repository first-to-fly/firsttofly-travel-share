import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { CounterComponentZ, CounterZ } from "../../../entities/Settings/General/ReferenceCode";


const baseCounterPath = "/api/settings/counters";
const baseComponentPath = "/api/settings/counter-components";

// Counter contracts
const UpdateCounterZ = CounterZ.pick({
  moduleId: true,
  name: true,
  counterType: true,
  resetCounterType: true,
  counterWidth: true,
  template: true,
  remarks: true,
});

const CreateCounterZ = UpdateCounterZ.extend({
  tenantOID: z.string(),
});

export type UpdateCounter = z.infer<typeof UpdateCounterZ>;
export type CreateCounter = z.infer<typeof CreateCounterZ>;

// Counter Component contracts
const UpdateCounterComponentZ = CounterComponentZ.pick({
  name: true,
  code: true,
  type: true,
  seq: true,
  description: true,
});

const CreateCounterComponentZ = UpdateCounterComponentZ.extend({
  tenantOID: z.string(),
});

export type UpdateCounterComponent = z.infer<typeof UpdateCounterComponentZ>;
export type CreateCounterComponent = z.infer<typeof CreateCounterComponentZ>;

// Counter Component Mapping contract
const CounterComponentMappingZ = z.object({
  counterId: z.string(),
  componentId: z.string(),
});

export const referenceCodeContract = initContract().router({
  // Counter endpoints
  getCounters: {
    summary: "Get counters",
    method: "GET",
    path: baseCounterPath,
    query: z.object({
      tenantOID: z.string(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createCounter: {
    summary: "Create a new counter",
    method: "POST",
    path: baseCounterPath,
    body: CreateCounterZ,
    responses: {
      200: z.string(),
    },
  },

  updateCounter: {
    summary: "Update an existing counter",
    method: "PATCH",
    path: `${baseCounterPath}/:counterOID`,
    body: UpdateCounterZ,
    responses: {
      200: z.string(),
    },
  },

  deleteCounter: {
    summary: "Delete a counter",
    method: "DELETE",
    path: `${baseCounterPath}/:counterOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  updateCounters: {
    summary: "Update multiple existing counters",
    method: "POST",
    path: `${baseCounterPath}/batch-update`,
    body: z.record(
      z.string().describe("OID of counter to update"),
      UpdateCounterZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated counters")),
    },
  },

  deleteCounters: {
    summary: "Delete multiple counters",
    method: "POST",
    path: `${baseCounterPath}/batch-delete`,
    body: z.object({
      counterOIDs: z.array(z.string().describe("OIDs of counters to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },

  // Counter Component endpoints
  getCounterComponents: {
    summary: "Get counter components",
    method: "GET",
    path: baseComponentPath,
    query: z.object({
      tenantOID: z.string(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createCounterComponent: {
    summary: "Create a new counter component",
    method: "POST",
    path: baseComponentPath,
    body: CreateCounterComponentZ,
    responses: {
      200: z.string(),
    },
  },

  updateCounterComponent: {
    summary: "Update an existing counter component",
    method: "PATCH",
    path: `${baseComponentPath}/:componentOID`,
    body: UpdateCounterComponentZ,
    responses: {
      200: z.string(),
    },
  },

  deleteCounterComponent: {
    summary: "Delete a counter component",
    method: "DELETE",
    path: `${baseComponentPath}/:componentOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  updateCounterComponents: {
    summary: "Update multiple existing counter components",
    method: "POST",
    path: `${baseComponentPath}/batch-update`,
    body: z.record(
      z.string().describe("OID of counter component to update"),
      UpdateCounterComponentZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated counter components")),
    },
  },

  deleteCounterComponents: {
    summary: "Delete multiple counter components",
    method: "POST",
    path: `${baseComponentPath}/batch-delete`,
    body: z.object({
      componentOIDs: z.array(z.string().describe("OIDs of counter components to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },

  // Counter Component Mapping endpoints
  mapCounterComponent: {
    summary: "Map a component to a counter",
    method: "POST",
    path: `${baseCounterPath}/component-mapping`,
    body: CounterComponentMappingZ,
    responses: {
      200: z.boolean(),
    },
  },

  unmapCounterComponent: {
    summary: "Remove a component mapping from a counter",
    method: "DELETE",
    path: `${baseCounterPath}/component-mapping`,
    body: CounterComponentMappingZ,
    responses: {
      200: z.boolean(),
    },
  },
});
