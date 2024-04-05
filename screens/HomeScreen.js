// @ts-check
import { StackActions } from '@react-navigation/native'
import { Camera } from 'expo-camera'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

import { PMBrightnessChanger } from './../components/PMBrightnessChanger'
import { PMButton } from './../components/PMButton'
import { PMCameraView } from './../components/PMCameraView'
import { PMThemeSelector } from './../components/PMThemeSelector'
import { PMZoomChanger } from './../components/PMZoomChanger'
import { useTheme } from './../hooks/useTheme'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'
import { MENU_MODAL_ROUTE, WELCOME_SCREEN_ROUTE } from './Routes'

/**
 * @returns {Object} HomeScreen
 */
const HomeScreen = ({ navigation }) => {
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  const styles = themedStyles({ currentTheme: theme, insets })
  const [cameraPermissionStatus] = Camera.useCameraPermissions()

  useEffect(() => {
    if (cameraPermissionStatus?.granted === false) {
      navigation.dispatch(StackActions.replace(WELCOME_SCREEN_ROUTE))
    }
  }, [cameraPermissionStatus, navigation])

  const menuButtonOnPressCallback = useCallback(() => {
    navigation.navigate(MENU_MODAL_ROUTE)
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.menu, styles.menuTop]}>
        <PMButton
          onPressCallback={menuButtonOnPressCallback}
          iconName="menu-outline"
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
    container: {
      alignItems: 'center',
      backgroundColor: currentTheme.backgroundColor,
      flex: 1,
      justifyContent: 'center',
    },
    menu: {
      flexDirection: 'row',
      width: '95%',
    },
    menuBottom: {
      alignItems: 'flex-end',
      bottom: insets.bottom,
      justifyContent: 'space-between',
      position: 'absolute',
    },
    menuTop: {
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      position: 'absolute',
      top: insets.top,
    },
  })

export { HomeScreen }
