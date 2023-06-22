// @ts-check
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { WhiteBalance } from 'expo-camera'
import { useTheme } from './../hooks/useTheme'
import { PMButton } from './PMButton'
import {
  SETTING_KEY_CURRENT_WHITE_BALANCE,
  currentWhiteBalanceSelector,
  updateSetting,
} from './../store/settings'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

/**
 * @returns {Object} PMWhiteBalanceSelector
 */
const PMWhiteBalanceSelector = () => {
  const theme = useTheme()
  const styles = themedStyles(theme)
  const currentWhiteBalance = useSelector(currentWhiteBalanceSelector)?.value
  const dispatch = useDispatch()

  const whiteBalanceValues = [
    {
      value: WhiteBalance.auto,
      icon: 'ios-aperture',
    },
    {
      value: WhiteBalance.sunny,
      icon: 'sunny',
    },
    {
      value: WhiteBalance.cloudy,
      icon: 'cloudy',
    },
    {
      value: WhiteBalance.shadow,
      icon: 'ios-bulb',
    },
  ]

  return (
    <>
      {whiteBalanceValues.map((entry) => (
        <View key={entry.value} style={styles.container}>
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
            testID={'whiteBalanceButton'}
          />
          <Text style={styles.text}>{entry.value}</Text>
        </View>
      ))}
    </>
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
      alignItems: 'center',
      flex: 1,
      justifyContent: 'flex-start',
    },
    // eslint-disable-next-line react-native/no-unused-styles
    text: {
      color: currentTheme.textColor,
    },
  })

export { PMWhiteBalanceSelector }
