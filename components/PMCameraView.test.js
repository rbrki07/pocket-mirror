// @ts-check
import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react-native'
import { configureTestStore } from '../store/StoreTestUtils'
import { PMCameraView } from './PMCameraView'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { useIsFocused } from '@react-navigation/core'
import { Platform } from 'react-native'

jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual('@react-navigation/core'),
  useIsFocused: jest.fn(),
}))

describe('PMCameraView component tests', () => {
  it('should show camera if component is focused', () => {
    // @ts-ignore
    useIsFocused.mockReturnValue(true)

    const { getByTestId } = render(
      <Provider store={configureTestStore()}>
        <NavigationContainer>
          <SafeAreaProvider>
            <PMCameraView />
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    )
    const camera = getByTestId('camera')
    expect(camera).toBeOnTheScreen()
  })

  it('should not show camera if component is not focused', () => {
    // @ts-ignore
    useIsFocused.mockReturnValue(false)

    const { queryByTestId } = render(
      <Provider store={configureTestStore()}>
        <NavigationContainer>
          <SafeAreaProvider>
            <PMCameraView />
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    )
    const camera = queryByTestId('camera')
    expect(camera).toBeNull()
  })

  // Mock data for calculation:
  // - useSafeAreaInsets(): { top: 0, bottom: 0 } (https://github.com/th3rdwave/react-native-safe-area-context#testing)
  // - useWindowDimensions(): { height: 1334, width: 750 } (https://stackoverflow.com/q/69346459)

  it('should calculate the correct cameraContainerHeight', () => {
    const { getByTestId } = render(
      <Provider store={configureTestStore()}>
        <NavigationContainer>
          <SafeAreaProvider>
            <PMCameraView />
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    )
    const cameraContainer = getByTestId('cameraContainer')
    expect(cameraContainer).toHaveStyle({ height: 1202 })
  })

  it('should calculate the correct cameraContainerWidth', () => {
    const { getByTestId } = render(
      <Provider store={configureTestStore()}>
        <NavigationContainer>
          <SafeAreaProvider>
            <PMCameraView />
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    )
    const cameraContainer = getByTestId('cameraContainer')
    expect(cameraContainer).toHaveStyle({ width: 742 })
  })

  it('should calculate the correct cameraHeight', () => {
    // @ts-ignore
    useIsFocused.mockReturnValue(true)

    const { getByTestId } = render(
      <Provider store={configureTestStore()}>
        <NavigationContainer>
          <SafeAreaProvider>
            <PMCameraView />
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    )
    const camera = getByTestId('camera')
    expect(camera).toHaveStyle({ height: 1202 })
  })

  it('should calculate the correct cameraWidth if platform is ios', () => {
    // @ts-ignore
    useIsFocused.mockReturnValue(true)

    jest.replaceProperty(Platform, 'OS', 'ios')

    const { getByTestId } = render(
      <Provider store={configureTestStore()}>
        <NavigationContainer>
          <SafeAreaProvider>
            <PMCameraView />
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    )
    const camera = getByTestId('camera')
    expect(camera).toHaveStyle({ width: 750 })
  })

  it('should calculate the correct cameraWidth if platform is android', () => {
    // @ts-ignore
    useIsFocused.mockReturnValue(true)

    jest.replaceProperty(Platform, 'OS', 'android')

    const { getByTestId } = render(
      <Provider store={configureTestStore()}>
        <NavigationContainer>
          <SafeAreaProvider>
            <PMCameraView />
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    )
    const camera = getByTestId('camera')
    expect(camera).toHaveStyle({ width: 901.5 })
  })
})
