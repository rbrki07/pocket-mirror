// @ts-check
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../hooks/useTheme'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

/**
 * @param {Object} params
 * @param {() => void} params.onPressCallback
 * @param {String} params.iconName
 * @param {Number} [params.iconSize]
 * @param {Boolean} [params.selected]
 *
 * @returns {Object} PMButton
 */
const PMButton = ({
  onPressCallback,
  iconName,
  iconSize = 32,
  selected = false,
}) => {
  const theme = useTheme()
  const styles = themedStyles(theme)
  return (
    <TouchableOpacity
      onPress={onPressCallback}
      // eslint-disable-next-line react-native/no-inline-styles
      style={[styles.container, { borderWidth: selected ? 2 : 1 }]}
    >
      <Ionicons
        // @ts-ignore
        name={iconName}
        size={iconSize}
        color={theme.iconColor}
      />
    </TouchableOpacity>
  )
}

/**
 * @param {typedefs.Theme} currentTheme
 */
const themedStyles = (currentTheme) =>
  StyleSheet.create({
    // eslint-disable-next-line react-native/no-unused-styles
    container: {
      alignItems: 'center',
      borderColor: currentTheme.borderColor,
      borderRadius: 8,
      borderStyle: 'dashed',
      borderWidth: 1,
      height: 64,
      justifyContent: 'center',
      margin: 8,
      width: 64,
    },
  })

export { PMButton }
