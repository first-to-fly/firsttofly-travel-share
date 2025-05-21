import { z } from "zod";


const DEFAULT_MAX = 9_999_999_999;


export const FTFSafeMaxNumberZ = (options?: { max?: number, name?: string }) => z.number().max(options?.max ?? DEFAULT_MAX, { message: `${options?.name ?? "Number"} must be less than or equal to ${options?.max ?? DEFAULT_MAX}` });
