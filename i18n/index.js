// @ts-check
import { getLocales } from 'expo-localization'
import { I18n } from 'i18n-js'
import { da } from './da'
import { de } from './de'
import { en } from './en'
import { es } from './es'
import { fi } from './fi'
import { fr } from './fr'
import { it } from './it'
import { nb } from './nb'
import { nl } from './nl'
import { pt } from './pt'
import { sv } from './sv'

const i18n = new I18n({
  da,
  de,
  en,
  es,
  fi,
  fr,
  it,
  nb,
  nl,
  pt,
  sv,
})

i18n.defaultLocale = 'en'
i18n.locale = getLocales()[0].languageCode
i18n.enableFallback = true

export { i18n }
