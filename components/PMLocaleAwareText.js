// @ts-check
import React from 'react'
import { Text } from 'react-native'
import { useSelector } from 'react-redux'

import { useGlobalStyles } from './../hooks/useGlobalStyles'
import { i18n } from './../i18n'
import { currentLanguageCodeSelector } from './../store/settings'

/**
 * @param {Object} params
 * @param {String} params.i18nKey
 * @param {Object} [params.style]
 *
 * @returns {Object} PMLocaleAwareText
 */
const PMLocaleAwareText = ({ i18nKey, style = {}, ...rest }) => {
  const styles = useGlobalStyles()
  const currentLanguageCode = useSelector(currentLanguageCodeSelector)

  if (currentLanguageCode) {
    i18n.locale = currentLanguageCode
  }

  return (
    <Text style={[styles.text, style]} {...rest}>
      {i18n.t(i18nKey)}
    </Text>
  )
}

export { PMLocaleAwareText }
