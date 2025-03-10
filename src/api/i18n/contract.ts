import { initContract } from "@ts-rest/core";
import { z } from "zod";


export const i18nContract = initContract().router({
  getAllLanguages: {
    summary: "Get All i18n strings",
    method: "GET",
    path: "/api/i18n/all-languages",
    responses: {
      200: z.record(
        z.string(), // language code
        z.record(
          z.string(), // namespace
          z.record(
            z.string(), // key
            z.string(), // value
          ),
        ),
      ),
    },
  },
  getI18nNamespaceStrings: {
    summary: "Get i18n namespace strings",
    method: "GET",
    path: "/api/i18n/:langCode/:namespace",
    responses: {
      200: z.record(
        z.string(), // key
        z.string(), // value
      ),
      304: z.undefined(),
    },
  },
});
