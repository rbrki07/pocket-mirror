// @ts-check
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import { useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import {
  currentWhiteBalanceSelector,
  currentZoomLevelSelector,
} from './../store/settings'
import { useCameraDimensions } from '../hooks/useCameraDimensions'

/**
 * @returns {Object} PMCameraView
 */
const PMCameraView = () => {
  const {
    cameraContainerHeight,
    cameraContainerWidth,
    cameraHeight,
    cameraWidth,
  } = useCameraDimensions()
  const currentWhiteBalance = useSelector(currentWhiteBalanceSelector)
  const currentZoomLevel = useSelector(currentZoomLevelSelector) || 0.0
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
      testID={'cameraContainer'}
    >
      {isFocused === true && (
        <Camera
          style={{ height: cameraHeight, width: cameraWidth }}
          type={CameraType.front}
          useCamera2Api={false}
          whiteBalance={currentWhiteBalance}
          zoom={currentZoomLevel}
          testID={'camera'}
        />
      )}
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
})

export { PMCameraView }
