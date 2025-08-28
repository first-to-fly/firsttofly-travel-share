import { z } from "zod";


export enum ProductPlatform {
  SALESKIT = "saleskit",
  B2B = "b2b",
  B2C = "b2c",
}

export const ProductPlatformZ = z.nativeEnum(ProductPlatform);

export type ProductPlatformType = z.infer<typeof ProductPlatformZ>;
