// @ts-check

const { WhiteBalance } = require('expo-camera')
const {
  SETTING_KEY_CURRENT_THEME,
  currentThemeSelector,
  SETTING_KEY_CURRENT_WHITE_BALANCE,
  currentWhiteBalanceSelector,
  SETTING_KEY_CURRENT_ZOOM_LEVEL,
  currentZoomLevelSelector,
  settingsReducer,
  updateSetting,
  SETTING_KEY_CURRENT_LANGUAGE_CODE,
  currentLanguageCodeSelector,
} = require('./settings')

describe('Setting selectors', () => {
  it('should select light as current theme if current theme is available', () => {
    const setting = {
      key: SETTING_KEY_CURRENT_THEME,
      value: 'light',
    }
    const state = {
      settings: [setting],
    }

    // @ts-ignore
    const result = currentThemeSelector(state)
    expect(result).toEqual(setting.value)
  })

  it('should select undefined as current theme if current theme is not available', () => {
    const state = {
      settings: [],
    }

    const result = currentThemeSelector(state)
    expect(result).toBeUndefined()
  })

  it('should select auto as current white-balance if current white-balance is available', () => {
    const setting = {
      key: SETTING_KEY_CURRENT_WHITE_BALANCE,
      value: WhiteBalance.auto,
    }
    const state = {
      settings: [setting],
    }

    // @ts-ignore
    const result = currentWhiteBalanceSelector(state)
    expect(result).toEqual(setting.value)
  })

  it('should select undefined as current white-balance if current white-balance is not available', () => {
    const state = {
      settings: [],
    }

    const result = currentWhiteBalanceSelector(state)
    expect(result).toBeUndefined()
  })

  it('should select 0.0 as current zoom-level if current zoom-level is available', () => {
    const setting = {
      key: SETTING_KEY_CURRENT_ZOOM_LEVEL,
      value: 0.0,
    }
    const state = {
      settings: [setting],
    }

    // @ts-ignore
    const result = currentZoomLevelSelector(state)
    expect(result).toEqual(setting.value)
  })

  it('should select undefined as current zoom-level if current zoom-level is not available', () => {
    const state = {
      settings: [],
    }

    const result = currentZoomLevelSelector(state)
    expect(result).toBeUndefined()
  })

  it('should select de as current language-code if current language-code is available', () => {
    const setting = {
      key: SETTING_KEY_CURRENT_LANGUAGE_CODE,
      value: 'de',
    }
    const state = {
      settings: [setting],
    }

    // @ts-ignore
    const result = currentLanguageCodeSelector(state)
    expect(result).toEqual(setting.value)
  })

  it('should select undefined as current language-code if current language-code is not available', () => {
    const state = {
      settings: [],
    }

    const result = currentLanguageCodeSelector(state)
    expect(result).toBeUndefined()
  })
})

describe('Setting reducers', () => {
  it('should update setting state if update action takes place', () => {
    const setting = {
      key: SETTING_KEY_CURRENT_THEME,
      value: 'light',
    }
    const state = [setting]
    const updatedSetting = {
      key: SETTING_KEY_CURRENT_THEME,
      value: 'dark',
    }
    const updatedState = [updatedSetting]
    // @ts-ignore
    const action = updateSetting(updatedSetting)

    // @ts-ignore
    const result = settingsReducer(state, action)
    expect(result).toEqual(updatedState)
  })

  it('should not update setting state if unknown action takes place', () => {
    const setting = {
      key: SETTING_KEY_CURRENT_THEME,
      value: 'light',
    }
    const state = [setting]
    // @ts-ignore
    const action = {
      type: 'foo',
      payload: { b: 'ar' },
    }

    // @ts-ignore
    const result = settingsReducer(state, action)
    expect(result).toEqual(state)
  })
})
