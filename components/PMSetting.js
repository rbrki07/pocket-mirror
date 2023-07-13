// @ts-check
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useGlobalStyles } from './../hooks/useGlobalStyles'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

/**
 * @param {Object} params
 * @param {String} params.title
 * @param {Object} params.children
 *
 * @returns {Object} PMSetting
 */
const PMSetting = ({ title, children }) => {
  const globalStyles = useGlobalStyles()
  const styles = mergedStyles(globalStyles)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.options}>{children}</View>
    </View>
  )
}

/**
 * @param {typedefs.GlobalStyle} globalStyles
 *
 * @returns {Object}
 */
const mergedStyles = (globalStyles) =>
  StyleSheet.create({
    ...globalStyles,
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
  })

export { PMSetting }
