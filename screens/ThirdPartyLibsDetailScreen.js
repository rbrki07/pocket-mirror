// @ts-check
import React, { useLayoutEffect } from 'react'
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

  return <WebView textZoom={250} source={{ uri }} />
}

export { ThirdPartyLibsDetailScreen }
