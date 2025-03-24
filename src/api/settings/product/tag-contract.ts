import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { TagGroupZ, TagZ } from "../../../entities/Settings/Product/Tag";


const basePath = "/api/settings/tags";
const tagGroupBasePath = "/api/settings/tag-groups";

const UpdateTagZ = TagZ.pick({
  name: true,
  isActive: true,
  sortOrder: true,
  style: true,
  tagGroupOID: true,
});

const CreateTagZ = UpdateTagZ.extend({
  tenantOID: z.string(),
});

const UpdateTagGroupZ = TagGroupZ.pick({
  name: true,
  description: true,
  tagOIDs: true,
});

const CreateTagGroupZ = UpdateTagGroupZ.extend({
  tenantOID: z.string(),
});

export type UpdateTag = z.infer<typeof UpdateTagZ>;
export type CreateTag = z.infer<typeof CreateTagZ>;
export type UpdateTagGroup = z.infer<typeof UpdateTagGroupZ>;
export type CreateTagGroup = z.infer<typeof CreateTagGroupZ>;


export const tagContract = initContract().router({
  getTags: {
    summary: "Get tags",
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

  createTag: {
    summary: "Create a new tag",
    method: "POST",
    path: basePath,
    body: CreateTagZ,
    responses: {
      200: z.string(),
    },
  },

  updateTag: {
    summary: "Update an existing tag",
    method: "PATCH",
    path: `${basePath}/:tagOID`,
    body: UpdateTagZ,
    responses: {
      200: z.string(),
    },
  },

  deleteTag: {
    summary: "Delete a tag",
    method: "DELETE",
    path: `${basePath}/:tagOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  // TagGroup methods
  getTagDepartments: {
    summary: "Get tag groups",
    method: "GET",
    path: tagGroupBasePath,
    query: z.object({
      tenantOID: z.string(),
    }).passthrough(),
    responses: {
      200: z.object({
        oids: z.array(z.string()),
      }),
    },
  },

  createTagGroup: {
    summary: "Create a new tag group",
    method: "POST",
    path: tagGroupBasePath,
    body: CreateTagGroupZ,
    responses: {
      200: z.string(),
    },
  },

  updateTagGroup: {
    summary: "Update an existing tag group",
    method: "PATCH",
    path: `${tagGroupBasePath}/:tagGroupOID`,
    body: UpdateTagGroupZ,
    responses: {
      200: z.string(),
    },
  },

  deleteTagGroup: {
    summary: "Delete a tag group",
    method: "DELETE",
    path: `${tagGroupBasePath}/:tagGroupOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },
});
