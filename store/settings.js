// @ts-check
import { createSelector } from '@reduxjs/toolkit'
import { WhiteBalance } from 'expo-camera'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

/**
 * @type {typedefs.Settings}
 */
const initialState = [
  {
    key: 'currentTheme',
    value: undefined,
  },
  {
    key: 'currentWhiteBalance',
    value: WhiteBalance.auto,
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
export const settingsReducer = (state = initialState, action) => {
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
  // @ts-ignore
  (settings) => settings.find((setting) => setting.key === 'currentTheme')
)

export const currentWhiteBalanceSelector = createSelector(
  settingsSelector,
  /**
   * @returns {typedefs.CurrentWhiteBalanceSetting | undefined}
   */
  (settings) =>
    // @ts-ignore
    settings.find((setting) => setting.key === 'currentWhiteBalance')
)
