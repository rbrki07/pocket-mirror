// @ts-check
import React, { useLayoutEffect } from 'react'
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { useTheme } from './../hooks/useTheme'
import { i18n } from '../i18n'
import {
  I18N_KEY_SCREEN_IMPRINT_CONTACT,
  I18N_KEY_SCREEN_IMPRINT_DISPUTE_RESOLUTION,
  I18N_KEY_SCREEN_IMPRINT_HEADER_TITLE,
  I18N_KEY_SCREEN_IMPRINT_MAIL,
  I18N_KEY_SCREEN_IMPRINT_ODR,
  I18N_KEY_SCREEN_IMPRINT_PHONE,
  I18N_KEY_SCREEN_IMPRINT_RESPONSIBLE,
} from '../i18n/keys'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

const PHONE_NUMBER = '+4943153025887'
const MAIL = 'kontakt@rene-wilby.de'
const EU_ODR_URL = 'https://ec.europa.eu/consumers/odr/'

/**
 * @returns {Object} ImprintScreen
 */
const ImprintScreen = ({ navigation }) => {
  const theme = useTheme()
  const styles = themedStyles(theme)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t(I18N_KEY_SCREEN_IMPRINT_HEADER_TITLE),
    })
  }, [navigation])

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.bold, styles.text]}>
        {i18n.t(I18N_KEY_SCREEN_IMPRINT_RESPONSIBLE)}
      </Text>
      <Text style={styles.text}>{'René Wilby'}</Text>
      <Text style={styles.text}>{'Burbarg 15'}</Text>
      <Text style={styles.text}>{'24226 Heikendorf'}</Text>
      <Text style={[styles.bold, styles.text]}>
        {i18n.t(I18N_KEY_SCREEN_IMPRINT_CONTACT)}
      </Text>
      <TouchableOpacity onPress={() => Linking.openURL(`tel:${PHONE_NUMBER}`)}>
        <Text style={styles.text}>
          <Text>{`${i18n.t(I18N_KEY_SCREEN_IMPRINT_PHONE)}: `}</Text>
          <Text style={styles.link}>{PHONE_NUMBER}</Text>
          <Text>{'.'}</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL(`mailto:${MAIL}`)}>
        <Text style={styles.text}>
          <Text>{`${i18n.t(I18N_KEY_SCREEN_IMPRINT_MAIL)}: `}</Text>
          <Text style={styles.link}>{MAIL}</Text>
          <Text>{'.'}</Text>
        </Text>
      </TouchableOpacity>
      <Text style={[styles.bold, styles.text]}>
        {i18n.t(I18N_KEY_SCREEN_IMPRINT_DISPUTE_RESOLUTION)}
      </Text>
      <TouchableOpacity onPress={() => Linking.openURL(EU_ODR_URL)}>
        <Text style={styles.text}>
          <Text>{`${i18n.t(I18N_KEY_SCREEN_IMPRINT_ODR)}: `}</Text>
          <Text style={styles.link}>{EU_ODR_URL}</Text>
          <Text>{'.'}</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
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
    bold: {
      fontWeight: 'bold',
      marginBottom: 4,
      marginTop: 12,
    },
    // eslint-disable-next-line react-native/no-unused-styles
    container: {
      backgroundColor: currentTheme.backgroundColor,
      flex: 1,
      margin: 8,
    },
    // eslint-disable-next-line react-native/no-unused-styles
    link: {
      textDecorationColor: currentTheme.textColor,
      textDecorationLine: 'underline',
    },
    // eslint-disable-next-line react-native/no-unused-styles
    text: {
      color: currentTheme.textColor,
      fontSize: 16,
      lineHeight: 24,
    },
  })

export { ImprintScreen }
