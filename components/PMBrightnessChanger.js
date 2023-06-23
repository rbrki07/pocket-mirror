// @ts-check
import React, { useCallback, useEffect, useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as Brightness from 'expo-brightness'
import { PMButton } from './PMButton'
import { useTheme } from './../hooks/useTheme'

/**
 * @param {Object} params
 * @param {Number} params.currentBrightness
 * @param {Number} [params.minBrightness]
 *
 * @returns {Boolean}
 */
const getDecreaseBrightnessButtonDisabledState = ({
  currentBrightness,
  minBrightness = 0.0,
}) => currentBrightness <= minBrightness

/**
 * @param {Object} params
 * @param {Number} params.currentBrightness
 * @param {Number} [params.minBrightness]
 *
 * @returns {Number}
 */
const decreaseCurrentBrightness = ({
  currentBrightness,
  minBrightness = 0.0,
}) => {
  if (currentBrightness > minBrightness) {
    return Math.round((currentBrightness - 0.1) * 10) / 10
  } else {
    return currentBrightness
  }
}

/**
 * @param {Object} params
 * @param {Number} params.currentBrightness
 * @param {Number} [params.maxBrightness]
 *
 * @returns {Boolean}
 */
const getIncreaseBrightnessButtonDisabledState = ({
  currentBrightness,
  maxBrightness = 1.0,
}) => currentBrightness >= maxBrightness

/**
 * @param {Object} params
 * @param {Number} params.currentBrightness
 * @param {Number} [params.maxBrightness]
 *
 * @returns {Number}
 */
const increaseCurrentBrightness = ({
  currentBrightness,
  maxBrightness = 1.0,
}) => {
  if (currentBrightness < maxBrightness) {
    return Math.round((currentBrightness + 0.1) * 10) / 10
  } else {
    return currentBrightness
  }
}

/**
 * @param {Object} params
 * @param {Brightness.PermissionResponse | null} params.brightnessPermissionResponse
 * @param {() => Promise<Brightness.PermissionResponse>} params.requestBrightnessPermission
 * @param {() => void} params.setBrightness
 *
 * @returns {void}
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
    Alert.alert(
      'Die App verfügt nicht über die erforderlichen Berechtigungen die Display-Helligkeit anzupassen.'
    )
  }
}

/**
 * @param {Object} params
 * @param {Number} [params.initialBrightness]
 * @returns {Object} PMBrightnessChanger
 */
const PMBrightnessChanger = ({ initialBrightness = 0.5 }) => {
  const theme = useTheme()

  const [brightnessPermissionResponse, requestBrightnessPermission] =
    Brightness.usePermissions()
  const [currentBrightness, setCurrentBrightness] = useState(initialBrightness)

  useEffect(() => {
    if (brightnessPermissionResponse?.granted === true) {
      Brightness.getBrightnessAsync().then(setCurrentBrightness)
    }
  }, [brightnessPermissionResponse])

  const decreaseBrightnessButtonOnPressCallback = useCallback(() => {
    checkBrightnessPermissionAndSet({
      brightnessPermissionResponse,
      requestBrightnessPermission,
      setBrightness: () => {
        const brightness = decreaseCurrentBrightness({
          currentBrightness,
        })
        Brightness.setBrightnessAsync(brightness).then(() =>
          setCurrentBrightness(brightness)
        )
      },
    })
  }, [
    brightnessPermissionResponse,
    requestBrightnessPermission,
    currentBrightness,
  ])

  const increaseBrightnessButtonOnPressCallback = useCallback(() => {
    checkBrightnessPermissionAndSet({
      brightnessPermissionResponse,
      requestBrightnessPermission,
      setBrightness: () => {
        const brightness = increaseCurrentBrightness({
          currentBrightness,
        })
        Brightness.setBrightnessAsync(brightness).then(() =>
          setCurrentBrightness(brightness)
        )
      },
    })
  }, [
    brightnessPermissionResponse,
    requestBrightnessPermission,
    currentBrightness,
  ])

  return (
    <View style={styles.container}>
      <PMButton
        onPressCallback={decreaseBrightnessButtonOnPressCallback}
        iconName={'remove-circle-outline'}
        disabled={getDecreaseBrightnessButtonDisabledState({
          currentBrightness,
        })}
        testID={'decreaseBrightnessButton'}
      />
      <Ionicons name={'bulb-outline'} size={32} color={theme.iconColor} />
      <PMButton
        onPressCallback={increaseBrightnessButtonOnPressCallback}
        iconName={'add-circle-outline'}
        disabled={getIncreaseBrightnessButtonDisabledState({
          currentBrightness,
        })}
        testID={'increaseBrightnessButton'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})

export { PMBrightnessChanger }
