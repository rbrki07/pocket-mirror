// @ts-check
import { getLocales } from 'expo-localization'
import { I18n } from 'i18n-js'
import { da } from './da'
import { de } from './de'
import { en } from './en'
import { nb } from './nb'
import { sv } from './sv'

const i18n = new I18n({
  da,
  de,
  en,
  nb,
  sv,
})

i18n.defaultLocale = 'en'
i18n.locale = getLocales()[0].languageCode
i18n.enableFallback = true

export { i18n }
