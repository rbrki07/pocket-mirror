// @ts-check
import React, { useCallback } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { PMButton } from './PMButton'
import { useTheme } from './../hooks/useTheme'
import {
  SETTING_KEY_CURRENT_ZOOM_LEVEL,
  currentZoomLevelSelector,
  updateSetting,
} from './../store/settings'

const MIN_ZOOM_LEVEL = 0.0
const MAX_ZOOM_LEVEL = Platform.OS === 'android' ? 0.5 : 0.05
const ZOOM_LEVEL_STEP = Platform.OS === 'android' ? 0.1 : 0.01

/**
 * @param {Object} params
 * @param {Number} params.currentZoomLevel
 * @param {Number} [params.minZoomLevel]
 *
 * @returns {Boolean}
 */
const getDecreaseZoomLevelButtonDisabledState = ({
  currentZoomLevel,
  minZoomLevel = MIN_ZOOM_LEVEL,
}) => currentZoomLevel <= minZoomLevel

/**
 * @param {Object} params
 * @param {Number} params.currentZoomLevel
 * @param {Number} [params.minZoomLevel]
 *
 * @returns {Number}
 */
const decreaseCurrentZoomLevel = ({
  currentZoomLevel,
  minZoomLevel = MIN_ZOOM_LEVEL,
}) => {
  if (currentZoomLevel > minZoomLevel) {
    return Math.round((currentZoomLevel - ZOOM_LEVEL_STEP) * 100) / 100
  } else {
    return currentZoomLevel
  }
}

/**
 * @param {Object} params
 * @param {Number} params.currentZoomLevel
 * @param {Number} [params.maxZoomLevel]
 *
 * @returns {Boolean}
 */
const getIncreaseZoomLevelButtonDisabledState = ({
  currentZoomLevel,
  maxZoomLevel = MAX_ZOOM_LEVEL,
}) => currentZoomLevel >= maxZoomLevel

/**
 * @param {Object} params
 * @param {Number} params.currentZoomLevel
 * @param {Number} [params.maxZoomLevel]
 *
 * @returns {Number}
 */
const increaseCurrentZoomLevel = ({
  currentZoomLevel,
  maxZoomLevel = MAX_ZOOM_LEVEL,
}) => {
  if (currentZoomLevel < maxZoomLevel) {
    return Math.round((currentZoomLevel + ZOOM_LEVEL_STEP) * 100) / 100
  } else {
    return currentZoomLevel
  }
}

/**
 * @returns {Object} PMZoomChanger
 */
const PMZoomChanger = () => {
  const theme = useTheme()
  const currentZoomLevel =
    useSelector(currentZoomLevelSelector) || MIN_ZOOM_LEVEL
  const dispatch = useDispatch()

  const decreaseZoomLevelButtonOnPressCallback = useCallback(() => {
    dispatch(
      updateSetting({
        key: SETTING_KEY_CURRENT_ZOOM_LEVEL,
        value: decreaseCurrentZoomLevel({ currentZoomLevel }),
      })
    )
  }, [currentZoomLevel, dispatch])

  const increaseZoomLevelButtonOnPressCallback = useCallback(() => {
    dispatch(
      updateSetting({
        key: SETTING_KEY_CURRENT_ZOOM_LEVEL,
        value: increaseCurrentZoomLevel({ currentZoomLevel }),
      })
    )
  }, [currentZoomLevel, dispatch])

  return (
    <View style={styles.container}>
      <PMButton
        onPressCallback={decreaseZoomLevelButtonOnPressCallback}
        iconName={'remove-circle-outline'}
        disabled={getDecreaseZoomLevelButtonDisabledState({ currentZoomLevel })}
        testID={'decreaseZoomLevelButton'}
      />
      <Ionicons name={'search-outline'} size={32} color={theme.iconColor} />
      <PMButton
        onPressCallback={increaseZoomLevelButtonOnPressCallback}
        iconName={'add-circle-outline'}
        disabled={getIncreaseZoomLevelButtonDisabledState({ currentZoomLevel })}
        testID={'increaseZoomLevelButton'}
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

export { PMZoomChanger }
