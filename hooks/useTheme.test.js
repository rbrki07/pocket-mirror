// @ts-check
import { renderHook } from '@testing-library/react-native'
import React from 'react'
import { useColorScheme } from 'react-native'
import { Provider } from 'react-redux'

import { useTheme } from './useTheme'
import { configureTestStore } from '../store/StoreTestUtils'
import { SETTING_KEY_CURRENT_THEME } from '../store/settings'
import { THEME } from '../style/theme'

describe('useTheme hook', () => {
  it('should return light theme if currentTheme is light', () => {
    // @ts-ignore
    useColorScheme.mockReturnValue('dark')

    const preloadedState = {
      settings: [
        {
          key: SETTING_KEY_CURRENT_THEME,
          value: 'light',
        },
      ],
    }
    const store = configureTestStore(preloadedState)
    const wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    )

    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current).toEqual(THEME['light'])
  })

  it('should return dark theme if currentTheme is dark', () => {
    // @ts-ignore
    useColorScheme.mockReturnValue('light')

    const preloadedState = {
      settings: [
        {
          key: SETTING_KEY_CURRENT_THEME,
          value: 'dark',
        },
      ],
    }
    const store = configureTestStore(preloadedState)
    const wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    )

    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current).toEqual(THEME['dark'])
  })

  it('should return light theme if currentTheme is undefined and colorScheme is light', () => {
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
    const wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    )

    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current).toEqual(THEME['light'])
  })

  it('should return dark theme if currentTheme is undefined and colorScheme is dark', () => {
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
    const wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    )

    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current).toEqual(THEME['dark'])
  })

  it('should return light theme if currentTheme is undefined and colorScheme is undefined', () => {
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
    const wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    )

    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current).toEqual(THEME['light'])
  })
})
