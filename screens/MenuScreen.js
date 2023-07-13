// @ts-check
import React, { useCallback, useLayoutEffect, useMemo } from 'react'
import {
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from './../hooks/useTheme'
import { useGlobalStyles } from './../hooks/useGlobalStyles'
import { i18n } from '../i18n'
import {
  I18N_KEY_SCREEN_MENU_CLOSE_BUTTON,
  I18N_KEY_SCREEN_MENU_HEADER_TITLE,
  I18N_KEY_SCREEN_MENU_ITEM_ABOUT,
  I18N_KEY_SCREEN_MENU_ITEM_IMPRINT,
  I18N_KEY_SCREEN_MENU_ITEM_PRIVACY,
  I18N_KEY_SCREEN_MENU_ITEM_SETTING,
  I18N_KEY_SCREEN_MENU_ITEM_THIRD_PARTY_LIBS,
} from '../i18n/keys'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

/**
 * @returns {Object} MenuScreen
 */
const MenuScreen = ({ navigation }) => {
  const theme = useTheme()
  const globalStyles = useGlobalStyles()
  const styles = mergedStyles(globalStyles)

  const infoItems = useMemo(
    () => [
      { title: i18n.t(I18N_KEY_SCREEN_MENU_ITEM_SETTING), route: 'Setting' },
      { title: i18n.t(I18N_KEY_SCREEN_MENU_ITEM_IMPRINT), route: 'Imprint' },
      { title: i18n.t(I18N_KEY_SCREEN_MENU_ITEM_PRIVACY), route: 'Privacy' },
      {
        title: i18n.t(I18N_KEY_SCREEN_MENU_ITEM_THIRD_PARTY_LIBS),
        route: 'ThirdPartyLibs',
      },
      { title: i18n.t(I18N_KEY_SCREEN_MENU_ITEM_ABOUT), route: 'About' },
    ],
    []
  )

  const renderInfoItems = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.infoItemContainer}
        onPress={() => navigation.navigate(item.route)}
      >
        <Text style={styles.text}>{item.title}</Text>
        <Ionicons
          name={'chevron-forward-outline'}
          size={32}
          color={theme.iconColor}
        />
      </TouchableOpacity>
    ),
    [styles, navigation, theme]
  )

  const infoItemSeparatorComponent = useCallback(
    () => <View style={styles.itemSeparatorComponent} />,
    [styles]
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t(I18N_KEY_SCREEN_MENU_HEADER_TITLE),
    })
    if (Platform.OS === 'ios') {
      navigation.setOptions({
        headerLeft: () => (
          <Button
            onPress={() => navigation.goBack()}
            title={i18n.t(I18N_KEY_SCREEN_MENU_CLOSE_BUTTON)}
          />
        ),
      })
    }
  }, [navigation])

  return (
    <View style={styles.container}>
      <FlatList
        data={infoItems}
        ItemSeparatorComponent={infoItemSeparatorComponent}
        renderItem={renderInfoItems}
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
    infoItemContainer: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 4,
      minHeight: 40,
    },
  })

export { MenuScreen }
