// @ts-check
import { Platform } from 'react-native'

const MIN_ZOOM_LEVEL = 0.0
const MAX_ZOOM_LEVEL = Platform.OS === 'android' ? 0.875 : 0.025
const ZOOM_LEVEL_STEP = Platform.OS === 'android' ? 0.175 : 0.005

/**
 * @param {Object} params
 * @param {Number} params.currentZoomLevel
 * @param {Number} [params.minZoomLevel]
 * @param {Number} [params.zoomLevelStep]
 *
 * @returns {Number}
 */
const decreaseCurrentZoomLevel = ({
  currentZoomLevel,
  zoomLevelStep = ZOOM_LEVEL_STEP,
}) => {
  const newZoomLevel =
    Math.round((currentZoomLevel - zoomLevelStep) * 1000) / 1000
  if (newZoomLevel > MAX_ZOOM_LEVEL) {
    return currentZoomLevel
  }
  if (newZoomLevel > MIN_ZOOM_LEVEL) {
    return newZoomLevel
  } else {
    return MIN_ZOOM_LEVEL
  }
}

/**
 * @param {Object} params
 * @param {Number} params.currentZoomLevel
 * @param {Number} [params.maxZoomLevel]
 * @param {Number} [params.zoomLevelStep]
 *
 * @returns {Number}
 */
const increaseCurrentZoomLevel = ({
  currentZoomLevel,
  zoomLevelStep = ZOOM_LEVEL_STEP,
}) => {
  const newZoomLevel =
    Math.round((currentZoomLevel + zoomLevelStep) * 1000) / 1000
  if (newZoomLevel < MIN_ZOOM_LEVEL) {
    return currentZoomLevel
  }
  if (newZoomLevel < MAX_ZOOM_LEVEL) {
    return newZoomLevel
  } else {
    return MAX_ZOOM_LEVEL
  }
}

export {
  MIN_ZOOM_LEVEL,
  MAX_ZOOM_LEVEL,
  ZOOM_LEVEL_STEP,
  decreaseCurrentZoomLevel,
  increaseCurrentZoomLevel,
}
