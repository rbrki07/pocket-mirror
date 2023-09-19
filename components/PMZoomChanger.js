// @ts-check
import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { PMButton } from './PMButton'
import { useTheme } from './../hooks/useTheme'
import {
  SETTING_KEY_CURRENT_ZOOM_LEVEL,
  currentZoomLevelSelector,
  updateSetting,
} from './../store/settings'
import {
  MIN_ZOOM_LEVEL,
  MAX_ZOOM_LEVEL,
  decreaseCurrentZoomLevel,
  increaseCurrentZoomLevel,
} from './../utils/ZoomUtil'

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
 * @param {Number} [params.maxZoomLevel]
 *
 * @returns {Boolean}
 */
const getIncreaseZoomLevelButtonDisabledState = ({
  currentZoomLevel,
  maxZoomLevel = MAX_ZOOM_LEVEL,
}) => currentZoomLevel >= maxZoomLevel

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
