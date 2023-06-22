// @ts-check
import React from 'react'
import { Provider } from 'react-redux'
import { useColorScheme } from 'react-native'
import { fireEvent, render } from '@testing-library/react-native'
import { configureTestStore } from '../store/StoreTestUtils'
import { PMThemeSelector } from './PMThemeSelector'
import { SETTING_KEY_CURRENT_THEME } from '../store/settings'

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  default: jest.fn(),
}))

describe('PMThemeSelector component tests', () => {
  it('should set theme to dark if current theme is light', () => {
    const preloadedState = {
      settings: [
        {
          key: SETTING_KEY_CURRENT_THEME,
          value: 'light',
        },
      ],
    }
    const store = configureTestStore(preloadedState)
    const { getByTestId } = render(
      <Provider store={store}>
        <PMThemeSelector />
      </Provider>
    )
    const themeButton = getByTestId('themeButton')
    fireEvent.press(themeButton)
    expect(
      store
        .getState()
        .settings.find((setting) => setting.key === SETTING_KEY_CURRENT_THEME)
        ?.value
    ).toEqual('dark')
  })

  it('should set theme to light if current theme is dark', () => {
    const preloadedState = {
      settings: [
        {
          key: SETTING_KEY_CURRENT_THEME,
          value: 'dark',
        },
      ],
    }
    const store = configureTestStore(preloadedState)
    const { getByTestId } = render(
      <Provider store={store}>
        <PMThemeSelector />
      </Provider>
    )
    const themeButton = getByTestId('themeButton')
    fireEvent.press(themeButton)
    expect(
      store
        .getState()
        .settings.find((setting) => setting.key === SETTING_KEY_CURRENT_THEME)
        ?.value
    ).toEqual('light')
  })

  it('should set theme to dark if current theme is undefined and color scheme is light', () => {
    // @ts-ignore
    useColorScheme.mockReturnValue('light')
    const preloadedState = {
      settings: [
        {
          key: SETTING_KEY_CURRENT_THEME,
          value: undefined,
        },
      ],
    }
    const store = configureTestStore(preloadedState)
    const { getByTestId } = render(
      <Provider store={store}>
        <PMThemeSelector />
      </Provider>
    )
    const themeButton = getByTestId('themeButton')
    fireEvent.press(themeButton)
    expect(
      store
        .getState()
        .settings.find((setting) => setting.key === SETTING_KEY_CURRENT_THEME)
        ?.value
    ).toEqual('dark')
  })

  it('should set theme to light if current theme is undefined and color scheme is dark', () => {
    // @ts-ignore
    useColorScheme.mockReturnValue('dark')
    const preloadedState = {
      settings: [
        {
          key: SETTING_KEY_CURRENT_THEME,
          value: undefined,
        },
      ],
    }
    const store = configureTestStore(preloadedState)
    const { getByTestId } = render(
      <Provider store={store}>
        <PMThemeSelector />
      </Provider>
    )
    const themeButton = getByTestId('themeButton')
    fireEvent.press(themeButton)
    expect(
      store
        .getState()
        .settings.find((setting) => setting.key === SETTING_KEY_CURRENT_THEME)
        ?.value
    ).toEqual('light')
  })

  it('should not set the theme if current theme and color scheme are undefined', () => {
    // @ts-ignore
    useColorScheme.mockReturnValue(undefined)
    const preloadedState = {
      settings: [
        {
          key: SETTING_KEY_CURRENT_THEME,
          value: undefined,
        },
      ],
    }
    const store = configureTestStore(preloadedState)
    const { getByTestId } = render(
      <Provider store={store}>
        <PMThemeSelector />
      </Provider>
    )
    const themeButton = getByTestId('themeButton')
    fireEvent.press(themeButton)
    expect(
      store
        .getState()
        .settings.find((setting) => setting.key === SETTING_KEY_CURRENT_THEME)
        ?.value
    ).toBeUndefined()
  })

  it('should show icon sunny-outline if current theme is light', async () => {
    const preloadedState = {
      settings: [
        {
          key: SETTING_KEY_CURRENT_THEME,
          value: 'light',
        },
      ],
    }
    const store = configureTestStore(preloadedState)
    const { getByTestId } = render(
      <Provider store={store}>
        <PMThemeSelector />
      </Provider>
    )
    const themeButtonIcon = getByTestId('themeButton_sunny-outline')
    expect(themeButtonIcon).toBeOnTheScreen()
  })

  it('should show icon moon-outline if current theme is dark', () => {
    const preloadedState = {
      settings: [
        {
          key: SETTING_KEY_CURRENT_THEME,
          value: 'dark',
        },
      ],
    }
    const store = configureTestStore(preloadedState)
    const { getByTestId } = render(
      <Provider store={store}>
        <PMThemeSelector />
      </Provider>
    )
    const themeButtonIcon = getByTestId('themeButton_moon-outline')
    expect(themeButtonIcon).toBeOnTheScreen()
  })
})
