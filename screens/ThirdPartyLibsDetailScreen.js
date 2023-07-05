// @ts-check
import React, { useLayoutEffect } from 'react'
import { StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'

/**
 * @returns {Object} ThirdPartyLibsDetailScreen
 */
const ThirdPartyLibsDetailScreen = ({ route, navigation }) => {
  const { uri, license } = route.params.item

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: license,
    })
  }, [license, navigation])

  return <WebView textZoom={250} style={styles.container} source={{ uri }} />
}

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  container: {
    flex: 1,
  },
})

export { ThirdPartyLibsDetailScreen }
