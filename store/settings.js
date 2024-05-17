// @ts-check
import { createSelector } from '@reduxjs/toolkit'
import { getLocales } from 'expo-localization'

// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

const SETTING_KEY_CURRENT_THEME = 'currentTheme'
const SETTING_KEY_CURRENT_ZOOM_LEVEL = 'currentZoomLevel'
const SETTING_KEY_CURRENT_LANGUAGE_CODE = 'currentLanguageCode'
const SETTING_KEY_CAMERA_CONTAINER_HEIGHT = 'cameraContainerHeight'
const SETTING_KEY_CAMERA_CONTAINER_WIDTH = 'cameraContainerWidth'
const SETTING_KEY_CAMERA_HEIGHT = 'cameraHeight'
const SETTING_KEY_CAMERA_WIDTH = 'cameraWidth'

export {
  SETTING_KEY_CURRENT_THEME,
  SETTING_KEY_CURRENT_ZOOM_LEVEL,
  SETTING_KEY_CURRENT_LANGUAGE_CODE,
  SETTING_KEY_CAMERA_CONTAINER_HEIGHT,
  SETTING_KEY_CAMERA_CONTAINER_WIDTH,
  SETTING_KEY_CAMERA_HEIGHT,
  SETTING_KEY_CAMERA_WIDTH,
}

/**
 * @type {typedefs.Settings}
 */
const SETTING_INITIAL_STATE = [
  {
    key: SETTING_KEY_CURRENT_THEME,
    value: undefined,
  },
  {
    key: SETTING_KEY_CURRENT_ZOOM_LEVEL,
    value: 0.0,
  },
  {
    key: SETTING_KEY_CURRENT_LANGUAGE_CODE,
    value: getLocales()[0].languageCode,
  },
  {
    key: SETTING_KEY_CAMERA_CONTAINER_HEIGHT,
    value: undefined,
  },
  {
    key: SETTING_KEY_CAMERA_CONTAINER_WIDTH,
    value: undefined,
  },
  {
    key: SETTING_KEY_CAMERA_HEIGHT,
    value: undefined,
  },
  {
    key: SETTING_KEY_CAMERA_WIDTH,
    value: undefined,
  },
]

export const migrations = {
  1: (state) => {
    // add SETTING_KEY_CURRENT_LANGUAGE_CODE
    return {
      ...state,
      settings: [
        ...state.settings,
        {
          key: SETTING_KEY_CURRENT_LANGUAGE_CODE,
          value: getLocales()[0].languageCode,
        },
      ],
    }
  },
  2: (state) => {
    // add SETTING_KEY_CAMERA_CONTAINER_HEIGHT, SETTING_KEY_CAMERA_CONTAINER_WIDTH, SETTING_KEY_CAMERA_HEIGHT and SETTING_KEY_CAMERA_WIDTH
    return {
      ...state,
      settings: [
        ...state.settings,
        {
          key: SETTING_KEY_CAMERA_CONTAINER_HEIGHT,
          value: undefined,
        },
        {
          key: SETTING_KEY_CAMERA_CONTAINER_WIDTH,
          value: undefined,
        },
        {
          key: SETTING_KEY_CAMERA_HEIGHT,
          value: undefined,
        },
        {
          key: SETTING_KEY_CAMERA_WIDTH,
          value: undefined,
        },
      ],
    }
  },
  3: (state) => {
    // remove SETTING_KEY_CURRENT_WHITE_BALANCE
    return {
      ...state,
      settings: state.settings.filter(
        (setting) => setting.key !== 'currentWhiteBalance'
      ),
    }
  },
}

const UPDATE_SETTING = 'settings/update'

/**
 * @param {typedefs.Setting} setting
 *
 * @returns {typedefs.SettingAction}
 */
export const updateSetting = (setting) => {
  return {
    type: UPDATE_SETTING,
    payload: setting,
  }
}

/**
 * @param {typedefs.Settings} state
 * @param {typedefs.SettingAction} action
 *
 * @returns {typedefs.Settings}
 */
const updateSettingReducer = (state, action) => {
  return state.map((setting) =>
    setting?.key === action.payload?.key ? action.payload : setting
  )
}

/**
 * @param {typedefs.Settings} state
 * @param {typedefs.SettingAction} action
 *
 * @returns {typedefs.Settings}
 */
export const settingsReducer = (state = SETTING_INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_SETTING:
      return updateSettingReducer(state, action)
    default:
      return state
  }
}

/**
 * @param {Object} state
 * @param {typedefs.Settings} state.settings
 *
 * @returns {typedefs.Settings}
 */
const settingsSelector = (state) => state.settings

export const currentThemeSelector = createSelector(
  settingsSelector,
  /**
   * @returns {typedefs.ColorScheme}
   */
  (settings) =>
    // @ts-ignore
    settings.find((setting) => setting.key === SETTING_KEY_CURRENT_THEME)?.value
)

export const currentZoomLevelSelector = createSelector(
  settingsSelector,
  /**
   * @returns {Number | undefined}
   */
  (settings) =>
    // @ts-ignore
    settings.find((setting) => setting.key === SETTING_KEY_CURRENT_ZOOM_LEVEL)
      ?.value
)

export const currentLanguageCodeSelector = createSelector(
  settingsSelector,
  /**
   * @returns {String | undefined}
   */
  (settings) =>
    // @ts-ignore
    settings.find(
      (setting) => setting.key === SETTING_KEY_CURRENT_LANGUAGE_CODE
    )?.value
)

export const cameraContainerHeightSelector = createSelector(
  settingsSelector,
  /**
   * @returns {Number | undefined}
   */
  (settings) =>
    // @ts-ignore
    settings.find(
      (setting) => setting.key === SETTING_KEY_CAMERA_CONTAINER_HEIGHT
    )?.value
)

export const cameraContainerWidthSelector = createSelector(
  settingsSelector,
  /**
   * @returns {Number | undefined}
   */
  (settings) =>
    // @ts-ignore
    settings.find(
      (setting) => setting.key === SETTING_KEY_CAMERA_CONTAINER_WIDTH
    )?.value
)

export const cameraHeightSelector = createSelector(
  settingsSelector,
  /**
   * @returns {Number | undefined}
   */
  (settings) =>
    // @ts-ignore
    settings.find((setting) => setting.key === SETTING_KEY_CAMERA_HEIGHT)?.value
)

export const cameraWidthSelector = createSelector(
  settingsSelector,
  /**
   * @returns {Number | undefined}
   */
  (settings) =>
    // @ts-ignore
    settings.find((setting) => setting.key === SETTING_KEY_CAMERA_WIDTH)?.value
)
