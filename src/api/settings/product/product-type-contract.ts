import { initContract } from "@ts-rest/core";
import { z } from "zod";


const basePath = "/api/settings/product-types";

export const productTypeContract = initContract().router({
  getProductTypes: {
    summary: "Get product types",
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
});
