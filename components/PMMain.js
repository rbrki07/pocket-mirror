// @ts-check
import React from 'react'
import { PMCameraView } from './PMCameraView'
import { PMSetting } from './PMSetting'
import { PMBrightnessSlider } from './PMBrightnessSlider'
import { useTheme } from '../hooks/useTheme'
import { StyleSheet } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { PMThemeSelector } from './PMThemeSelector'
import { PMWhiteBalanceSelector } from './PMWhiteBalanceSelector'

/**
 * @returns {Object} PMMain
 */
const PMMain = () => {
  const theme = useTheme()
  const styles = themedStyles(theme)

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <PMCameraView />
        <PMSetting title={'Modus'}>
          <PMThemeSelector />
        </PMSetting>
        <PMSetting title={'Weißabgleich'}>
          <PMWhiteBalanceSelector />
        </PMSetting>
        <PMSetting title={'Display-Helligkeit anpassen'}>
          <PMBrightnessSlider />
        </PMSetting>
        <StatusBar style={theme.statusBarStyle} />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const themedStyles = (currentTheme) =>
  StyleSheet.create({
    // eslint-disable-next-line react-native/no-unused-styles
    container: {
      alignItems: 'center',
      backgroundColor: currentTheme.backgroundColor,
      flex: 1,
      justifyContent: 'flex-start',
    },
  })

export { PMMain }
