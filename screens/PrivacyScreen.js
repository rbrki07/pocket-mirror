// @ts-check
import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from './../hooks/useTheme'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

/**
 * @returns {Object} PrivacyScreen
 */
const PrivacyScreen = ({ navigation }) => {
  const theme = useTheme()
  const styles = themedStyles(theme)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Datenschutz',
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'Datenschutz'}</Text>
    </View>
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
      backgroundColor: currentTheme.backgroundColor,
      flex: 1,
      justifyContent: 'center',
    },
    // eslint-disable-next-line react-native/no-unused-styles
    text: {
      color: currentTheme.textColor,
    },
  })

export { PrivacyScreen }
