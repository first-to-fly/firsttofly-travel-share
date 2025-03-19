/**
 * Example Sector Structure:
 *
 * Tenant: Acme Corp
 * - Sectors:
 *   1. Manufacturing
 *      - Automotive
 *        - Car Manufacturing
 *        - Auto Parts
 *      - Electronics
 *        - Consumer Electronics
 *        - Industrial Electronics
 *
 *   2. Technology
 *      - Software
 *        - Enterprise
 *        - Consumer
 *      - Hardware
 *        - Servers
 *        - Networking
 */

import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export const SectorZ = EntityZ.extend({
  entityType: z.literal(EntityType.SECTOR),

  name: z.string(),
  parentOID: z.string().uuid().optional(),
  sectorGroupOID: z.string().uuid(),
  isActive: z.boolean().default(true),
});

export type Sector = z.infer<typeof SectorZ>;

export const SectorGroupZ = EntityZ.extend({
  entityType: z.literal(EntityType.SECTOR_GROUP),

  name: z.string(),
  description: z.string().optional(),

  sectorOIDs: z.array(z.string().uuid()),
});

export type SectorGroup = z.infer<typeof SectorGroupZ>;
