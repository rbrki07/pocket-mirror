// @ts-check
import React, { useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useGlobalStyles } from './../hooks/useGlobalStyles'
import { PMWhiteBalanceSelector } from './../components/PMWhiteBalanceSelector'
import { PMLocaleAwareText } from './../components/PMLocaleAwareText'
import {
  I18N_KEY_SCREEN_SETTING_HEADER_TITLE,
  I18N_KEY_SCREEN_SETTING_ITEM_WHITE_BALANCE,
} from './../i18n/keys'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

/**
 * @returns {Object} SettingScreen
 */
const SettingScreen = ({ navigation }) => {
  const globalStyles = useGlobalStyles()
  const styles = mergedStyles(globalStyles)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <PMLocaleAwareText
          i18nKey={I18N_KEY_SCREEN_SETTING_HEADER_TITLE}
          style={styles.title}
        />
      ),
    })
  }, [navigation, styles])

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <PMLocaleAwareText
          i18nKey={I18N_KEY_SCREEN_SETTING_ITEM_WHITE_BALANCE}
          style={styles.title}
        />
        <PMWhiteBalanceSelector />
      </View>
    </View>
  )
}

/**
 * @param {typedefs.GlobalStyle} globalStyles
 *
 * @returns {Object}
 */
const mergedStyles = (globalStyles) =>
  StyleSheet.create({
    ...globalStyles,
    // eslint-disable-next-line react-native/no-unused-styles
    row: {
      alignItems: 'center',
      height: 110,
      justifyContent: 'center',
    },
  })

export { SettingScreen }
