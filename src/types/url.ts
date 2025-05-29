import { z } from "zod";


export const NamedURLZ = z.object({
  name: z.string(),
  url: z.string(),
  mimeType: z.string().optional(),
  size: z.number().optional(),
});

export type NamedURL = z.infer<typeof NamedURLZ>;
