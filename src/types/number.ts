import { z } from "zod";


export const FTFSafeMaxNumberZ = (options?: { max?: number, name?: string }) => z.number().max(options?.max ?? 9_999_999_999, { message: `${options?.name ?? "Number"} must be less than or equal to ${options?.max}` });
