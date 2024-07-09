// @ts-check

const {
  SETTING_KEY_CURRENT_THEME,
  currentThemeSelector,
  SETTING_KEY_CURRENT_ZOOM_LEVEL,
  currentZoomLevelSelector,
  settingsReducer,
  updateSetting,
  SETTING_KEY_CURRENT_LANGUAGE_CODE,
  currentLanguageCodeSelector,
  cameraContainerHeightSelector,
  SETTING_KEY_CAMERA_CONTAINER_HEIGHT,
  SETTING_KEY_CAMERA_CONTAINER_WIDTH,
  cameraContainerWidthSelector,
  SETTING_KEY_CAMERA_HEIGHT,
  cameraHeightSelector,
  SETTING_KEY_CAMERA_WIDTH,
  cameraWidthSelector,
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

  it('should select a number as cameraContainerHeight if cameraContainerHeight is available', () => {
    const setting = {
      key: SETTING_KEY_CAMERA_CONTAINER_HEIGHT,
      value: 111,
    }
    const state = {
      settings: [setting],
    }

    // @ts-ignore
    const result = cameraContainerHeightSelector(state)
    expect(result).toEqual(setting.value)
  })

  it('should select undefined as cameraContainerHeight if cameraContainerHeight is not available', () => {
    const state = {
      settings: [],
    }

    const result = cameraContainerHeightSelector(state)
    expect(result).toBeUndefined()
  })

  it('should select a number as cameraContainerWidth if cameraContainerWidth is available', () => {
    const setting = {
      key: SETTING_KEY_CAMERA_CONTAINER_WIDTH,
      value: 111,
    }
    const state = {
      settings: [setting],
    }

    // @ts-ignore
    const result = cameraContainerWidthSelector(state)
    expect(result).toEqual(setting.value)
  })

  it('should select undefined as cameraContainerWidth if cameraContainerWidth is not available', () => {
    const state = {
      settings: [],
    }

    const result = cameraContainerWidthSelector(state)
    expect(result).toBeUndefined()
  })

  it('should select a number as cameraHeight if cameraHeight is available', () => {
    const setting = {
      key: SETTING_KEY_CAMERA_HEIGHT,
      value: 111,
    }
    const state = {
      settings: [setting],
    }

    // @ts-ignore
    const result = cameraHeightSelector(state)
    expect(result).toEqual(setting.value)
  })

  it('should select undefined as cameraHeight if cameraHeight is not available', () => {
    const state = {
      settings: [],
    }

    const result = cameraHeightSelector(state)
    expect(result).toBeUndefined()
  })

  it('should select a number as cameraWidth if cameraWidth is available', () => {
    const setting = {
      key: SETTING_KEY_CAMERA_WIDTH,
      value: 111,
    }
    const state = {
      settings: [setting],
    }

    // @ts-ignore
    const result = cameraWidthSelector(state)
    expect(result).toEqual(setting.value)
  })

  it('should select undefined as cameraWidth if cameraWidth is not available', () => {
    const state = {
      settings: [],
    }

    const result = cameraWidthSelector(state)
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
