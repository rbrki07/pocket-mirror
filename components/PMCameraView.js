// @ts-check
import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, useWindowDimensions, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Camera, CameraType } from 'expo-camera'
import { useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import {
  currentWhiteBalanceSelector,
  currentZoomLevelSelector,
} from './../store/settings'

/**
 * @returns {Object} PMCameraView
 */
const PMCameraView = () => {
  const currentWhiteBalance = useSelector(currentWhiteBalanceSelector)
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

  const currentZoomLevel = useSelector(currentZoomLevelSelector) || 0.0

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
