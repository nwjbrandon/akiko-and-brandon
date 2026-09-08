import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { locateInJapan, timeZoneSuggestsJapan } from "./geo"
import { translate, type UiKey } from "./strings"
import { t, type Lang, type Localized } from "./types"

const STORAGE_KEY = "fukui26-lang"

interface LanguageValue {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
  /** Look up a UI string. */
  ui: (key: UiKey) => string
  /** Resolve a piece of localized content. */
  tx: (value: Localized) => string
}

const LanguageContext = createContext<LanguageValue | null>(null)

function readStoredLang(): Lang | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "en" || stored === "ja") return stored
  } catch {
    // Storage can be unavailable; fall back to detection.
  }
  return null
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // A stored choice always wins. Failing that, start from the timezone — it is
  // instant and needs no permission — and let GPS correct it a moment later.
  const [chosen, setChosen] = useState<Lang | null>(readStoredLang)
  const [detected, setDetected] = useState<Lang>(() =>
    timeZoneSuggestsJapan() ? "ja" : "en",
  )

  useEffect(() => {
    if (chosen) return
    let cancelled = false
    locateInJapan().then((inJapan) => {
      if (cancelled || inJapan === null) return
      setDetected(inJapan ? "ja" : "en")
    })
    return () => {
      cancelled = true
    }
  }, [chosen])

  const lang = chosen ?? detected

  useEffect(() => {
    document.documentElement.lang = lang === "ja" ? "ja" : "en"
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setChosen(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Non-fatal: the choice still holds for this session.
    }
  }, [])

  const value = useMemo<LanguageValue>(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang(lang === "ja" ? "en" : "ja"),
      ui: (key) => translate(key, lang),
      tx: (localized) => t(localized, lang),
    }),
    [lang, setLang],
  )

  return <LanguageContext value={value}>{children}</LanguageContext>
}

export function useLang() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLang must be used within a LanguageProvider")
  return context
}
