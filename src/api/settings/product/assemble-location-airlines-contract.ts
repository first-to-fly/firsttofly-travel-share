import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { AssembleLocationAirlinesZ } from "../../../entities/Settings/Product/AssembleLocationAirlines";


const basePath = "/api/settings/assemble-location-airlines";

const CreateAssembleLocationAirlinesZ = AssembleLocationAirlinesZ.pick({
  tenantOID: true,
  airlineCode: true,
  airportCode: true,
  location: true,
  file: true,
  status: true,
  offlineOperator: true,
});

const UpdateAssembleLocationAirlinesZ = CreateAssembleLocationAirlinesZ.omit({
  tenantOID: true,
}).partial();

export type UpdateAssembleLocationAirlines = z.infer<typeof UpdateAssembleLocationAirlinesZ>;
export type CreateAssembleLocationAirlines = z.infer<typeof CreateAssembleLocationAirlinesZ>;

export const assembleLocationAirlinesContract = initContract().router({
  getAssembleLocationAirlines: {
    summary: "Get assemble location airlines",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: z.string(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createAssembleLocationAirlines: {
    summary: "Create a new assemble location airlines",
    method: "POST",
    path: basePath,
    body: CreateAssembleLocationAirlinesZ,
    responses: {
      200: z.string(),
    },
  },

  updateAssembleLocationAirlines: {
    summary: "Update an existing assemble location airlines",
    method: "PATCH",
    path: `${basePath}/:assembleLocationAirlinesOID`,
    body: UpdateAssembleLocationAirlinesZ,
    responses: {
      200: z.string(),
    },
  },

  updateAssembleLocationAirlinesList: {
    summary: "Update multiple existing assemble location airlines",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of assemble location airlines to update"),
      UpdateAssembleLocationAirlinesZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated assemble location airlines")),
    },
  },

  deleteAssembleLocationAirlines: {
    summary: "Delete an assemble location airlines",
    method: "DELETE",
    path: `${basePath}/:assembleLocationAirlinesOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteAssembleLocationAirlinesList: {
    summary: "Delete multiple assemble location airlines",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      assembleLocationAirlinesOIDs: z.array(z.string().describe("OIDs of assemble location airlines to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
