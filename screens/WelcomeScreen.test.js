// @ts-check
import React from 'react'
import { Provider } from 'react-redux'
import { render, waitFor } from '@testing-library/react-native'
import { Camera } from 'expo-camera'
import { NavigationContainer } from '@react-navigation/native'
import { configureTestStore } from '../store/StoreTestUtils'
import { WelcomeScreen } from './WelcomeScreen'

describe('WelcomeScreen tests', () => {
  it('should dispatch navigation stack action to HomeScreen, if camera permission is granted', async () => {
    jest
      .spyOn(Camera, 'useCameraPermissions')
      // @ts-ignore
      .mockReturnValue([{ granted: true }, () => Promise.resolve({})])

    const dispatchMock = jest.fn()
    const navigationMock = {
      dispatch: dispatchMock,
    }

    render(
      <Provider store={configureTestStore()}>
        <NavigationContainer>
          <WelcomeScreen navigation={navigationMock} />
        </NavigationContainer>
      </Provider>
    )

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith({
        payload: { name: 'Home', params: undefined },
        type: 'REPLACE',
      })
    })
  })

  it('should show request camera permission button and advice, if camera permission is not granted and user is allowed to ask again', async () => {
    jest.spyOn(Camera, 'useCameraPermissions').mockReturnValue([
      // @ts-ignore
      { granted: false, canAskAgain: true },
      // @ts-ignore
      () => Promise.resolve({}),
    ])

    const { getByTestId, getByText } = render(
      <Provider store={configureTestStore()}>
        <NavigationContainer>
          <WelcomeScreen navigation={jest.fn} />
        </NavigationContainer>
      </Provider>
    )

    const activateCameraAdviceText = getByText(
      'Damit ich richtig funktionieren kann, aktiviere bitte die Front-Kamera.'
    )
    const requestCameraPermissionButton = getByTestId(
      'requestCameraPermissionButton'
    )
    await waitFor(() => {
      expect(activateCameraAdviceText).toBeOnTheScreen()
      expect(requestCameraPermissionButton).toBeOnTheScreen()
    })
  })

  it('should show open settings button and advice, if camera permission is not granted and user is not allowed to ask again', async () => {
    jest.spyOn(Camera, 'useCameraPermissions').mockReturnValue([
      // @ts-ignore
      { granted: false, canAskAgain: false },
      // @ts-ignore
      () => Promise.resolve({}),
    ])

    const { getByTestId, getByText } = render(
      <Provider store={configureTestStore()}>
        <NavigationContainer>
          <WelcomeScreen navigation={jest.fn} />
        </NavigationContainer>
      </Provider>
    )

    const openSettingsAdviceText = getByText(
      'Damit ich richtig funktionieren kann, öffne bitte die Einstellungen und erlaube der App den Zugriff auf die Front-Kamera.'
    )
    const openSettingsButton = getByTestId('openSettingsButton')
    await waitFor(() => {
      expect(openSettingsAdviceText).toBeOnTheScreen()
      expect(openSettingsButton).toBeOnTheScreen()
    })
  })

  it('should render correctly', () => {
    expect(
      render(
        <Provider store={configureTestStore()}>
          <NavigationContainer>
            <WelcomeScreen navigation={jest.fn} />
          </NavigationContainer>
        </Provider>
      ).toJSON()
    ).toMatchSnapshot()
  })
})
