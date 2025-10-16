import { z } from "zod";


export type DateISOString = string;

export const DateISOStringZ = z.string().datetime({ precision: 3 });

/**
 * Date-only string in YYYY-MM-DD format (no time component)
 * Used for report filters and date-only fields
 */
export type DateOnlyString = string;

export const DateOnlyStringZ = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
