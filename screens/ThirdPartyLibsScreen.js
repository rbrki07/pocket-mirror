// @ts-check
import React, { useCallback, useLayoutEffect } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useTheme } from './../hooks/useTheme'
import { i18n } from '../i18n'
import {
  I18N_KEY_SCREEN_THIRD_PARTY_LIBS_HEADER_TITLE,
  I18N_KEY_SCREEN_THIRD_PARTY_LIBS_INFO,
} from '../i18n/keys'
import { THIRD_PARTY_LIBS_DETAIL_SCREEN_ROUTE } from './Routes'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

/**
 * @returns {Object} ThirdPartyLibsScreen
 */
const ThirdPartyLibsScreen = ({ navigation }) => {
  const theme = useTheme()
  const styles = themedStyles(theme)

  const renderLibItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.libItemContainer}
        onPress={() =>
          navigation.navigate(THIRD_PARTY_LIBS_DETAIL_SCREEN_ROUTE, { item })
        }
      >
        <Text style={styles.libItemText}>{item.name}</Text>
      </TouchableOpacity>
    ),
    [navigation, styles]
  )

  const libListHeaderComponent = useCallback(
    () => (
      <View style={styles.libListHeaderComponent}>
        <Text style={styles.text}>
          {i18n.t(I18N_KEY_SCREEN_THIRD_PARTY_LIBS_INFO)}
        </Text>
      </View>
    ),
    [styles]
  )

  const libItemSeparatorComponent = useCallback(
    () => <View style={styles.libItemSeparatorComponent} />,
    [styles]
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t(I18N_KEY_SCREEN_THIRD_PARTY_LIBS_HEADER_TITLE),
    })
  }, [navigation])

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
 * @param {typedefs.Theme} currentTheme
 *
 * @returns {Object}
 */
const themedStyles = (currentTheme) =>
  StyleSheet.create({
    // eslint-disable-next-line react-native/no-unused-styles
    container: {
      backgroundColor: currentTheme.backgroundColor,
      flex: 1,
    },
    // eslint-disable-next-line react-native/no-unused-styles
    libItemContainer: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      height: 44,
      justifyContent: 'space-between',
      marginHorizontal: 12,
      marginVertical: 4,
    },
    // eslint-disable-next-line react-native/no-unused-styles
    libItemSeparatorComponent: {
      borderBottomColor: currentTheme.borderColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    // eslint-disable-next-line react-native/no-unused-styles
    libItemText: {
      color: currentTheme.textColor,
      fontSize: 17,
    },
    // eslint-disable-next-line react-native/no-unused-styles
    libListHeaderComponent: {
      alignItems: 'center',
      justifyContent: 'center',
      margin: 8,
    },
    // eslint-disable-next-line react-native/no-unused-styles
    text: {
      color: currentTheme.textColor,
      fontSize: 16,
      lineHeight: 20,
    },
  })

export { ThirdPartyLibsScreen }
