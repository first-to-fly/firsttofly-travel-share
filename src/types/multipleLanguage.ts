import { z } from "zod";


export enum LanguageCode {
  ENGLISH = "en", // Hello, how are you?
  JAPANESE = "ja", // こんにちは、お元気ですか？
  KOREAN = "ko", // 안녕하세요, 어떻게 지내세요?
  VIETNAMESE = "vi", // Xin chào, bạn có khỏe không?
  FRENCH = "fr", // Bonjour, comment ça va?
  GERMAN = "de", // Hallo, wie geht es Ihnen?
  SPANISH = "es", // Hola, ¿cómo estás?
  ITALIAN = "it", // Ciao, come stai?
  PORTUGUESE = "pt", // Olá, como vai você?
  SIMPLIFIED_CHINESE = "zh-Hans", // 你好，你好吗？
  TRADITIONAL_CHINESE = "zh-Hant", // 你好，你好嗎？
  BAHASA_INDONESIA = "id", // Halo, apa kabar?
  THAI = "th", // สวัสดี, คุณเป็นอย่างไรบ้าง?
  NO_LANGUAGE = "no-language-code",
}


export type MultiLanguageData<T> = {
  [key in LanguageCode]?: T
};

// eslint-disable-next-line max-len
export const MultiLanguageDataZ = <T extends z.ZodType>(valueSchema: T) => z.record(LanguageCodeZ, valueSchema.optional());

export const LanguageCodeZ = z.nativeEnum(LanguageCode);
