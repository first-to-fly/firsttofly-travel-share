import { z } from "zod";


export type DateISOString = string;

export const DateISOStringZ = z.string().datetime({ precision: 3 });
