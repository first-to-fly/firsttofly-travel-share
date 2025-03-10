import { customAlphabet } from "nanoid";


const alphaNanoID = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
);


const alphaNumericNanoID = customAlphabet(
  "0123456789" +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
  "abcdefghijklmnopqrstuvwxyz",
);


export function safeNanoID(size = 21): string {
  return alphaNanoID(1) + alphaNumericNanoID(size - 1);
}
