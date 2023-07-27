// @ts-check
import { useEffect } from 'react'
import { Platform, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import {
  SETTING_KEY_CAMERA_CONTAINER_HEIGHT,
  SETTING_KEY_CAMERA_CONTAINER_WIDTH,
  SETTING_KEY_CAMERA_HEIGHT,
  SETTING_KEY_CAMERA_WIDTH,
  cameraContainerHeightSelector,
  cameraContainerWidthSelector,
  cameraHeightSelector,
  cameraWidthSelector,
  updateSetting,
} from '../store/settings'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

/**
 * @returns {typedefs.CameraDimensions}
 */
const useCameraDimensions = () => {
  const { height: currentDisplayHeight, width: currentDisplayWidth } =
    useWindowDimensions()
  const insets = useSafeAreaInsets()

  const cameraContainerHeight = useSelector(cameraContainerHeightSelector)
  const cameraContainerWidth = useSelector(cameraContainerWidthSelector)
  const cameraHeight = useSelector(cameraHeightSelector)
  const cameraWidth = useSelector(cameraWidthSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    if (
      cameraContainerHeight === undefined ||
      cameraContainerWidth === undefined ||
      cameraHeight === undefined ||
      cameraWidth === undefined
    ) {
      const topMenuHeight = 66
      const bottomMenuHeight = 66
      const newCameraContainerHeight =
        currentDisplayHeight -
        insets.top -
        topMenuHeight -
        insets.bottom -
        bottomMenuHeight -
        4
      const newCameraContainerWidth = currentDisplayWidth - 8
      const newCameraHeight = newCameraContainerHeight
      let newCameraWidth = newCameraContainerWidth
      if (Platform.OS === 'android') {
        // Android's default camera ratio is '4:3'
        newCameraWidth = (newCameraHeight * 3) / 4
      }
      // No need for `batch()`. React 18 automatically batches all state updates.
      dispatch(
        updateSetting({
          key: SETTING_KEY_CAMERA_CONTAINER_HEIGHT,
          value: newCameraContainerHeight,
        })
      )
      dispatch(
        updateSetting({
          key: SETTING_KEY_CAMERA_CONTAINER_WIDTH,
          value: newCameraContainerWidth,
        })
      )
      dispatch(
        updateSetting({
          key: SETTING_KEY_CAMERA_HEIGHT,
          value: newCameraHeight,
        })
      )
      dispatch(
        updateSetting({
          key: SETTING_KEY_CAMERA_WIDTH,
          value: newCameraWidth,
        })
      )
    }
  }, [
    cameraContainerHeight,
    cameraContainerWidth,
    cameraHeight,
    cameraWidth,
    currentDisplayHeight,
    currentDisplayWidth,
    dispatch,
    insets.bottom,
    insets.top,
  ])

  return {
    cameraContainerHeight: cameraContainerHeight || 0.0,
    cameraContainerWidth: cameraContainerWidth || 0.0,
    cameraHeight: cameraHeight || 0.0,
    cameraWidth: cameraWidth || 0.0,
  }
}

export { useCameraDimensions }
