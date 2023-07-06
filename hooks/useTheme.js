// @ts-check
import { useColorScheme } from 'react-native'
import { useSelector } from 'react-redux'
import { currentThemeSelector } from '../store/settings'
import { THEME } from '../style/theme'
import { getThemeName } from '../utils/ThemeUtil'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

/**
 * @returns {typedefs.Theme}
 */
const useTheme = () => {
  const colorScheme = useColorScheme()
  const currentTheme = useSelector(currentThemeSelector)
  return THEME[
    getThemeName({
      currentTheme: currentTheme?.value,
      colorScheme,
    })
  ]
}

export { useTheme }
