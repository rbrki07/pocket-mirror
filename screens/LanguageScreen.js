// @ts-check
import { Ionicons } from '@expo/vector-icons'
import React, { useCallback, useLayoutEffect } from 'react'
import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { useGlobalStyles } from './../hooks/useGlobalStyles'
import { useTheme } from './../hooks/useTheme'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'
import { PMLocaleAwareText } from '../components/PMLocaleAwareText'
import {
  I18N_KEY_SCREEN_LANGUAGE_HEADER_TITLE,
  I18N_KEY_SCREEN_LANGUAGE_INFO,
} from '../i18n/keys'
import {
  SETTING_KEY_CURRENT_LANGUAGE_CODE,
  currentLanguageCodeSelector,
  updateSetting,
} from '../store/settings'

const MAIL = 'contact@rene-wilby.de'

/**
 * @returns {Object} LanguageScreen
 */
const LanguageScreen = ({ navigation }) => {
  const theme = useTheme()
  const globalStyles = useGlobalStyles()
  const styles = mergedStyles(globalStyles)
  const currentLanguageCode = useSelector(currentLanguageCodeSelector)
  const dispatch = useDispatch()

  const renderLanguageItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.libItemContainer}
        onPress={() => {
          dispatch(
            updateSetting({
              key: SETTING_KEY_CURRENT_LANGUAGE_CODE,
              value: item.code,
            })
          )
        }}
      >
        <Text
          style={[
            styles.text,
            currentLanguageCode === item.code && styles.title,
          ]}
        >
          {item.name}
        </Text>
        {currentLanguageCode === item.code && (
          <Ionicons
            name="checkmark-outline"
            size={32}
            color={theme.iconColor}
          />
        )}
      </TouchableOpacity>
    ),
    [currentLanguageCode, dispatch, styles, theme]
  )

  const languageListFooterComponent = useCallback(
    () => (
      <View style={styles.listHeaderFooterComponent}>
        <Text style={styles.text}>
          <PMLocaleAwareText i18nKey={I18N_KEY_SCREEN_LANGUAGE_INFO} />
          <Text>{': '}</Text>
          <Text
            onPress={() => Linking.openURL(`mailto:${MAIL}`)}
            style={styles.link}
          >
            {MAIL}
          </Text>
          <Text>.</Text>
        </Text>
      </View>
    ),
    [styles]
  )

  const languageItemSeparatorComponent = useCallback(
    () => <View style={styles.itemSeparatorComponent} />,
    [styles]
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <PMLocaleAwareText
          i18nKey={I18N_KEY_SCREEN_LANGUAGE_HEADER_TITLE}
          style={styles.title}
        />
      ),
    })
  }, [navigation, styles])

  return (
    <View style={styles.container}>
      <FlatList
        data={require('./../assets/languages.json')}
        ListFooterComponent={languageListFooterComponent}
        ItemSeparatorComponent={languageItemSeparatorComponent}
        renderItem={renderLanguageItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  )
}

/**
 * @param {typedefs.GlobalStyle} globalStyles
 *
 * @returns {Object}
 */
const mergedStyles = (globalStyles) =>
  StyleSheet.create({
    ...globalStyles,
    // eslint-disable-next-line react-native/no-unused-styles
    libItemContainer: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 4,
      minHeight: 48,
    },
  })

export { LanguageScreen }
