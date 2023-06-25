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
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

/**
 * @returns {Object} MenuScreen
 */
const MenuScreen = ({ navigation }) => {
  const theme = useTheme()
  const styles = themedStyles(theme)

  const infoItems = useMemo(
    () => [
      { title: 'Einstellungen', route: 'Setting' },
      { title: 'Impressum', route: 'Imprint' },
      { title: 'Datenschutz', route: 'Privacy' },
      { title: 'Drittanbieter-Software', route: 'ThirdPartyLibs' },
      { title: 'App-Info', route: 'About' },
    ],
    []
  )

  const renderInfoItems = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.infoItemContainer}
        onPress={() => navigation.navigate(item.route)}
      >
        <Text style={styles.infoItemText}>{item.title}</Text>
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
    () => <View style={styles.infoItemSeparatorComponent} />,
    [styles]
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Menü',
    })
    if (Platform.OS === 'ios') {
      navigation.setOptions({
        headerLeft: () => (
          <Button onPress={() => navigation.goBack()} title={'Schließen'} />
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
    infoItemContainer: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      height: 44,
      justifyContent: 'space-between',
      marginHorizontal: 12,
      marginVertical: 4,
    },
    // eslint-disable-next-line react-native/no-unused-styles
    infoItemSeparatorComponent: {
      borderBottomColor: currentTheme.borderColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    // eslint-disable-next-line react-native/no-unused-styles
    infoItemText: {
      color: currentTheme.textColor,
      fontSize: 17,
    },
  })

export { MenuScreen }
