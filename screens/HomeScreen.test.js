// @ts-check
import React from 'react'
import { Provider } from 'react-redux'
import { render, waitFor } from '@testing-library/react-native'
import { Camera } from 'expo-camera'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { configureTestStore } from '../store/StoreTestUtils'
import { HomeScreen } from './HomeScreen'

jest.mock('expo-localization', () => ({
  ...jest.requireActual('expo-localization'),
  getLocales: () => [{ languageCode: 'de' }],
}))

describe('HomeScreen tests', () => {
  it('should dispatch navigation stack action to WelcomeScreen, if camera permission is not granted', async () => {
    jest
      .spyOn(Camera, 'useCameraPermissions')
      // @ts-ignore
      .mockReturnValue([{ granted: false }, () => Promise.resolve({})])

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
    jest
      .spyOn(Camera, 'useCameraPermissions')
      // @ts-ignore
      .mockReturnValue([{ granted: true }, () => Promise.resolve({})])

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
})
