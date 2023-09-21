// @ts-check
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler'
import { runOnJS, useSharedValue } from 'react-native-reanimated'
import {
  SETTING_KEY_CURRENT_ZOOM_LEVEL,
  currentWhiteBalanceSelector,
  currentZoomLevelSelector,
  updateSetting,
} from './../store/settings'
import { useCameraDimensions } from './../hooks/useCameraDimensions'
import {
  decreaseCurrentZoomLevel,
  increaseCurrentZoomLevel,
} from './../utils/ZoomUtil'

const DECREASE_ZOOM_LEVEL_STEP_FACTOR =
  Platform.OS === 'android' ? -3.0 : -0.0005
const INCREASE_ZOOM_LEVEL_STEP_FACTOR = Platform.OS === 'android' ? 1.5 : 0.0001

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
  const [pinchZoomLevel, setPinchZoomLevel] = useState(0.0)
  const dispatch = useDispatch()
  const [cameraPermissionStatus] = Camera.useCameraPermissions()
  const isFocused = useIsFocused()

  useEffect(() => {
    setPinchZoomLevel(currentZoomLevel)
  }, [currentZoomLevel])

  const updateCurrentZoomLevel = useCallback(
    (newZoomLevel) => {
      dispatch(
        updateSetting({
          key: SETTING_KEY_CURRENT_ZOOM_LEVEL,
          value: newZoomLevel,
        })
      )
    },
    [dispatch]
  )

  const decreaseZoomLevelWrapper = useCallback(
    (zoomLevelStep) => {
      setPinchZoomLevel(
        decreaseCurrentZoomLevel({
          currentZoomLevel: pinchZoomLevel,
          zoomLevelStep,
        })
      )
    },
    [pinchZoomLevel]
  )

  const increaseZoomLevelWrapper = useCallback(
    (zoomLevelStep) => {
      setPinchZoomLevel(
        increaseCurrentZoomLevel({
          currentZoomLevel: pinchZoomLevel,
          zoomLevelStep,
        })
      )
    },
    [pinchZoomLevel]
  )

  const scale = useSharedValue(1)
  const gesture = useMemo(
    () =>
      Gesture.Pinch()
        .onUpdate((e) => {
          if (e.scale <= scale.value) {
            runOnJS(decreaseZoomLevelWrapper)(
              e.velocity * DECREASE_ZOOM_LEVEL_STEP_FACTOR
            )
          } else {
            runOnJS(increaseZoomLevelWrapper)(
              e.velocity * INCREASE_ZOOM_LEVEL_STEP_FACTOR
            )
          }
        })
        .onEnd(() => {
          scale.value = 1
          runOnJS(updateCurrentZoomLevel)(pinchZoomLevel)
        }),
    [
      decreaseZoomLevelWrapper,
      increaseZoomLevelWrapper,
      pinchZoomLevel,
      scale,
      updateCurrentZoomLevel,
    ]
  )

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
      {cameraPermissionStatus?.granted === true && isFocused === true && (
        <GestureHandlerRootView>
          <GestureDetector gesture={gesture}>
            <Camera
              style={{ height: cameraHeight, width: cameraWidth }}
              type={CameraType.front}
              useCamera2Api={false}
              whiteBalance={currentWhiteBalance}
              zoom={pinchZoomLevel}
              testID={'camera'}
            />
          </GestureDetector>
        </GestureHandlerRootView>
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
