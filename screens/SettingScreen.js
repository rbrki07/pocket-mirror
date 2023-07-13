// @ts-check
import React, { useLayoutEffect } from 'react'
import { View } from 'react-native'
import { useGlobalStyles } from './../hooks/useGlobalStyles'
import { PMSetting } from './../components/PMSetting'
import { PMWhiteBalanceSelector } from './../components/PMWhiteBalanceSelector'
import { i18n } from '../i18n'
import {
  I18N_KEY_SCREEN_SETTING_HEADER_TITLE,
  I18N_KEY_SCREEN_SETTING_ITEM_WHITE_BALANCE,
} from '../i18n/keys'

/**
 * @returns {Object} SettingScreen
 */
const SettingScreen = ({ navigation }) => {
  const styles = useGlobalStyles()

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

export { SettingScreen }
