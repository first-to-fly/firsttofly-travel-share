import { initContract } from "@ts-rest/core";
import { z } from "zod";


const c = initContract();

export const uploadContract = c.router({
  getObjectSize: {
    method: "GET",
    path: "/upload/object-size",
    query: z.object({
      s3Key: z.string().describe("S3 object key"),
      s3Bucket: z.string().describe("S3 bucket name"),
    }),
    responses: {
      200: z.object({
        size: z.number().describe("Object size in bytes"),
      }),
    },
    summary: "Get S3 object size",
    description: "Retrieves the size of an S3 object using its key and bucket name",
  },
});

// Export types for convenience
export type IUploadContract = typeof uploadContract;
