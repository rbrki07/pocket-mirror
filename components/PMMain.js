// @ts-check
import React, { useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { PMCameraView } from './../components/PMCameraView'
import { useTheme } from './../hooks/useTheme'
import { PMThemeSelector } from './../components/PMThemeSelector'
import { PMBrightnessChanger } from './../components/PMBrightnessChanger'
import { PMButton } from './../components/PMButton'
import { PMZoomChanger } from './PMZoomChanger'
import { PMSettingModal } from './PMSettingModal'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

/**
 * @returns {Object} PMMain
 */
const PMMain = () => {
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  const styles = themedStyles({ currentTheme: theme, insets })
  const [showSettingModal, setShowSettingModal] = useState(false)

  const settingButtonOnPressCallback = useCallback(() => {
    setShowSettingModal(true)
  }, [])

  const showSettingModalOnClose = useCallback(() => {
    setShowSettingModal(false)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.menu, styles.menuTop]}>
        <PMButton
          onPressCallback={settingButtonOnPressCallback}
          iconName={'settings-outline'}
        />
        <PMSettingModal
          show={showSettingModal}
          onClose={showSettingModalOnClose}
        />
        <PMZoomChanger />
      </View>
      <PMCameraView />
      <View style={[styles.menu, styles.menuBottom]}>
        <PMBrightnessChanger />
        <PMThemeSelector />
      </View>
      <StatusBar style={theme.statusBarStyle} />
    </SafeAreaView>
  )
}

/**
 * @param {Object} params
 * @param {typedefs.Theme} params.currentTheme
 * @param {import("react-native-safe-area-context").EdgeInsets} params.insets
 *
 * @returns {Object}
 */
const themedStyles = ({ currentTheme, insets }) =>
  StyleSheet.create({
    // eslint-disable-next-line react-native/no-unused-styles
    container: {
      alignItems: 'center',
      backgroundColor: currentTheme.backgroundColor,
      flex: 1,
      justifyContent: 'center',
    },
    // eslint-disable-next-line react-native/no-unused-styles
    menu: {
      flexDirection: 'row',
      width: '95%',
    },
    // eslint-disable-next-line react-native/no-unused-styles
    menuBottom: {
      alignItems: 'flex-end',
      bottom: insets.bottom,
      justifyContent: 'space-between',
      position: 'absolute',
    },
    // eslint-disable-next-line react-native/no-unused-styles
    menuTop: {
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      position: 'absolute',
      top: insets.top,
    },
  })

export { PMMain }
