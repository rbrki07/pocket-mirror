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
 * @param {Boolean} [params.disabled]
 *
 * @returns {Object} PMButton
 */
const PMButton = ({
  onPressCallback,
  iconName,
  iconSize = 32,
  selected = false,
  disabled = false,
}) => {
  const theme = useTheme()
  const styles = themedStyles(theme)
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPressCallback}
      // eslint-disable-next-line react-native/no-inline-styles
      style={[styles.container, { borderWidth: selected ? 1 : 0 }]}
    >
      <Ionicons
        // @ts-ignore
        name={iconName}
        size={iconSize}
        color={theme.iconColor}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ opacity: disabled ? 0.25 : 1.0 }}
      />
    </TouchableOpacity>
  )
}

/**
 * @param {typedefs.Theme} currentTheme
 *
 * @returns {Object}
 */
const themedStyles = (currentTheme) =>
  StyleSheet.create({
    // eslint-disable-next-line react-native/no-unused-styles
    container: {
      alignItems: 'center',
      borderColor: currentTheme.borderColor,
      borderRadius: 8,
      borderStyle: 'dashed',
      height: 50,
      justifyContent: 'center',
      margin: 8,
      width: 50,
    },
  })

export { PMButton }
