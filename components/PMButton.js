// @ts-check
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../hooks/useTheme'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

/**
 * @param {Object} params
 * @param {() => void} params.onPressCallback
 * @param {String} [params.iconName]
 * @param {Number} [params.iconSize]
 * @param {String} [params.title]
 * @param {Boolean} [params.selected]
 * @param {Boolean} [params.disabled]
 * @param {Number} [params.height]
 * @param {Number} [params.width]
 * @param {String} [params.testID]
 *
 * @returns {Object} PMButton
 */
const PMButton = ({
  onPressCallback,
  iconName = undefined,
  iconSize = 32,
  title = undefined,
  selected = false,
  disabled = false,
  height = 50,
  width = 50,
  testID,
}) => {
  const theme = useTheme()
  const styles = themedStyles(theme)
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPressCallback}
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        { borderWidth: selected ? 1 : 0, height, width },
      ]}
      testID={testID}
    >
      {iconName !== undefined && (
        <Ionicons
          // @ts-ignore
          name={iconName}
          size={iconSize}
          color={theme.iconColor}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ opacity: disabled ? 0.25 : 1.0 }}
          testID={`${testID}_${iconName}`}
        />
      )}
      {title !== undefined && <Text style={styles.title}>{title}</Text>}
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
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      margin: 8,
    },
    // eslint-disable-next-line react-native/no-unused-styles
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  })

export { PMButton }
