// @ts-check
import React, { useLayoutEffect } from 'react'
import { Text, View } from 'react-native'
import { useGlobalStyles } from './../hooks/useGlobalStyles'
import { i18n } from '../i18n'
import { I18N_KEY_SCREEN_PRIVACY_HEADER_TITLE } from '../i18n/keys'

/**
 * @returns {Object} PrivacyScreen
 */
const PrivacyScreen = ({ navigation }) => {
  const styles = useGlobalStyles()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t(I18N_KEY_SCREEN_PRIVACY_HEADER_TITLE),
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {i18n.t(I18N_KEY_SCREEN_PRIVACY_HEADER_TITLE)}
      </Text>
    </View>
  )
}

export { PrivacyScreen }
