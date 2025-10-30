import { z } from "zod";

import { NamedURLZ } from "./url";


export const SignatureDataZ = z.object({
  url: NamedURLZ,
  customerName: z.string(),
});

export type SignatureData = z.infer<typeof SignatureDataZ>;

