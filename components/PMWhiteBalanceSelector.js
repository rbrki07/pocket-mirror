// @ts-check
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { WhiteBalance } from 'expo-camera'
import { useGlobalStyles } from './../hooks/useGlobalStyles'
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
  const globalStyles = useGlobalStyles()
  const styles = mergedStyles(globalStyles)

  const currentWhiteBalance = useSelector(currentWhiteBalanceSelector)
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
            testID={'whiteBalanceButton'}
          />
          <Text style={styles.text}>{entry.value}</Text>
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
