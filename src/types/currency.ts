import { z } from "zod";


export enum CurrencyCode {
  USD = "usd",
  EUR = "eur",
  JPY = "jpy",
  GBP = "gbp",
  AUD = "aud",
  CAD = "cad",
  CHF = "chf",
  CNY = "cny",
  SEK = "sek",
  NZD = "nzd",
  MXN = "mxn",
  SGD = "sgd",
  HKD = "hkd",
  NOK = "nok",
  VND = "vnd",
  KRW = "krw",
  THB = "thb",
  MYR = "myr",
  IDR = "idr",
  PHP = "php",
  INR = "inr",
  TWD = "twd",
  RUB = "rub",
  ZAR = "zar",
  BRL = "brl",
  DKK = "dkk",
  PLN = "pln",
  AED = "aed",
}


export const CurrencyCodeZ = z.nativeEnum(CurrencyCode);
