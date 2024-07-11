// @ts-check
import { StackActions } from '@react-navigation/native'
import { useCameraPermissions } from 'expo-camera'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { Linking, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { PMButton } from './../components/PMButton'
import { PMLocaleAwareText } from './../components/PMLocaleAwareText'
import { PMLottieViewCameraPermission } from './../components/PMLottieViewCameraPermission'
import { useTheme } from './../hooks/useTheme'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'
import { HOME_SCREEN_ROUTE } from './Routes'
import {
  I18N_KEY_SCREEN_WELCOME_ACTIVATE_CAMERA_ADVICE,
  I18N_KEY_SCREEN_WELCOME_ACTIVATE_CAMERA_BUTTON,
  I18N_KEY_SCREEN_WELCOME_HEADLINE,
  I18N_KEY_SCREEN_WELCOME_OPEN_SETTINGS_ADVICE,
  I18N_KEY_SCREEN_WELCOME_OPEN_SETTINGS_BUTTON,
} from '../i18n/keys'

/**
 * @returns {Object} WelcomeScreen
 */
const WelcomeScreen = ({ navigation }) => {
  const theme = useTheme()
  const styles = themedStyles(theme)
  const [cameraPermissionStatus, requestCameraPermission] =
    useCameraPermissions()

  useEffect(() => {
    if (cameraPermissionStatus?.granted === true) {
      navigation.dispatch(StackActions.replace(HOME_SCREEN_ROUTE))
    }
  }, [cameraPermissionStatus, navigation])

  return (
    <SafeAreaView style={styles.container}>
      <PMLocaleAwareText
        i18nKey={I18N_KEY_SCREEN_WELCOME_HEADLINE}
        style={styles.title}
      />
      {cameraPermissionStatus?.granted === false &&
        cameraPermissionStatus.canAskAgain === true && (
          <>
            <PMLocaleAwareText
              i18nKey={I18N_KEY_SCREEN_WELCOME_ACTIVATE_CAMERA_ADVICE}
              style={styles.title}
            />
            <PMLottieViewCameraPermission />
            <PMButton
              onPressCallback={requestCameraPermission}
              title={I18N_KEY_SCREEN_WELCOME_ACTIVATE_CAMERA_BUTTON}
              width={200}
              selected
              testID="requestCameraPermissionButton"
            />
          </>
        )}
      {cameraPermissionStatus?.granted === false &&
        cameraPermissionStatus.canAskAgain === false && (
          <>
            <PMLocaleAwareText
              i18nKey={I18N_KEY_SCREEN_WELCOME_OPEN_SETTINGS_ADVICE}
              style={styles.title}
            />
            <PMLottieViewCameraPermission />
            <PMButton
              onPressCallback={Linking.openSettings}
              title={I18N_KEY_SCREEN_WELCOME_OPEN_SETTINGS_BUTTON}
              width={200}
              selected
              testID="openSettingsButton"
            />
          </>
        )}
      <StatusBar style={theme.statusBarStyle} />
    </SafeAreaView>
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
      backgroundColor: currentTheme.backgroundColor,
      flex: 1,
      justifyContent: 'center',
    },
    // eslint-disable-next-line react-native/no-unused-styles
    title: {
      color: currentTheme.textColor,
      fontSize: 18,
      fontWeight: '900',
      lineHeight: 30,
      marginHorizontal: 16,
      textAlign: 'center',
    },
  })

export { WelcomeScreen }
