// @ts-check
import React from 'react'
import { Provider } from 'react-redux'
import { fireEvent, render } from '@testing-library/react-native'
import { WhiteBalance } from 'expo-camera'
import { configureTestStore } from '../store/StoreTestUtils'
import { PMWhiteBalanceSelector } from './PMWhiteBalanceSelector'
import { SETTING_KEY_CURRENT_WHITE_BALANCE } from '../store/settings'

describe('PMWhiteBalanceSelector component tests', () => {
  it('should display 4 options', () => {
    const { getAllByTestId } = render(
      <Provider store={configureTestStore()}>
        <PMWhiteBalanceSelector />
      </Provider>
    )
    const whiteBalanceButtons = getAllByTestId('whiteBalanceButton')
    expect(whiteBalanceButtons).toHaveLength(4)
    whiteBalanceButtons.forEach((whiteBalanceButton) =>
      expect(whiteBalanceButton).toBeOnTheScreen()
    )
  })

  it('should display no option as selected if the current white balance option is undefined', () => {
    const preloadedState = {
      settings: [
        {
          key: SETTING_KEY_CURRENT_WHITE_BALANCE,
          value: undefined,
        },
      ],
    }
    const store = configureTestStore(preloadedState)
    const { getAllByTestId } = render(
      <Provider store={store}>
        <PMWhiteBalanceSelector />
      </Provider>
    )
    const whiteBalanceButtons = getAllByTestId('whiteBalanceButton')
    expect(whiteBalanceButtons).toHaveLength(4)
    whiteBalanceButtons.forEach((whiteBalanceButton) =>
      expect(whiteBalanceButton).toHaveStyle({ borderWidth: 0 })
    )
  })

  it('should display one option as selected if it represents the current white balance option', () => {
    const preloadedState = {
      settings: [
        {
          key: SETTING_KEY_CURRENT_WHITE_BALANCE,
          value: WhiteBalance.auto,
        },
      ],
    }
    const store = configureTestStore(preloadedState)
    const { getAllByTestId } = render(
      <Provider store={store}>
        <PMWhiteBalanceSelector />
      </Provider>
    )
    const whiteBalanceButtons = getAllByTestId('whiteBalanceButton')
    expect(whiteBalanceButtons).toHaveLength(4)
    // `WhiteBalance.auto` is the first option
    expect(whiteBalanceButtons[0]).toHaveStyle({ borderWidth: 1 })
  })

  it('should update the white balance option if one option is presses', () => {
    const preloadedState = {
      settings: [
        {
          key: SETTING_KEY_CURRENT_WHITE_BALANCE,
          value: undefined,
        },
      ],
    }
    const store = configureTestStore(preloadedState)
    const { getAllByTestId } = render(
      <Provider store={store}>
        <PMWhiteBalanceSelector />
      </Provider>
    )
    const whiteBalanceButtons = getAllByTestId('whiteBalanceButton')
    expect(whiteBalanceButtons).toHaveLength(4)
    fireEvent.press(whiteBalanceButtons[0])
    expect(
      store
        .getState()
        .settings.find(
          (setting) => setting.key === SETTING_KEY_CURRENT_WHITE_BALANCE
        )?.value
    ).not.toBeUndefined()
  })
})
