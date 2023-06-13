// @ts-check
import React, { useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from './../hooks/useTheme'
import { PMSetting } from './../components/PMSetting'
import { PMWhiteBalanceSelector } from './../components/PMWhiteBalanceSelector'
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
      headerTitle: 'Einstellungen',
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <PMSetting title={'Weißabgleich'}>
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
