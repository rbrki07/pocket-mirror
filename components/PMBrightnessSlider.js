// @ts-check
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import * as Brightness from 'expo-brightness'
import Slider from '@react-native-community/slider'
import { useTheme } from '../hooks/useTheme'

/**
 * @param {Object} params
 * @param {Brightness.PermissionResponse | null} params.brightnessPermissionResponse
 * @param {() => Promise<Brightness.PermissionResponse>} params.requestBrightnessPermission
 * @param {() => void} params.setBrightness
 */
const checkBrightnessPermissionAndSet = ({
  brightnessPermissionResponse,
  requestBrightnessPermission,
  setBrightness,
}) => {
  if (brightnessPermissionResponse?.granted === true) {
    setBrightness()
  } else if (brightnessPermissionResponse?.canAskAgain === true) {
    Alert.alert(
      'Berechtigung erteilen',
      'Die App benötigt die Berechtigung die Display-Helligkeit anzupassen',
      [
        {
          text: 'Abbrechen',
          style: 'cancel',
        },
        {
          text: 'OK',
          style: 'default',
          onPress: () => {
            requestBrightnessPermission().then((response) => {
              if (response?.granted === true) {
                setBrightness()
              }
            })
          },
        },
      ]
    )
  } else if (brightnessPermissionResponse !== null) {
    alert(
      'Die verfügt nicht über die erforderlichen Berechtigungen die Display-Helligkeit anzupassen.'
    )
  }
}

/**
 * @returns {Object} PMBrightnessSlider
 */
const PMBrightnessSlider = () => {
  const theme = useTheme()

  const [brightnessPermissionResponse, requestBrightnessPermission] =
    Brightness.usePermissions()
  const [currentBrightness, setCurrentBrightness] = useState(0.5)

  useEffect(() => {
    if (brightnessPermissionResponse?.granted === true) {
      Brightness.getBrightnessAsync().then(setCurrentBrightness)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only once at startup

  return (
    <Slider
      style={styles.slider}
      minimumTrackTintColor={theme.textColor}
      thumbTintColor={theme.textColor}
      value={currentBrightness}
      minimumValue={0}
      maximumValue={1}
      step={0.1}
      onValueChange={(value) => {
        checkBrightnessPermissionAndSet({
          brightnessPermissionResponse,
          requestBrightnessPermission,
          setBrightness: () => {
            Brightness.setBrightnessAsync(value).then(() =>
              setCurrentBrightness(value)
            )
          },
        })
      }}
    />
  )
}

const styles = StyleSheet.create({
  slider: {
    height: 12,
    margin: 12,
    width: 256,
  },
})

export { PMBrightnessSlider }
