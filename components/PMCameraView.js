// @ts-check
import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, useWindowDimensions, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Camera, CameraType } from 'expo-camera'
import { useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { PMSetting } from './PMSetting'
import { PMButton } from './PMButton'
import {
  currentWhiteBalanceSelector,
  currentZoomLevelSelector,
} from './../store/settings'

/**
 * @returns {Object} PMCameraView
 */
const PMCameraView = () => {
  const [cameraPermissionResponse, requestCameraPermission] =
    Camera.useCameraPermissions()

  const currentWhiteBalance = useSelector(currentWhiteBalanceSelector)?.value
  const { height: currentDisplayHeight, width: currentDisplayWidth } =
    useWindowDimensions()
  const insets = useSafeAreaInsets()
  const topMenuHeight = 66
  const bottomMenuHeight = 66
  const cameraContainerHeight =
    currentDisplayHeight -
    insets.top -
    topMenuHeight -
    insets.bottom -
    bottomMenuHeight
  const cameraContainerWidth = currentDisplayWidth - 8
  const cameraHeight =
    currentDisplayHeight -
    insets.top -
    topMenuHeight -
    insets.bottom -
    bottomMenuHeight
  const [cameraWidth, setCameraWidth] = useState(currentDisplayWidth)

  const currentZoomLevel = useSelector(currentZoomLevelSelector)?.value || 0.0

  useEffect(() => {
    if (Platform.OS === 'android') {
      // Android's default camera ratio is '4:3'
      setCameraWidth((cameraHeight * 3) / 4)
    }
  }, [cameraHeight, cameraWidth, currentDisplayWidth])

  const isFocused = useIsFocused()

  return (
    <View
      style={[
        styles.container,
        {
          height: cameraContainerHeight,
          width: cameraContainerWidth,
        },
      ]}
    >
      {cameraPermissionResponse?.granted === true && isFocused && (
        <Camera
          style={{ height: cameraHeight, width: cameraWidth }}
          type={CameraType.front}
          useCamera2Api={false}
          whiteBalance={currentWhiteBalance}
          zoom={currentZoomLevel}
        />
      )}
      {cameraPermissionResponse?.granted !== true &&
        cameraPermissionResponse?.canAskAgain === true && (
          <View style={styles.placeholder}>
            <PMSetting title={'Front-Kamera aktivieren'}>
              <PMButton
                onPressCallback={requestCameraPermission}
                iconName={'camera-outline'}
              />
            </PMSetting>
          </View>
        )}
      {cameraPermissionResponse === null && <View style={styles.placeholder} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  placeholder: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
})

export { PMCameraView }
