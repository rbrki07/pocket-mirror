// @ts-check
import React from 'react'
import { Provider } from 'react-redux'
import * as Brightness from 'expo-brightness'
import { Alert } from 'react-native'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { configureTestStore } from '../store/StoreTestUtils'
import { PMBrightnessChanger } from './PMBrightnessChanger'

describe('PMBrightnessChanger brightness decrease and increase tests', () => {
  let brightnessSpy
  beforeEach(() => {
    jest
      .spyOn(Brightness, 'usePermissions')
      // @ts-ignore
      .mockReturnValue([{ granted: true }, () => Promise.resolve({})])
    brightnessSpy = jest.spyOn(Brightness, 'setBrightnessAsync')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should decrease brightness if decrease brightness button is pressed', async () => {
    const { getByTestId } = render(
      <Provider store={configureTestStore()}>
        <PMBrightnessChanger />
      </Provider>
    )
    const decreaseBrightnessButton = getByTestId('decreaseBrightnessButton')
    fireEvent.press(decreaseBrightnessButton)
    await waitFor(() => {
      expect(brightnessSpy).toHaveBeenCalledWith(0.4)
    })
  })

  it('should increase brightness if increase brightness button is pressed', async () => {
    const { getByTestId } = render(
      <Provider store={configureTestStore()}>
        <PMBrightnessChanger />
      </Provider>
    )
    const increaseBrightnessButton = getByTestId('increaseBrightnessButton')
    fireEvent.press(increaseBrightnessButton)
    await waitFor(() => {
      expect(brightnessSpy).toHaveBeenCalledWith(0.6)
    })
  })

  it('should set decrease brightness button in disabled state if minimum brightness is reached', async () => {
    const { getByTestId } = render(
      <Provider store={configureTestStore()}>
        <PMBrightnessChanger initialBrightness={0.0} />
      </Provider>
    )
    const decreaseBrightnessButton = getByTestId('decreaseBrightnessButton')
    await waitFor(() => {
      expect(decreaseBrightnessButton).toBeDisabled()
    })
  })

  it('should set increase brightness button in disabled state if maximum brightness is reached', async () => {
    const { getByTestId } = render(
      <Provider store={configureTestStore()}>
        <PMBrightnessChanger initialBrightness={1.0} />
      </Provider>
    )
    const increaseBrightnessButton = getByTestId('increaseBrightnessButton')
    await waitFor(() => {
      expect(increaseBrightnessButton).toBeDisabled()
    })
  })
})

describe('PMBrightnessChanger permission tests', () => {
  let alertSpy
  beforeEach(() => {
    alertSpy = jest.spyOn(Alert, 'alert')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should ask for permission if not allowed to change brightness', async () => {
    jest.spyOn(Brightness, 'usePermissions').mockReturnValue([
      // @ts-ignore
      { granted: false, canAskAgain: true },
      // @ts-ignore
      () => Promise.resolve({}),
    ])
    const { getByTestId } = render(
      <Provider store={configureTestStore()}>
        <PMBrightnessChanger />
      </Provider>
    )
    await waitFor(() => {
      const decreaseBrightnessButton = getByTestId('decreaseBrightnessButton')
      fireEvent.press(decreaseBrightnessButton)
      expect(alertSpy).toHaveBeenCalledWith(
        'Berechtigung erteilen',
        'Die App benötigt die Berechtigung, die Display-Helligkeit anzupassen.',
        expect.any(Array)
      )
    })
  })

  it('should inform user if not able to change brightness', async () => {
    jest
      .spyOn(Brightness, 'usePermissions')
      // @ts-ignore
      .mockReturnValue([
        // @ts-ignore
        { granted: false, canAskAgain: false },
        // @ts-ignore
        () => Promise.resolve({}),
      ])
    const { getByTestId } = render(
      <Provider store={configureTestStore()}>
        <PMBrightnessChanger />
      </Provider>
    )
    await waitFor(() => {
      const decreaseBrightnessButton = getByTestId('decreaseBrightnessButton')
      fireEvent.press(decreaseBrightnessButton)
      expect(alertSpy).toHaveBeenCalledWith(
        'Fehlende Berechtigung',
        'Die App verfügt nicht über die erforderliche Berechtigung, um die Display-Helligkeit anzupassen. Bitte öffne die Einstellungen und erlaube der App, die Display-Helligkeit anzupassen.'
      )
    })
  })
})

describe('PMBrightnessChanger snapshot test', () => {
  it('should render correctly', () => {
    expect(
      render(
        <Provider store={configureTestStore()}>
          <PMBrightnessChanger />
        </Provider>
      ).toJSON()
    ).toMatchSnapshot()
  })
})
