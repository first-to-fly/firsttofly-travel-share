import { z } from "zod";


export const PageListIdsResponseZ = z.object({
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
  oids: z.array(z.string()),
});
