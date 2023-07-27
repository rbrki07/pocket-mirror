// @ts-check
import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react-native'
import { configureTestStore } from '../store/StoreTestUtils'
import { PMCameraView } from './PMCameraView'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { useIsFocused } from '@react-navigation/core'

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
})
