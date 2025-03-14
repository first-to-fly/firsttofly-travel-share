import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { TagGroupZ, TagZ } from "../../../entities/Settings/Product";


const basePath = "/api/settings/tags";
const tagGroupBasePath = "/api/settings/tag-groups";


export const tagContract = initContract().router({
  getTags: {
    summary: "Get tags with pagination and filtering",
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
    body: TagZ.pick({
      tenantOID: true,
      name: true,
      isActive: true,
      sortOrder: true,
      style: true,
      tagGroupId: true,
    }),
    responses: {
      200: z.string(),
    },
  },

  updateTag: {
    summary: "Update an existing tag",
    method: "PATCH",
    path: `${basePath}/:tagId`,
    body: TagZ.partial(),
    responses: {
      200: z.string(),
    },
  },

  deleteTag: {
    summary: "Delete a tag",
    method: "DELETE",
    path: `${basePath}/:tagId`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  // TagGroup methods
  getTagGroups: {
    summary: "Get tag groups with pagination and filtering",
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
    body: TagGroupZ.pick({
      tenantOID: true,
      name: true,
      description: true,
      tagIds: true,
    }),
    responses: {
      200: z.string(),
    },
  },

  updateTagGroup: {
    summary: "Update an existing tag group",
    method: "PATCH",
    path: `${tagGroupBasePath}/:tagGroupId`,
    body: TagGroupZ.partial(),
    responses: {
      200: z.string(),
    },
  },

  deleteTagGroup: {
    summary: "Delete a tag group",
    method: "DELETE",
    path: `${tagGroupBasePath}/:tagGroupId`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },
});
