// @ts-check
import { createSelector } from '@reduxjs/toolkit'
import { WhiteBalance } from 'expo-camera'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

const SETTING_KEY_CURRENT_THEME = 'currentTheme'
const SETTING_KEY_CURRENT_WHITE_BALANCE = 'currentWhiteBalance'
const SETTING_KEY_CURRENT_ZOOM_LEVEL = 'currentZoomLevel'

export {
  SETTING_KEY_CURRENT_THEME,
  SETTING_KEY_CURRENT_WHITE_BALANCE,
  SETTING_KEY_CURRENT_ZOOM_LEVEL,
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
    key: SETTING_KEY_CURRENT_WHITE_BALANCE,
    value: WhiteBalance.auto,
  },
  {
    key: SETTING_KEY_CURRENT_ZOOM_LEVEL,
    value: 0.0,
  },
]

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
   * @returns {typedefs.CurrentThemeSetting | undefined}
   */
  (settings) =>
    // @ts-ignore
    settings.find((setting) => setting.key === SETTING_KEY_CURRENT_THEME)
)

export const currentWhiteBalanceSelector = createSelector(
  settingsSelector,
  /**
   * @returns {typedefs.CurrentWhiteBalanceSetting | undefined}
   */
  (settings) =>
    // @ts-ignore
    settings.find(
      (setting) => setting.key === SETTING_KEY_CURRENT_WHITE_BALANCE
    )
)

export const currentZoomLevelSelector = createSelector(
  settingsSelector,
  /**
   * @returns {typedefs.CurrentZoomLevelSetting | undefined}
   */
  (settings) =>
    // @ts-ignore
    settings.find((setting) => setting.key === SETTING_KEY_CURRENT_ZOOM_LEVEL)
)
