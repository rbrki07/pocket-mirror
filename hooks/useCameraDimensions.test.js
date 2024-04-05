// @ts-check
import { renderHook } from '@testing-library/react-native'
import React from 'react'
import { Platform } from 'react-native'
import { Provider } from 'react-redux'

import { useCameraDimensions } from './useCameraDimensions'
import { configureTestStore } from '../store/StoreTestUtils'

// Mock data for calculation:
// - useSafeAreaInsets(): { top: 0, bottom: 0 } (https://github.com/th3rdwave/react-native-safe-area-context#testing)
// - useWindowDimensions(): { height: 1334, width: 750 } (https://stackoverflow.com/q/69346459)

describe('useCameraDimensions hook', () => {
  it('should calculate the correct cameraContainerHeight', () => {
    const store = configureTestStore()
    const wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    )

    const { result } = renderHook(() => useCameraDimensions(), { wrapper })
    expect(result.current.cameraContainerHeight).toEqual(1198)
  })

  it('should calculate the correct cameraContainerWidth', () => {
    const store = configureTestStore()
    const wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    )

    const { result } = renderHook(() => useCameraDimensions(), { wrapper })
    expect(result.current.cameraContainerWidth).toEqual(742)
  })

  it('should calculate the correct cameraHeight', () => {
    const store = configureTestStore()
    const wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    )

    const { result } = renderHook(() => useCameraDimensions(), { wrapper })
    expect(result.current.cameraHeight).toEqual(1198)
  })

  it('should calculate the correct cameraWidth if platform is ios', () => {
    jest.replaceProperty(Platform, 'OS', 'ios')

    const store = configureTestStore()
    const wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    )

    const { result } = renderHook(() => useCameraDimensions(), { wrapper })
    expect(result.current.cameraWidth).toEqual(742)
  })

  it('should calculate the correct cameraWidth if platform is android', () => {
    jest.replaceProperty(Platform, 'OS', 'android')

    const store = configureTestStore()
    const wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    )

    const { result } = renderHook(() => useCameraDimensions(), { wrapper })
    expect(result.current.cameraWidth).toEqual(898.5)
  })
})
