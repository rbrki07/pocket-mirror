// @ts-check
import { Platform, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from './useTheme'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

/**
 * @returns {import("react-native").StyleSheet.NamedStyles<typedefs.GlobalStyle>}
 */
const useGlobalStyles = () => {
  const theme = useTheme()
  const insets = useSafeAreaInsets()

  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      flex: 1,
      marginBottom: Platform.OS === 'ios' ? insets.bottom : 8,
      marginHorizontal: 8,
      marginTop: 8,
    },
    itemSeparatorComponent: {
      borderBottomColor: theme.borderColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    link: {
      textDecorationColor: theme.textColor,
      textDecorationLine: 'underline',
    },
    text: {
      color: theme.textColor,
      fontSize: 16,
      lineHeight: 22,
    },
    title: {
      color: theme.textColor,
      fontSize: 16,
      fontWeight: 'bold',
      lineHeight: 22,
      marginBottom: 4,
      marginTop: 8,
    },
  })
}

export { useGlobalStyles }
