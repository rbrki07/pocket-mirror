// @ts-check
import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, useWindowDimensions, View } from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import { PMSetting } from './PMSetting'
import { PMButton } from './PMButton'
import { useSelector } from 'react-redux'
import { currentWhiteBalanceSelector } from '../store/settings'

/**
 * @returns {Object} PMCameraView
 */
const PMCameraView = () => {
  const [cameraPermissionResponse, requestCameraPermission] =
    Camera.useCameraPermissions()

  const currentWhiteBalance = useSelector(currentWhiteBalanceSelector)?.value
  const { width: currentDisplayWidth } = useWindowDimensions()
  const cameraContainerWidth = currentDisplayWidth
  const cameraContainerHeight = currentDisplayWidth
  const cameraWidth = currentDisplayWidth
  const [cameraHeight, setCameraHeight] = useState(currentDisplayWidth)

  useEffect(() => {
    if (Platform.OS === 'android') {
      // Android's default camera ration is '4:3'
      setCameraHeight((cameraWidth * 4) / 3)
    }
  }, [cameraWidth, currentDisplayWidth])

  return (
    <View
      style={[
        styles.container,
        { height: cameraContainerHeight, width: cameraContainerWidth },
      ]}
    >
      {cameraPermissionResponse?.granted === true && (
        <Camera
          style={{ height: cameraHeight, width: cameraWidth }}
          type={CameraType.front}
          useCamera2Api={false}
          whiteBalance={currentWhiteBalance}
        />
      )}
      {cameraPermissionResponse?.granted !== true &&
        cameraPermissionResponse?.canAskAgain === true && (
          <View style={styles.placeholder}>
            <PMSetting title={'Front-Kamera aktivieren'}>
              <PMButton
                onPressCallback={requestCameraPermission}
                iconName={'camera-outline'}
                selected={true}
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
