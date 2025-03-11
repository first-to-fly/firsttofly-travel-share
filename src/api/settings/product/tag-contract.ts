import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { TagGroupZ, TagZ } from "../../../entities/Settings/Product";
import { PageListIdsResponseZ } from "../../../types/pageListIdsResponse";


const basePath = "/api/settings/tags";
const tagGroupBasePath = "/api/settings/tag-groups";


export const tagContract = initContract().router({
  getTags: {
    summary: "Get tags with pagination and filtering",
    method: "GET",
    path: basePath,
    query: z.object({
      page: z.string().optional(),
      pageSize: z.string().optional(),
      name: z.string().optional(),
      isActive: z.string().optional(),
      tagGroupId: z.string().optional(),
      // Add other filter fields as needed
    }).passthrough(), // Allow additional filter properties
    responses: {
      200: PageListIdsResponseZ,
    },
  },

  createTag: {
    summary: "Create a new tag",
    method: "POST",
    path: basePath,
    body: TagZ.pick({
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
      page: z.string().optional(),
      pageSize: z.string().optional(),
      // Add other filter fields as needed
    }).passthrough(), // Allow additional filter properties
    responses: {
      200: PageListIdsResponseZ,
    },
  },

  createTagGroup: {
    summary: "Create a new tag group",
    method: "POST",
    path: tagGroupBasePath,
    body: TagGroupZ.pick({
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
