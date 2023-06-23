// @ts-check
import { useColorScheme } from 'react-native'
import { useSelector } from 'react-redux'
import { currentThemeSelector } from '../store/settings'
import { THEME } from '../style/theme'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

/**
 * @param {Object} params
 * @param {typedefs.ColorScheme} [params.currentTheme]
 * @param {import("react-native").ColorSchemeName} params.colorScheme
 * @param {typedefs.ColorScheme} params.defaultTheme
 *
 * @returns {typedefs.Theme}
 */
const getTheme = ({ currentTheme, colorScheme, defaultTheme }) => {
  if (currentTheme) {
    // @ts-ignore
    return THEME[currentTheme]
  } else if (colorScheme && ['dark', 'light'].includes(colorScheme)) {
    // @ts-ignore
    return THEME[colorScheme]
  } else {
    return THEME[defaultTheme]
  }
}

/**
 * @param {typedefs.ColorScheme} [defaultTheme]
 *
 * @returns {typedefs.Theme}
 */
const useTheme = (defaultTheme = 'dark') => {
  const colorScheme = useColorScheme()
  const currentTheme = useSelector(currentThemeSelector)
  return getTheme({
    currentTheme: currentTheme?.value,
    colorScheme,
    defaultTheme,
  })
}

export { getTheme, useTheme }
