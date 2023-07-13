// @ts-check
import React, { useLayoutEffect } from 'react'
import { Linking, ScrollView, Text, TouchableOpacity } from 'react-native'
import { useGlobalStyles } from './../hooks/useGlobalStyles'
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

const PHONE_NUMBER = '+4943153025887'
const MAIL = 'kontakt@rene-wilby.de'
const EU_ODR_URL = 'https://ec.europa.eu/consumers/odr/'

/**
 * @returns {Object} ImprintScreen
 */
const ImprintScreen = ({ navigation }) => {
  const styles = useGlobalStyles()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t(I18N_KEY_SCREEN_IMPRINT_HEADER_TITLE),
    })
  }, [navigation])

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {i18n.t(I18N_KEY_SCREEN_IMPRINT_RESPONSIBLE)}
      </Text>
      <Text style={styles.text}>{'René Wilby'}</Text>
      <Text style={styles.text}>{'Burbarg 15'}</Text>
      <Text style={styles.text}>{'24226 Heikendorf'}</Text>
      <Text style={styles.title}>
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
      <Text style={styles.title}>
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

export { ImprintScreen }
