import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { PrivacyPolicyZ } from "../../../entities/Settings/General/PrivacyPolicy";


const basePath = "/api/settings/privacy-policies";

const UpdatePrivacyPolicyZ = PrivacyPolicyZ.pick({
  name: true,
  file: true,
  isActive: true,
});

export type UpdatePrivacyPolicy = z.infer<typeof UpdatePrivacyPolicyZ>;

export const privacyPolicyContract = initContract().router({
  getPrivacyPolicies: {
    summary: "Get privacy policies",
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

  createPrivacyPolicy: {
    summary: "Create a new privacy policy",
    method: "POST",
    path: basePath,
    body: PrivacyPolicyZ.pick({
      tenantOID: true,
      name: true,
      file: true,
      isActive: true,
    }),
    responses: {
      200: z.string(),
    },
  },

  updatePrivacyPolicy: {
    summary: "Update an existing privacy policy",
    method: "PATCH",
    path: `${basePath}/:policyOID`,
    body: UpdatePrivacyPolicyZ,
    responses: {
      200: z.string(),
    },
  },

  updatePrivacyPolicies: {
    summary: "Update multiple existing privacy policies",
    method: "POST",
    path: `${basePath}/batch-update`,
    body: z.record(
      z.string().describe("OID of privacy policy to update"),
      UpdatePrivacyPolicyZ,
    ),
    responses: {
      200: z.array(z.string().describe("OIDs of updated privacy policies")),
    },
  },

  deletePrivacyPolicy: {
    summary: "Delete a privacy policy",
    method: "DELETE",
    path: `${basePath}/:policyOID`,
    body: z.object({}),
    responses: {
      200: z.boolean(),
    },
  },

  deletePrivacyPolicies: {
    summary: "Delete multiple privacy policies",
    method: "POST",
    path: `${basePath}/batch-delete`,
    body: z.object({
      policyOIDs: z.array(z.string().describe("OIDs of privacy policies to delete")),
    }),
    responses: {
      200: z.boolean(),
    },
  },
});
