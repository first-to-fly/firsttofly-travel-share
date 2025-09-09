import { z } from "zod";

import { CurrencyCodeZ } from "../../../types/currency";
import { LanguageCodeZ } from "../../../types/multipleLanguage";
import { FTFSafeMaxNumberZ } from "../../../types/number";
import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum TenantEvents {
  TENANT_UPDATED = "TENANT_UPDATED",
  TENANT_LIST_UPDATED = "TENANT_LIST_UPDATED",
}

export const TenantZ = EntityZ.extend({
  entityType: z.literal(EntityType.TENANT),
  name: z.string(),
  logo: z.string().optional(),
  description: z.string(),
  domain: z.string(),
  localizationSupportLanguages: z.array(LanguageCodeZ),
  homeCurrency: CurrencyCodeZ,
  currencyExtra: z.object({
    supportedCurrencies: z.array(
      z.object({
        currency: CurrencyCodeZ,
        rate: FTFSafeMaxNumberZ({ name: "Supported currency rate" }).nonnegative(),
      }),
    ),
  }).optional(),
  defaultTaxConfig: z.object({
    scheme: z.string(),
    rate: FTFSafeMaxNumberZ({ name: "Default tax rate" }).nonnegative(),
  }).optional(),
  pdfHeader: z.string().optional(),
});

export type Tenant = z.infer<typeof TenantZ>;
