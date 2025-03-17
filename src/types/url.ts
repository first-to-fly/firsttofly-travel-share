import { z } from "zod";


export const NamedURLZ = z.object({
  name: z.string(),
  url: z.string(),
});

export type NamedURL = z.infer<typeof NamedURLZ>;
