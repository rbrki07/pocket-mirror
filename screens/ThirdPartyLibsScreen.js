// @ts-check
import { Ionicons } from '@expo/vector-icons'
import React, { useCallback, useLayoutEffect } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { PMLocaleAwareText } from './../components/PMLocaleAwareText'
import { useGlobalStyles } from './../hooks/useGlobalStyles'
import { useTheme } from './../hooks/useTheme'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'
import { THIRD_PARTY_LIBS_DETAIL_SCREEN_ROUTE } from './Routes'
import {
  I18N_KEY_SCREEN_THIRD_PARTY_LIBS_HEADER_TITLE,
  I18N_KEY_SCREEN_THIRD_PARTY_LIBS_INFO,
} from '../i18n/keys'

/**
 * @returns {Object} ThirdPartyLibsScreen
 */
const ThirdPartyLibsScreen = ({ navigation }) => {
  const theme = useTheme()
  const globalStyles = useGlobalStyles()
  const styles = mergedStyles(globalStyles)

  const renderLibItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.libItemContainer}
        onPress={() =>
          navigation.navigate(THIRD_PARTY_LIBS_DETAIL_SCREEN_ROUTE, { item })
        }
      >
        <Text style={styles.text}>{item.name}</Text>
        <Ionicons
          name="chevron-forward-outline"
          size={32}
          color={theme.iconColor}
        />
      </TouchableOpacity>
    ),
    [navigation, styles, theme]
  )

  const libListHeaderComponent = useCallback(
    () => (
      <View style={styles.listHeaderFooterComponent}>
        <PMLocaleAwareText i18nKey={I18N_KEY_SCREEN_THIRD_PARTY_LIBS_INFO} />
      </View>
    ),
    [styles]
  )

  const libItemSeparatorComponent = useCallback(
    () => <View style={styles.itemSeparatorComponent} />,
    [styles]
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <PMLocaleAwareText
          i18nKey={I18N_KEY_SCREEN_THIRD_PARTY_LIBS_HEADER_TITLE}
          style={styles.title}
        />
      ),
    })
  }, [navigation, styles])

  return (
    <View style={styles.container}>
      <FlatList
        data={require('./../assets/third-party-libs.json')}
        ListHeaderComponent={libListHeaderComponent}
        ItemSeparatorComponent={libItemSeparatorComponent}
        renderItem={renderLibItem}
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

export { ThirdPartyLibsScreen }
