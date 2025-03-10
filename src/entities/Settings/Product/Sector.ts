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

import { EntityType } from "entities/entityType";
import { z } from "zod";

import { EntityZ } from "../../entity";


export const SectorZ = EntityZ.extend({
  entityType: z.literal(EntityType.SECTOR),

  name: z.string(),
  parentId: z.string().uuid().optional(),
  sectorGroupId: z.string().uuid().optional(),
  isActive: z.boolean().default(true),
});

export type Sector = z.infer<typeof SectorZ>;

export const SectorGroupZ = EntityZ.extend({
  entityType: z.literal(EntityType.SECTOR_GROUP),

  name: z.string(),
  description: z.string().optional(),

  sectorIds: z.array(z.string().uuid()),
});

export type SectorGroup = z.infer<typeof SectorGroupZ>;
