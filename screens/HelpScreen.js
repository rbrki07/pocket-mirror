// @ts-check
import React, { useLayoutEffect } from 'react'
import { ScrollView } from 'react-native'
import { useGlobalStyles } from './../hooks/useGlobalStyles'
import { PMLocaleAwareText } from './../components/PMLocaleAwareText'
import {
  I18N_KEY_SCREEN_HELP_HEADER_TITLE,
  I18N_KEY_SCREEN_HELP_ZOOM,
  I18N_KEY_SCREEN_HELP_ZOOM_HEADLINE,
} from './../i18n/keys'

/**
 * @returns {Object} HelpScreen
 */
const HelpScreen = ({ navigation }) => {
  const styles = useGlobalStyles()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <PMLocaleAwareText
          i18nKey={I18N_KEY_SCREEN_HELP_HEADER_TITLE}
          style={styles.title}
        />
      ),
    })
  }, [navigation, styles])

  return (
    <ScrollView style={styles.container}>
      <PMLocaleAwareText
        i18nKey={I18N_KEY_SCREEN_HELP_ZOOM_HEADLINE}
        style={styles.title}
      />
      <PMLocaleAwareText i18nKey={I18N_KEY_SCREEN_HELP_ZOOM} />
    </ScrollView>
  )
}

export { HelpScreen }
