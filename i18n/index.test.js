// @ts-check
import * as keys from './keys'
import { da } from './da'
import { de } from './de'
import { en } from './en'
import { es } from './es'
import { fi } from './fi'
import { fr } from './fr'
import { it as _it } from './it'
import { nb } from './nb'
import { nl } from './nl'
import { pt } from './pt'
import { sv } from './sv'

jest.mock('expo-localization', () => ({
  ...jest.requireActual('expo-localization'),
  getLocales: () => [{ languageCode: 'de' }],
}))

const NUMBER_OF_APP_METADATA_TRANSLATIONS = 4

describe('i18n - da', () => {
  it('should use all i18n keys for translation', () => {
    Object.values(keys).forEach((key) => expect(Object.keys(da)).toContain(key))
  })
  it('should use all localization keys for app metadata translation', () => {
    expect(Object.keys(require('./da.json'))).toHaveLength(
      NUMBER_OF_APP_METADATA_TRANSLATIONS
    )
  })
})

describe('i18n - de', () => {
  it('should use all i18n keys for translation', () => {
    Object.values(keys).forEach((key) => expect(Object.keys(de)).toContain(key))
  })
  it('should use all localization keys for app metadata translation', () => {
    expect(Object.keys(require('./de.json'))).toHaveLength(
      NUMBER_OF_APP_METADATA_TRANSLATIONS
    )
  })
})

describe('i18n - en', () => {
  it('should use all i18n keys for translation', () => {
    Object.values(keys).forEach((key) => expect(Object.keys(en)).toContain(key))
  })
  it('should use all localization keys for app metadata translation', () => {
    expect(Object.keys(require('./en.json'))).toHaveLength(
      NUMBER_OF_APP_METADATA_TRANSLATIONS
    )
  })
})

describe('i18n - es', () => {
  it('should use all i18n keys for translation', () => {
    Object.values(keys).forEach((key) => expect(Object.keys(es)).toContain(key))
  })
  it('should use all localization keys for app metadata translation', () => {
    expect(Object.keys(require('./es.json'))).toHaveLength(
      NUMBER_OF_APP_METADATA_TRANSLATIONS
    )
  })
})

describe('i18n - fi', () => {
  it('should use all i18n keys for translation', () => {
    Object.values(keys).forEach((key) => expect(Object.keys(fi)).toContain(key))
  })
  it('should use all localization keys for app metadata translation', () => {
    expect(Object.keys(require('./fi.json'))).toHaveLength(
      NUMBER_OF_APP_METADATA_TRANSLATIONS
    )
  })
})

describe('i18n - fr', () => {
  it('should use all i18n keys for translation', () => {
    Object.values(keys).forEach((key) => expect(Object.keys(fr)).toContain(key))
  })
  it('should use all localization keys for app metadata translation', () => {
    expect(Object.keys(require('./fr.json'))).toHaveLength(
      NUMBER_OF_APP_METADATA_TRANSLATIONS
    )
  })
})

describe('i18n - it', () => {
  it('should use all i18n keys for translation', () => {
    Object.values(keys).forEach((key) =>
      expect(Object.keys(_it)).toContain(key)
    )
  })
  it('should use all localization keys for app metadata translation', () => {
    expect(Object.keys(require('./it.json'))).toHaveLength(
      NUMBER_OF_APP_METADATA_TRANSLATIONS
    )
  })
})

describe('i18n - nb', () => {
  it('should use all i18n keys for translation', () => {
    Object.values(keys).forEach((key) => expect(Object.keys(nb)).toContain(key))
  })
  it('should use all localization keys for app metadata translation', () => {
    expect(Object.keys(require('./nb.json'))).toHaveLength(
      NUMBER_OF_APP_METADATA_TRANSLATIONS
    )
  })
})

describe('i18n - nl', () => {
  it('should use all i18n keys for translation', () => {
    Object.values(keys).forEach((key) => expect(Object.keys(nl)).toContain(key))
  })
  it('should use all localization keys for app metadata translation', () => {
    expect(Object.keys(require('./nl.json'))).toHaveLength(
      NUMBER_OF_APP_METADATA_TRANSLATIONS
    )
  })
})

describe('i18n - pt', () => {
  it('should use all i18n keys for translation', () => {
    Object.values(keys).forEach((key) => expect(Object.keys(pt)).toContain(key))
  })
  it('should use all localization keys for app metadata translation', () => {
    expect(Object.keys(require('./pt.json'))).toHaveLength(
      NUMBER_OF_APP_METADATA_TRANSLATIONS
    )
  })
})

describe('i18n - sv', () => {
  it('should use all i18n keys for translation', () => {
    Object.values(keys).forEach((key) => expect(Object.keys(sv)).toContain(key))
  })
  it('should use all localization keys for app metadata translation', () => {
    expect(Object.keys(require('./sv.json'))).toHaveLength(
      NUMBER_OF_APP_METADATA_TRANSLATIONS
    )
  })
})
