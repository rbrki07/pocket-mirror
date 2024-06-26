// @ts-check
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { Provider } from 'react-redux'

import { PMZoomChanger } from './PMZoomChanger'
import { configureTestStore } from '../store/StoreTestUtils'
import { SETTING_KEY_CURRENT_ZOOM_LEVEL } from '../store/settings'

describe('PMZoomChanger component test', () => {
  it('should decrease zoom level if decrease zoom level button is pressed ', () => {
    const preloadedState = {
      settings: [
        {
          key: SETTING_KEY_CURRENT_ZOOM_LEVEL,
          value: 0.025,
        },
      ],
    }
    const store = configureTestStore(preloadedState)
    const { getByTestId } = render(
      <Provider store={store}>
        <PMZoomChanger />
      </Provider>
    )
    const decreaseZoomLevelButton = getByTestId('decreaseZoomLevelButton')
    fireEvent.press(decreaseZoomLevelButton)
    expect(
      store
        .getState()
        .settings.find(
          (setting) => setting.key === SETTING_KEY_CURRENT_ZOOM_LEVEL
        )?.value
    ).toEqual(0.02)
  })

  it('should increase zoom level if increase zoom level button is pressed ', () => {
    const preloadedState = {
      settings: [
        {
          key: SETTING_KEY_CURRENT_ZOOM_LEVEL,
          value: 0.02,
        },
      ],
    }
    const store = configureTestStore(preloadedState)
    const { getByTestId } = render(
      <Provider store={store}>
        <PMZoomChanger />
      </Provider>
    )
    const increaseZoomLevelButton = getByTestId('increaseZoomLevelButton')
    fireEvent.press(increaseZoomLevelButton)
    expect(
      store
        .getState()
        .settings.find(
          (setting) => setting.key === SETTING_KEY_CURRENT_ZOOM_LEVEL
        )?.value
    ).toEqual(0.025)
  })

  it('should set decrease zoom level button in disabled state if minimum zoom level is reached ', () => {
    const preloadedState = {
      settings: [
        {
          key: SETTING_KEY_CURRENT_ZOOM_LEVEL,
          value: 0.0,
        },
      ],
    }
    const store = configureTestStore(preloadedState)
    const { getByTestId } = render(
      <Provider store={store}>
        <PMZoomChanger />
      </Provider>
    )
    const decreaseZoomLevelButton = getByTestId('decreaseZoomLevelButton')
    expect(decreaseZoomLevelButton).toBeDisabled()
  })

  it('should set increase zoom level button in disabled state if maximum zoom level is reached ', () => {
    const preloadedState = {
      settings: [
        {
          key: SETTING_KEY_CURRENT_ZOOM_LEVEL,
          value: 0.5,
        },
      ],
    }
    const store = configureTestStore(preloadedState)
    const { getByTestId } = render(
      <Provider store={store}>
        <PMZoomChanger />
      </Provider>
    )
    const increaseZoomLevelButton = getByTestId('increaseZoomLevelButton')
    expect(increaseZoomLevelButton).toBeDisabled()
  })

  it('should render correctly', () => {
    expect(
      render(
        <Provider store={configureTestStore()}>
          <PMZoomChanger />
        </Provider>
      ).toJSON()
    ).toMatchSnapshot()
  })
})
