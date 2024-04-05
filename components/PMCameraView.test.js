// @ts-check
import { useIsFocused } from '@react-navigation/core'
import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import { Camera } from 'expo-camera'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

import { PMCameraView } from './PMCameraView'
import { configureTestStore } from '../store/StoreTestUtils'

jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual('@react-navigation/core'),
  useIsFocused: jest.fn(),
}))

describe('PMCameraView component tests', () => {
  it('should show camera if permissions are granted and component is focused', () => {
    jest
      .spyOn(Camera, 'useCameraPermissions')
      // @ts-ignore
      .mockReturnValue([{ granted: true }, () => Promise.resolve({})])

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

  it('should not show camera if permissions are granted and component is not focused', () => {
    jest
      .spyOn(Camera, 'useCameraPermissions')
      // @ts-ignore
      .mockReturnValue([{ granted: true }, () => Promise.resolve({})])

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

  it('should not show camera if permissions are not granted and component is focused', () => {
    jest
      .spyOn(Camera, 'useCameraPermissions')
      // @ts-ignore
      .mockReturnValue([{ granted: false }, () => Promise.resolve({})])

    // @ts-ignore
    useIsFocused.mockReturnValue(true)

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

  it('should render correctly', () => {
    expect(
      render(
        <Provider store={configureTestStore()}>
          <NavigationContainer>
            <SafeAreaProvider>
              <PMCameraView />
            </SafeAreaProvider>
          </NavigationContainer>
        </Provider>
      ).toJSON()
    ).toMatchSnapshot()
  })
})
