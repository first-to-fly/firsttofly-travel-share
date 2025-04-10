import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { GroupTourPNLSimulationZ } from "../../entities/Product/GroupTourPNLSimulation";


const basePath = "/api/group-tour";

// Create/Update schemas
const UpdateGroupTourPNLSimulationZ = GroupTourPNLSimulationZ.pick({
  groupVolume: true,
  passengerCount: true,
});

const CreateGroupTourPNLSimulationZ = UpdateGroupTourPNLSimulationZ.extend({
  groupTourPricingOID: z.string(),
  tenantOID: z.string(),
});

export type UpdateGroupTourPNLSimulation = z.infer<typeof UpdateGroupTourPNLSimulationZ>;
export type CreateGroupTourPNLSimulation = z.infer<typeof CreateGroupTourPNLSimulationZ>;

export const groupTourPNLSimulationContract = initContract().router({
  getGroupTourPNLSimulations: {
    summary: "Get group tour P&L simulations",
    method: "GET",
    path: `${basePath}/pricings/:pricingOID/simulations`,
    query: z.object({
      tenantOID: z.string(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createGroupTourPNLSimulation: {
    summary: "Create a new group tour P&L simulation",
    method: "POST",
    path: `${basePath}/pricings/:pricingOID/simulations`,
    body: CreateGroupTourPNLSimulationZ,
    responses: {
      200: z.string(),
    },
  },

  updateGroupTourPNLSimulation: {
    summary: "Update an existing group tour P&L simulation",
    method: "PATCH",
    path: `${basePath}/pricings/:pricingOID/simulations/:simulationOID`,
    body: UpdateGroupTourPNLSimulationZ,
    responses: {
      200: z.string(),
    },
  },

  updateGroupTourPNLSimulations: {
    summary: "Update multiple existing group tour P&L simulations",
    method: "POST",
    path: `${basePath}/pricings/:pricingOID/simulations/batch-update`,
    body: z.record(
      z.string().describe("OID of group tour P&L simulation to update"),
      UpdateGroupTourPNLSimulationZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated group tour P&L simulations")),
    },
  },

  deleteGroupTourPNLSimulation: {
    summary: "Delete a group tour P&L simulation",
    method: "DELETE",
    path: `${basePath}/pricings/:pricingOID/simulations/:simulationOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deleteGroupTourPNLSimulations: {
    summary: "Delete multiple group tour P&L simulations",
    method: "POST",
    path: `${basePath}/pricings/:pricingOID/simulations/batch-delete`,
    body: z.object({
      simulationOIDs: z.array(z.string().describe("OIDs of group tour P&L simulations to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
