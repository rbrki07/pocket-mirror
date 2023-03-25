// @ts-check
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../hooks/useTheme'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

/**
 * @param {Object} params
 * @param {String} params.title
 * @param {Object} params.children
 */
const PMSetting = ({ title, children }) => {
  const theme = useTheme()
  const styles = themedStyles(theme)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.options}>{children}</View>
    </View>
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
      height: 110,
      justifyContent: 'center',
    },
    // eslint-disable-next-line react-native/no-unused-styles
    options: {
      flexDirection: 'row',
      height: 84,
    },
    // eslint-disable-next-line react-native/no-unused-styles
    title: {
      color: currentTheme.textColor,
      fontSize: 16,
    },
  })

export { PMSetting }
