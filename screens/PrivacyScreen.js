// @ts-check
import React, { useLayoutEffect } from 'react'
import { Linking, ScrollView, Text } from 'react-native'

import { PMLocaleAwareText } from './../components/PMLocaleAwareText'
import { useGlobalStyles } from './../hooks/useGlobalStyles'
import {
  I18N_KEY_SCREEN_PRIVACY_GENERAL,
  I18N_KEY_SCREEN_PRIVACY_GENERAL_HEADLINE,
  I18N_KEY_SCREEN_PRIVACY_HEADER_TITLE,
  I18N_KEY_SCREEN_PRIVACY_OTHER_DATA_DOWNLOAD,
  I18N_KEY_SCREEN_PRIVACY_OTHER_DATA_DOWNLOAD_HEADLINE,
  I18N_KEY_SCREEN_PRIVACY_OTHER_DATA_HEADLINE,
  I18N_KEY_SCREEN_PRIVACY_OTHER_DATA_LICENSE,
  I18N_KEY_SCREEN_PRIVACY_OTHER_DATA_LICENSE_HEADLINE,
  I18N_KEY_SCREEN_PRIVACY_OTHER_DATA_UPDATES,
  I18N_KEY_SCREEN_PRIVACY_OTHER_DATA_UPDATES_HEADLINE,
  I18N_KEY_SCREEN_PRIVACY_PERSONAL_DATA,
  I18N_KEY_SCREEN_PRIVACY_PERSONAL_DATA_HEADLINE,
  I18N_KEY_SCREEN_PRIVACY_QUESTIONS,
  I18N_KEY_SCREEN_PRIVACY_QUESTIONS_HEADLINE,
  I18N_KEY_SCREEN_PRIVACY_RESPONSIBLE,
  I18N_KEY_SCREEN_PRIVACY_USAGE_DESCRIPTION,
  I18N_KEY_SCREEN_PRIVACY_USAGE_DESCRIPTION_HEADLINE,
} from './../i18n/keys'

const EXPO_URL = 'https://expo.dev'
const GITHUB_URL = 'https://github.com'
const MAIL = 'contakt@rene-wilby.de'

/**
 * @returns {Object} PrivacyScreen
 */
const PrivacyScreen = ({ navigation }) => {
  const styles = useGlobalStyles()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <PMLocaleAwareText
          i18nKey={I18N_KEY_SCREEN_PRIVACY_HEADER_TITLE}
          style={styles.title}
        />
      ),
    })
  }, [navigation, styles])

  return (
    <ScrollView style={styles.container}>
      <PMLocaleAwareText
        i18nKey={I18N_KEY_SCREEN_PRIVACY_GENERAL_HEADLINE}
        style={styles.title}
      />
      <PMLocaleAwareText i18nKey={I18N_KEY_SCREEN_PRIVACY_GENERAL} />
      <PMLocaleAwareText i18nKey={I18N_KEY_SCREEN_PRIVACY_RESPONSIBLE} />
      <Text style={styles.text}>René Wilby</Text>
      <Text style={styles.text}>Langer Rehm 19</Text>
      <Text style={styles.text}>24226 Heikendorf</Text>
      <PMLocaleAwareText
        i18nKey={I18N_KEY_SCREEN_PRIVACY_USAGE_DESCRIPTION_HEADLINE}
        style={styles.title}
      />
      <PMLocaleAwareText i18nKey={I18N_KEY_SCREEN_PRIVACY_USAGE_DESCRIPTION} />
      <PMLocaleAwareText
        i18nKey={I18N_KEY_SCREEN_PRIVACY_PERSONAL_DATA_HEADLINE}
        style={styles.title}
      />
      <PMLocaleAwareText i18nKey={I18N_KEY_SCREEN_PRIVACY_PERSONAL_DATA} />
      <PMLocaleAwareText
        i18nKey={I18N_KEY_SCREEN_PRIVACY_OTHER_DATA_HEADLINE}
        style={styles.title}
      />
      <PMLocaleAwareText
        i18nKey={I18N_KEY_SCREEN_PRIVACY_OTHER_DATA_DOWNLOAD_HEADLINE}
        style={styles.title}
      />
      <PMLocaleAwareText
        i18nKey={I18N_KEY_SCREEN_PRIVACY_OTHER_DATA_DOWNLOAD}
      />
      <PMLocaleAwareText
        i18nKey={I18N_KEY_SCREEN_PRIVACY_OTHER_DATA_UPDATES_HEADLINE}
        style={styles.title}
      />
      <Text style={styles.text}>
        <PMLocaleAwareText
          i18nKey={I18N_KEY_SCREEN_PRIVACY_OTHER_DATA_UPDATES}
        />
        <Text>{': '}</Text>
        <Text onPress={() => Linking.openURL(EXPO_URL)} style={styles.link}>
          {EXPO_URL}
        </Text>
        <Text>.</Text>
      </Text>
      <PMLocaleAwareText
        i18nKey={I18N_KEY_SCREEN_PRIVACY_OTHER_DATA_LICENSE_HEADLINE}
        style={styles.title}
      />
      <Text style={styles.text}>
        <PMLocaleAwareText
          i18nKey={I18N_KEY_SCREEN_PRIVACY_OTHER_DATA_LICENSE}
        />
        <Text>{': '}</Text>
        <Text onPress={() => Linking.openURL(GITHUB_URL)} style={styles.link}>
          {GITHUB_URL}
        </Text>
        <Text>.</Text>
      </Text>
      <PMLocaleAwareText
        i18nKey={I18N_KEY_SCREEN_PRIVACY_QUESTIONS_HEADLINE}
        style={styles.title}
      />
      <Text style={styles.text}>
        <PMLocaleAwareText i18nKey={I18N_KEY_SCREEN_PRIVACY_QUESTIONS} />
        <Text>{': '}</Text>
        <Text
          onPress={() => Linking.openURL(`mailto:${MAIL}`)}
          style={styles.link}
        >
          {MAIL}
        </Text>
        <Text>.</Text>
      </Text>
    </ScrollView>
  )
}

export { PrivacyScreen }
