// @ts-check
import React, { useLayoutEffect } from 'react'
import { ScrollView, Text } from 'react-native'
import Constants from 'expo-constants'
import { useGlobalStyles } from './../hooks/useGlobalStyles'
import { i18n } from '../i18n'
import {
  I18N_KEY_SCREEN_ABOUT_HEADER_TITLE,
  I18N_KEY_SCREEN_ABOUT_VERSION,
} from '../i18n/keys'

/**
 * @returns {Object} AboutScreen
 */
const AboutScreen = ({ navigation }) => {
  const styles = useGlobalStyles()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t(I18N_KEY_SCREEN_ABOUT_HEADER_TITLE),
    })
  }, [navigation])

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{`${i18n.t(I18N_KEY_SCREEN_ABOUT_VERSION)}: ${
        Constants.expoConfig?.version
      }`}</Text>
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
    </ScrollView>
  )
}

export { AboutScreen }
