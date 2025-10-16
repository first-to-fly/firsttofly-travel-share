import { z } from "zod";


export type DateISOString = string;

export const DateISOStringZ = z.string().datetime({ precision: 3 });

/**
 * Date range type for report filters
 * Used across multiple reports for consistent date range selection
 */
export const DateRangeTypeZ = z.enum([
  "today",
  "yesterday",
  "current-week",
  "last-week",
  "current-month",
  "last-month",
  "custom",
]);

export type DateRangeType = z.infer<typeof DateRangeTypeZ>;
