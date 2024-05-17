// @ts-check
import { useIsFocused } from '@react-navigation/native'
import { CameraView, useCameraPermissions } from 'expo-camera'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler'
import { runOnJS, useSharedValue } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'

import { useCameraDimensions } from './../hooks/useCameraDimensions'
import {
  SETTING_KEY_CURRENT_ZOOM_LEVEL,
  currentZoomLevelSelector,
  updateSetting,
} from './../store/settings'
import {
  MAX_ZOOM_LEVEL,
  ZOOM_LEVEL_STEP,
  decreaseCurrentZoomLevel,
  increaseCurrentZoomLevel,
} from './../utils/ZoomUtil'

const DECREASE_ZOOM_LEVEL_STEP_FACTOR =
  Platform.OS === 'android' ? -6.0 : -0.0005
const INCREASE_ZOOM_LEVEL_STEP_FACTOR = Platform.OS === 'android' ? 3.0 : 0.0001

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
  const currentZoomLevel = useSelector(currentZoomLevelSelector) || 0.0
  const [zoomLevel, setZoomLevel] = useState(0.0)
  const dispatch = useDispatch()
  const [cameraPermissionStatus] = useCameraPermissions()
  const isFocused = useIsFocused()

  useEffect(() => {
    setZoomLevel(currentZoomLevel)
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
      setZoomLevel(
        decreaseCurrentZoomLevel({
          currentZoomLevel: zoomLevel,
          zoomLevelStep,
        })
      )
    },
    [zoomLevel]
  )

  const increaseZoomLevelWrapper = useCallback(
    (zoomLevelStep) => {
      setZoomLevel(
        increaseCurrentZoomLevel({
          currentZoomLevel: zoomLevel,
          zoomLevelStep,
        })
      )
    },
    [zoomLevel]
  )

  const scale = useSharedValue(1)
  // TODO fix gesture handler on iOS
  const panGesture = useMemo(
    () =>
      Gesture.Pinch()
        .onUpdate((e) => {
          console.log('panGesture > onUpdate')
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
          console.log('panGesture > onEnd')
          scale.value = 1
          runOnJS(updateCurrentZoomLevel)(zoomLevel)
        }),
    [
      decreaseZoomLevelWrapper,
      increaseZoomLevelWrapper,
      zoomLevel,
      scale,
      updateCurrentZoomLevel,
    ]
  )

  const doubleTapGesture = useMemo(
    () =>
      Gesture.Tap()
        .numberOfTaps(2)
        .maxDuration(250)
        .onStart(() => {
          console.log('doubleTapGesture > onStart')
          runOnJS(increaseZoomLevelWrapper)(ZOOM_LEVEL_STEP)
        }),
    [increaseZoomLevelWrapper]
  )

  const longPressGesture = useMemo(
    () =>
      Gesture.LongPress()
        .minDuration(750)
        .onStart(() => {
          console.log('longPressGesture > onStart')
          runOnJS(decreaseZoomLevelWrapper)(MAX_ZOOM_LEVEL)
        }),
    [decreaseZoomLevelWrapper]
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
      testID="cameraContainer"
    >
      {cameraPermissionStatus?.granted === true && isFocused === true && (
        <GestureHandlerRootView>
          <GestureDetector
            gesture={Gesture.Race(
              panGesture,
              doubleTapGesture,
              longPressGesture
            )}
          >
            <CameraView
              style={{ height: cameraHeight, width: cameraWidth }}
              facing="front"
              zoom={zoomLevel}
              testID="camera"
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
