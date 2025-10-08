import { z } from "zod";


const LETTERS_ONLY_COUNTRY_CODE_REGEX = /^[A-Za-z]{2}$/;

export const CountryCodeZ = z
  .string()
  .trim()
  .min(2, "Country code must be two characters")
  .max(2, "Country code must be two characters")
  .regex(LETTERS_ONLY_COUNTRY_CODE_REGEX, "Country code must contain only letters")
  .transform((value) => value.toUpperCase());

export const isCountryCode = (value: string): boolean => LETTERS_ONLY_COUNTRY_CODE_REGEX.test(value.trim());

export const normalizeCountryCode = (value: string): string => CountryCodeZ.parse(value);
