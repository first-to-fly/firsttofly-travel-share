import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { EntityOIDZ } from "../../entities/entity";
import { MediaTypeZ, MediaZ } from "../../entities/Resources/Media";


const basePath = "/api/resources/medias";

const CreateMediaZ = MediaZ.pick({
  tenantOID: true,
  type: true,
  name: true,
  url: true,
  size: true,
  dimensions: true,
  description: true,
  relevantLocations: true,
});

const UpdateMediaZ = CreateMediaZ.omit({
  tenantOID: true,
}).partial();

export type CreateMedia = z.infer<typeof CreateMediaZ>;
export type UpdateMedia = z.infer<typeof UpdateMediaZ>;

export const mediaContract = initContract().router({
  getMedias: {
    summary: "Get medias",
    method: "GET",
    path: basePath,
    query: z.object({
      tenantOID: EntityOIDZ,
      type: MediaTypeZ.optional(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createMedia: {
    summary: "Create a new media",
    method: "POST",
    path: basePath,
    body: CreateMediaZ,
    responses: {
      200: z.string(),
    },
  },

  batchUpdateMedias: {
    summary: "Update multiple medias",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(z.string(), UpdateMediaZ),
    responses: {
      200: z.array(z.string()),
    },
  },

  batchDeleteMedias: {
    summary: "Delete multiple medias",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      mediaOIDs: z.array(z.string()),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
