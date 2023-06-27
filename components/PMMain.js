// @ts-check
import React from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from './../hooks/useTheme'
import { HomeScreen } from './../screens/HomeScreen'
import { MenuScreen } from '../screens/MenuScreen'
import { SettingScreen } from './../screens/SettingScreen'
import { ImprintScreen } from './../screens/ImprintScreen'
import { PrivacyScreen } from './../screens/PrivacyScreen'
import { ThirdPartyLibsScreen } from './../screens/ThirdPartyLibsScreen'
import {
  HOME_SCREEN_ROUTE,
  IMPRINT_SCREEN_ROUTE,
  PRIVACY_SCREEN_ROUTE,
  MENU_MODAL_ROUTE,
  SETTING_SCREEN_ROUTE,
  THIRD_PARTY_LIBS_SCREEN_ROUTE,
  MENU_SCREEN_ROUTE,
  ABOUT_SCREEN_ROUTE,
} from './../screens/Routes'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'
import { AboutScreen } from '../screens/AboutScreen'

/**
 * @param {Object} params
 * @param {typedefs.Theme} params.currentTheme
 *
 * @returns {Object} NavigationTheme
 */
const getNavigationTheme = ({ currentTheme }) => ({
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: currentTheme.textColor,
    background: currentTheme.backgroundColor,
    card: currentTheme.backgroundColor,
    text: currentTheme.textColor,
  },
})

/**
 * @returns {Object} MenuModal
 */
const MenuModal = () => {
  const MenuStack = createNativeStackNavigator()

  return (
    <MenuStack.Navigator>
      <MenuStack.Screen name={MENU_SCREEN_ROUTE} component={MenuScreen} />
      <MenuStack.Screen name={SETTING_SCREEN_ROUTE} component={SettingScreen} />
      <MenuStack.Screen name={IMPRINT_SCREEN_ROUTE} component={ImprintScreen} />
      <MenuStack.Screen name={PRIVACY_SCREEN_ROUTE} component={PrivacyScreen} />
      <MenuStack.Screen
        name={THIRD_PARTY_LIBS_SCREEN_ROUTE}
        component={ThirdPartyLibsScreen}
      />
      <MenuStack.Screen name={ABOUT_SCREEN_ROUTE} component={AboutScreen} />
    </MenuStack.Navigator>
  )
}

const MainStack = createNativeStackNavigator()

/**
 * @returns {Object} PMMain
 */
const PMMain = () => {
  const theme = useTheme()
  const navigationTheme = getNavigationTheme({ currentTheme: theme })

  return (
    <NavigationContainer theme={navigationTheme}>
      <MainStack.Navigator>
        <MainStack.Screen
          name={HOME_SCREEN_ROUTE}
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={MENU_MODAL_ROUTE}
          component={MenuModal}
          options={{ headerShown: false, presentation: 'modal' }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  )
}

export { PMMain }
