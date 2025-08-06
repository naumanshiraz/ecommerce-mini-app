'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import en from '@/i18n/en.json'
import ur from '@/i18n/fr.json'

const translations = { en, ur }
type Language = keyof typeof translations

interface LanguageContextType {
  lang: Language
  t: (key: keyof typeof en) => string
  changeLang: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>('en')

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language
    if (saved) setLang(saved)
  }, [])

  const changeLang = (newLang: Language) => {
    localStorage.setItem('lang', newLang)
    setLang(newLang)
  }

  const t = (key: keyof typeof en) => {
    return translations[lang]?.[key] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, t, changeLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLang must be used inside LanguageProvider')
  return context
}
