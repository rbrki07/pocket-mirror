// @ts-check
import React, { useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from './../hooks/useTheme'
import { PMSetting } from './../components/PMSetting'
import { PMWhiteBalanceSelector } from './../components/PMWhiteBalanceSelector'
import { i18n } from '../i18n'
import {
  I18N_KEY_SCREEN_SETTING_HEADER_TITLE,
  I18N_KEY_SCREEN_SETTING_ITEM_WHITE_BALANCE,
} from '../i18n/keys'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

/**
 * @returns {Object} SettingScreen
 */
const SettingScreen = ({ navigation }) => {
  const theme = useTheme()
  const styles = themedStyles(theme)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t(I18N_KEY_SCREEN_SETTING_HEADER_TITLE),
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <PMSetting title={i18n.t(I18N_KEY_SCREEN_SETTING_ITEM_WHITE_BALANCE)}>
        <PMWhiteBalanceSelector />
      </PMSetting>
    </View>
  )
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

export { SettingScreen }
