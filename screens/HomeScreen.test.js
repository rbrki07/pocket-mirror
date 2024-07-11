// @ts-check
import { NavigationContainer } from '@react-navigation/native'
import { render, waitFor } from '@testing-library/react-native'
import { useCameraPermissions } from 'expo-camera'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

import { HomeScreen } from './HomeScreen'
import { configureTestStore } from '../store/StoreTestUtils'

jest.mock('expo-camera', () => ({
  ...jest.requireActual('expo-camera'),
  useCameraPermissions: jest.fn(),
}))

describe('HomeScreen tests', () => {
  it('should dispatch navigation stack action to WelcomeScreen, if camera permission is not granted', async () => {
    // @ts-ignore
    useCameraPermissions.mockReturnValue([
      { granted: false },
      () => Promise.resolve({}),
    ])

    const dispatchMock = jest.fn()
    const navigationMock = {
      dispatch: dispatchMock,
    }

    render(
      <Provider store={configureTestStore()}>
        <NavigationContainer>
          <SafeAreaProvider>
            <HomeScreen navigation={navigationMock} />
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    )

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith({
        payload: { name: 'Welcome', params: undefined },
        type: 'REPLACE',
      })
    })
  })

  it('should render camera view, if camera permission is granted', async () => {
    // @ts-ignore
    useCameraPermissions.mockReturnValue([
      { granted: true },
      () => Promise.resolve({}),
    ])

    const { getByTestId } = render(
      <Provider store={configureTestStore()}>
        <NavigationContainer>
          <SafeAreaProvider>
            <HomeScreen navigation={jest.fn()} />
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    )

    const camera = getByTestId('camera')
    await waitFor(() => {
      expect(camera).toBeOnTheScreen()
    })
  })

  it('should render correctly', () => {
    expect(
      render(
        <Provider store={configureTestStore()}>
          <NavigationContainer>
            <SafeAreaProvider>
              <HomeScreen navigation={jest.fn()} />
            </SafeAreaProvider>
          </NavigationContainer>
        </Provider>
      ).toJSON()
    ).toMatchSnapshot()
  })
})
