// @ts-check
import React from 'react'
import { Text } from 'react-native'
import { useSelector } from 'react-redux'
import { currentLanguageCodeSelector } from './../store/settings'
import { i18n } from './../i18n'
import { useGlobalStyles } from './../hooks/useGlobalStyles'

/**
 * @param {Object} params
 * @param {String} params.i18nKey
 * @param {Object} [params.style]
 *
 * @returns {Object} PMLocaleAwareText
 */
const PMLocaleAwareText = ({ i18nKey, style = {} }) => {
  const styles = useGlobalStyles()
  const currentLanguageCode = useSelector(currentLanguageCodeSelector)

  if (currentLanguageCode) {
    i18n.locale = currentLanguageCode
  }

  return <Text style={[styles.text, style]}>{i18n.t(i18nKey)}</Text>
}

export { PMLocaleAwareText }
