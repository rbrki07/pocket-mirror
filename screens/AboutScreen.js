// @ts-check
import React, { useLayoutEffect } from 'react'
import { Linking, ScrollView, Text } from 'react-native'
import Constants from 'expo-constants'
import { useGlobalStyles } from './../hooks/useGlobalStyles'
import { PMLocaleAwareText } from './../components/PMLocaleAwareText'
import {
  I18N_KEY_SCREEN_ABOUT_HEADER_TITLE,
  I18N_KEY_SCREEN_ABOUT_VERSION,
} from '../i18n/keys'

const SOURCE_CODE_URL = 'https://github.com/rbrki07/pocket-mirror'

/**
 * @returns {Object} AboutScreen
 */
const AboutScreen = ({ navigation }) => {
  const styles = useGlobalStyles()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <PMLocaleAwareText
          i18nKey={I18N_KEY_SCREEN_ABOUT_HEADER_TITLE}
          style={styles.title}
        />
      ),
    })
  }, [navigation, styles])

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        <PMLocaleAwareText i18nKey={I18N_KEY_SCREEN_ABOUT_VERSION} />
        <Text>{`: ${Constants.expoConfig?.version}`}</Text>
      </Text>
      <Text style={styles.title}>{'MIT License'}</Text>
      <Text style={styles.title}>{'Copyright (c) 2023 René Wilby'}</Text>
      <Text style={styles.text}>
        {
          'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:'
        }
      </Text>
      <Text style={styles.text}>{''}</Text>
      <Text style={styles.text}>
        {
          'The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.'
        }
      </Text>
      <Text style={styles.text}>{''}</Text>
      <Text style={styles.text}>
        {
          'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.'
        }
      </Text>
      <Text style={styles.title}>{'Source code'}</Text>
      <Text
        onPress={() => Linking.openURL(SOURCE_CODE_URL)}
        style={styles.text}
      >
        {SOURCE_CODE_URL}
      </Text>
    </ScrollView>
  )
}

export { AboutScreen }
