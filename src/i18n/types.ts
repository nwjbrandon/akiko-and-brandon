export type Lang = "en" | "ja"

/** A string that exists in both site languages. */
export interface Localized {
  en: string
  ja: string
}

export function t(value: Localized, lang: Lang) {
  return value[lang]
}
