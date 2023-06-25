// @ts-check
import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from './../hooks/useTheme'
import { i18n } from '../i18n'
import { I18N_KEY_SCREEN_ABOUT_HEADER_TITLE } from '../i18n/keys'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

/**
 * @returns {Object} AboutScreen
 */
const AboutScreen = ({ navigation }) => {
  const theme = useTheme()
  const styles = themedStyles(theme)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t(I18N_KEY_SCREEN_ABOUT_HEADER_TITLE),
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {i18n.t(I18N_KEY_SCREEN_ABOUT_HEADER_TITLE)}
      </Text>
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

export { AboutScreen }
