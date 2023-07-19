// @ts-check
import React, { useLayoutEffect } from 'react'
import { View } from 'react-native'
import { useGlobalStyles } from './../hooks/useGlobalStyles'
import { PMLocaleAwareText } from './../components/PMLocaleAwareText'
import { I18N_KEY_SCREEN_PRIVACY_HEADER_TITLE } from '../i18n/keys'

/**
 * @returns {Object} PrivacyScreen
 */
const PrivacyScreen = ({ navigation }) => {
  const styles = useGlobalStyles()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <PMLocaleAwareText
          i18nKey={I18N_KEY_SCREEN_PRIVACY_HEADER_TITLE}
          style={styles.title}
        />
      ),
    })
  }, [navigation, styles])

  return (
    <View style={styles.container}>
      <PMLocaleAwareText
        i18nKey={I18N_KEY_SCREEN_PRIVACY_HEADER_TITLE}
        style={styles.title}
      />
    </View>
  )
}

export { PrivacyScreen }
