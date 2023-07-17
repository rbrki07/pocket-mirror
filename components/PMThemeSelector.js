// @ts-check
import React, { useCallback } from 'react'
import { useColorScheme } from 'react-native'
import { PMButton } from './PMButton'
import { useDispatch, useSelector } from 'react-redux'
import {
  SETTING_KEY_CURRENT_THEME,
  currentThemeSelector,
  updateSetting,
} from './../store/settings'
import { getThemeName } from '../utils/ThemeUtil'

/**
 * @returns {Object} PMThemeSelector
 */
const PMThemeSelector = () => {
  const colorScheme = useColorScheme()
  const currentTheme = useSelector(currentThemeSelector)
  const dispatch = useDispatch()

  const themeButtonOnPressCallback = useCallback(() => {
    if (currentTheme) {
      if (currentTheme === 'light') {
        dispatch(
          updateSetting({ key: SETTING_KEY_CURRENT_THEME, value: 'dark' })
        )
      } else {
        dispatch(
          updateSetting({ key: SETTING_KEY_CURRENT_THEME, value: 'light' })
        )
      }
    } else if (colorScheme && ['dark', 'light'].includes(colorScheme)) {
      if (colorScheme === 'light') {
        dispatch(
          updateSetting({ key: SETTING_KEY_CURRENT_THEME, value: 'dark' })
        )
      } else {
        dispatch(
          updateSetting({ key: SETTING_KEY_CURRENT_THEME, value: 'light' })
        )
      }
    }
  }, [colorScheme, currentTheme, dispatch])

  return (
    <PMButton
      onPressCallback={themeButtonOnPressCallback}
      iconName={
        getThemeName({
          currentTheme,
          colorScheme,
        }) === 'light'
          ? 'sunny-outline'
          : 'moon-outline'
      }
      testID={'themeButton'}
    />
  )
}

export { PMThemeSelector }
