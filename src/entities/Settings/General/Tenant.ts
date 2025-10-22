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
  logo: z.string().nullish(),
  description: z.string(),
  registeredCompanyName: z.string().nullish(),
  businessRegistrationNumber: z.string().nullish(),
  taxRegistrationNumber: z.string().nullish(),
  companyAddress: z.string().nullish(),
  companyPhoneNumber: z.number().nullish(),
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
  }).nullish(),
  defaultTaxConfig: z.object({
    scheme: z.string(),
    rate: FTFSafeMaxNumberZ({ name: "Default tax rate" }).nonnegative(),
  }).nullish(),
  pdfHeader: z.string().nullish(),
});

export type Tenant = z.infer<typeof TenantZ>;
