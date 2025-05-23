import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { GroupTourPNLSimulationZ } from "../../entities/Products/GroupTourPNLSimulation";


const basePath = "/api/products/group-tour-pnl-simulations";

// Create/Update schemas
const CreateGroupTourPNLSimulationZ = GroupTourPNLSimulationZ.pick({
  groupTourPricingOID: true,
  tenantOID: true,
  groupVolumes: true,
});

const UpdateGroupTourPNLSimulationZ = CreateGroupTourPNLSimulationZ.omit({
  groupTourPricingOID: true,
  tenantOID: true,
}).partial();

export type UpdateGroupTourPNLSimulation = z.infer<typeof UpdateGroupTourPNLSimulationZ>;
export type CreateGroupTourPNLSimulation = z.infer<typeof CreateGroupTourPNLSimulationZ>;

export const groupTourPNLSimulationContract = initContract().router({

  updateGroupTourPNLSimulations: {
    summary: "Update multiple existing group tour P&L simulations",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of group tour P&L simulation to update"),
      UpdateGroupTourPNLSimulationZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated group tour P&L simulations")),
    },
  },

  deleteGroupTourPNLSimulations: {
    summary: "Delete multiple group tour P&L simulations",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      simulationOIDs: z.array(z.string().describe("OIDs of group tour P&L simulations to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
