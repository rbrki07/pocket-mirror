// @ts-check
import React, { useLayoutEffect } from 'react'
import { Linking, ScrollView, Text } from 'react-native'

import { PMLocaleAwareText } from './../components/PMLocaleAwareText'
import { useGlobalStyles } from './../hooks/useGlobalStyles'
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
const MAIL = 'contact@rene-wilby.de'
const EU_ODR_URL = 'https://ec.europa.eu/consumers/odr/'

/**
 * @returns {Object} ImprintScreen
 */
const ImprintScreen = ({ navigation }) => {
  const styles = useGlobalStyles()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <PMLocaleAwareText
          i18nKey={I18N_KEY_SCREEN_IMPRINT_HEADER_TITLE}
          style={styles.title}
        />
      ),
    })
  }, [navigation, styles])

  return (
    <ScrollView style={styles.container}>
      <PMLocaleAwareText
        i18nKey={I18N_KEY_SCREEN_IMPRINT_RESPONSIBLE}
        style={styles.title}
      />
      <Text style={styles.text}>René Wilby</Text>
      <Text style={styles.text}>Langer Rehm 19</Text>
      <Text style={styles.text}>24226 Heikendorf</Text>
      <PMLocaleAwareText
        i18nKey={I18N_KEY_SCREEN_IMPRINT_CONTACT}
        style={styles.title}
      />
      <Text style={styles.text}>
        <PMLocaleAwareText i18nKey={I18N_KEY_SCREEN_IMPRINT_PHONE} />
        <Text>{': '}</Text>
        <Text
          onPress={() => Linking.openURL(`tel:${PHONE_NUMBER}`)}
          style={styles.link}
        >
          {PHONE_NUMBER}
        </Text>
        <Text>.</Text>
      </Text>
      <Text style={styles.text}>
        <PMLocaleAwareText i18nKey={I18N_KEY_SCREEN_IMPRINT_MAIL} />
        <Text>{': '}</Text>
        <Text
          onPress={() => Linking.openURL(`mailto:${MAIL}`)}
          style={styles.link}
        >
          {MAIL}
        </Text>
        <Text>.</Text>
      </Text>
      <PMLocaleAwareText
        i18nKey={I18N_KEY_SCREEN_IMPRINT_DISPUTE_RESOLUTION}
        style={styles.title}
      />
      <Text style={styles.text}>
        <PMLocaleAwareText i18nKey={I18N_KEY_SCREEN_IMPRINT_ODR} />
        <Text>{': '}</Text>
        <Text onPress={() => Linking.openURL(EU_ODR_URL)} style={styles.link}>
          {EU_ODR_URL}
        </Text>
        <Text>.</Text>
      </Text>
    </ScrollView>
  )
}

export { ImprintScreen }
