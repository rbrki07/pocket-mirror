// @ts-check
import React, { useLayoutEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useTheme } from './../hooks/useTheme'
import { WebView } from 'react-native-webview'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

/**
 * @returns {Object} ThirdPartyLibsDetailScreen
 */
const ThirdPartyLibsDetailScreen = ({ route, navigation }) => {
  const theme = useTheme()
  const styles = themedStyles(theme)

  const { uri, license } = route.params.item

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: license,
    })
  }, [license, navigation])

  return <WebView textZoom={250} style={styles.container} source={{ uri }} />
}

/**
 * @param {typedefs.Theme} currentTheme
 *
 * @returns {Object}
 */
const themedStyles = (currentTheme) =>
  StyleSheet.create({
    // eslint-disable-next-line react-native/no-unused-styles
    container: {
      backgroundColor: currentTheme.backgroundColor,
      flex: 1,
    },
  })

export { ThirdPartyLibsDetailScreen }
