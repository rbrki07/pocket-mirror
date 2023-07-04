// @ts-check
import React, { useCallback, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Camera } from 'expo-camera'
import { StackActions } from '@react-navigation/native'
import { PMCameraView } from './../components/PMCameraView'
import { useTheme } from './../hooks/useTheme'
import { PMThemeSelector } from './../components/PMThemeSelector'
import { PMBrightnessChanger } from './../components/PMBrightnessChanger'
import { PMButton } from './../components/PMButton'
import { PMZoomChanger } from './../components/PMZoomChanger'
import { MENU_MODAL_ROUTE, WELCOME_SCREEN_ROUTE } from './Routes'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

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
          iconName={'menu-outline'}
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

export { HomeScreen }
