// @ts-check
import { WhiteBalance } from 'expo-camera'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { useGlobalStyles } from './../hooks/useGlobalStyles'
import {
  I18N_KEY_COMPONENT_PM_WHITE_BALANCE_SELECTOR_OPTION_AUTOMATIC,
  I18N_KEY_COMPONENT_PM_WHITE_BALANCE_SELECTOR_OPTION_CLOUDY,
  I18N_KEY_COMPONENT_PM_WHITE_BALANCE_SELECTOR_OPTION_SHADY,
  I18N_KEY_COMPONENT_PM_WHITE_BALANCE_SELECTOR_OPTION_SUNNY,
} from './../i18n/keys'
import {
  SETTING_KEY_CURRENT_WHITE_BALANCE,
  currentWhiteBalanceSelector,
  updateSetting,
} from './../store/settings'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'
import { PMButton } from './PMButton'
import { PMLocaleAwareText } from './PMLocaleAwareText'

/**
 * @returns {Object} PMWhiteBalanceSelector
 */
const PMWhiteBalanceSelector = () => {
  const globalStyles = useGlobalStyles()
  const styles = mergedStyles(globalStyles)

  const currentWhiteBalance = useSelector(currentWhiteBalanceSelector)
  const dispatch = useDispatch()

  const whiteBalanceValues = [
    {
      value: WhiteBalance.auto,
      icon: 'aperture',
      title: I18N_KEY_COMPONENT_PM_WHITE_BALANCE_SELECTOR_OPTION_AUTOMATIC,
    },
    {
      value: WhiteBalance.sunny,
      icon: 'sunny',
      title: I18N_KEY_COMPONENT_PM_WHITE_BALANCE_SELECTOR_OPTION_SUNNY,
    },
    {
      value: WhiteBalance.cloudy,
      icon: 'cloudy',
      title: I18N_KEY_COMPONENT_PM_WHITE_BALANCE_SELECTOR_OPTION_CLOUDY,
    },
    {
      value: WhiteBalance.shadow,
      icon: 'glasses',
      title: I18N_KEY_COMPONENT_PM_WHITE_BALANCE_SELECTOR_OPTION_SHADY,
    },
  ]

  return (
    <View style={styles.container}>
      {whiteBalanceValues.map((entry) => (
        <View key={entry.value} style={styles.entry}>
          <PMButton
            onPressCallback={() => {
              dispatch(
                updateSetting({
                  key: SETTING_KEY_CURRENT_WHITE_BALANCE,
                  value: entry.value,
                })
              )
            }}
            iconName={entry.icon}
            selected={entry.value === currentWhiteBalance}
            testID="whiteBalanceButton"
          />
          <PMLocaleAwareText
            i18nKey={entry.title}
            // @ts-ignore
            numberOfLines={1}
          />
        </View>
      ))}
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
    container: {
      flexDirection: 'row',
      height: 84,
    },
    // eslint-disable-next-line react-native/no-unused-styles
    entry: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'flex-start',
    },
  })

export { PMWhiteBalanceSelector }
