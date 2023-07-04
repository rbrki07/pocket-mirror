// @ts-check
import React, { useEffect } from 'react'
import { Linking, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Camera } from 'expo-camera'
import { StackActions } from '@react-navigation/native'
import { useTheme } from './../hooks/useTheme'
import { i18n } from '../i18n'
import {
  I18N_KEY_SCREEN_WELCOME_ACTIVATE_CAMERA_ADVICE,
  I18N_KEY_SCREEN_WELCOME_ACTIVATE_CAMERA_BUTTON,
  I18N_KEY_SCREEN_WELCOME_HEADLINE,
  I18N_KEY_SCREEN_WELCOME_OPEN_SETTINGS_ADVICE,
  I18N_KEY_SCREEN_WELCOME_OPEN_SETTINGS_BUTTON,
} from '../i18n/keys'
import { HOME_SCREEN_ROUTE } from './Routes'
import { PMLottieViewCameraPermission } from '../components/PMLottieViewCameraPermission'
import { PMButton } from '../components/PMButton'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

/**
 * @returns {Object} WelcomeScreen
 */
const WelcomeScreen = ({ navigation }) => {
  const theme = useTheme()
  const styles = themedStyles(theme)
  const [cameraPermissionStatus, requestCameraPermission] =
    Camera.useCameraPermissions()

  useEffect(() => {
    if (cameraPermissionStatus?.granted === true) {
      navigation.dispatch(StackActions.replace(HOME_SCREEN_ROUTE))
    }
  }, [cameraPermissionStatus, navigation])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {i18n.t(I18N_KEY_SCREEN_WELCOME_HEADLINE)}
      </Text>
      {cameraPermissionStatus?.granted === false &&
        cameraPermissionStatus.canAskAgain === true && (
          <>
            <Text style={styles.title}>
              {i18n.t(I18N_KEY_SCREEN_WELCOME_ACTIVATE_CAMERA_ADVICE)}
            </Text>
            <PMLottieViewCameraPermission />
            <PMButton
              onPressCallback={requestCameraPermission}
              title={i18n.t(I18N_KEY_SCREEN_WELCOME_ACTIVATE_CAMERA_BUTTON)}
              width={200}
              selected={true}
              testID={'requestCameraPermissionButton'}
            />
          </>
        )}
      {cameraPermissionStatus?.granted === false &&
        cameraPermissionStatus.canAskAgain === false && (
          <>
            <Text style={styles.title}>
              {i18n.t(I18N_KEY_SCREEN_WELCOME_OPEN_SETTINGS_ADVICE)}
            </Text>
            <PMLottieViewCameraPermission />
            <PMButton
              onPressCallback={Linking.openSettings}
              title={i18n.t(I18N_KEY_SCREEN_WELCOME_OPEN_SETTINGS_BUTTON)}
              width={200}
              selected={true}
              testID={'openSettingsButton'}
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
