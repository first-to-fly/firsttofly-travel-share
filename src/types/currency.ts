import { z } from "zod";


export enum CurrencyCode {

  USD = "USD",
  EUR = "EUR",
  JPY = "JPY",
  GBP = "GBP",
  AUD = "AUD",
  CAD = "CAD",
  CHF = "CHF",
  CNY = "CNY",
  SEK = "SEK",
  NZD = "NZD",
  MXN = "MXN",
  SGD = "SGD",
  HKD = "HKD",
  NOK = "NOK",
  VND = "VND",
  KRW = "KRW",
  THB = "THB",
  MYR = "MYR",
  IDR = "IDR",
  PHP = "PHP",
  INR = "INR",
  TWD = "TWD",
  RUB = "RUB",
  ZAR = "ZAR",
  BRL = "BRL",
  DKK = "DKK",
  PLN = "PLN",
  AED = "AED",

}

export const CurrencyCodeZ = z.nativeEnum(CurrencyCode);
