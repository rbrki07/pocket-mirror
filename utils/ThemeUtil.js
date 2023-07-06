// @ts-check
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

/**
 * @param {Object} params
 * @param {typedefs.ColorScheme} params.currentTheme
 * @param {import("react-native").ColorSchemeName} params.colorScheme
 * @param {typedefs.ColorScheme} [params.defaultTheme]
 *
 * @returns {String}
 */
const getThemeName = ({
  currentTheme,
  colorScheme,
  defaultTheme = 'light', // TODO: Replace with environment variable (EXPO_PUBLIC_DEFAULT_THEME) after SDK upgrade
}) => {
  if (currentTheme) {
    return currentTheme
  } else if (colorScheme && ['dark', 'light'].includes(colorScheme)) {
    return colorScheme
  } else {
    return defaultTheme
  }
}

export { getThemeName }
