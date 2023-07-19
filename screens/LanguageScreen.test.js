// @ts-check
import React from 'react'
import { Provider } from 'react-redux'
import { fireEvent, render } from '@testing-library/react-native'
import { configureTestStore } from './../store/StoreTestUtils'
import { SETTING_KEY_CURRENT_LANGUAGE_CODE } from './../store/settings'
import { LanguageScreen } from './LanguageScreen'

describe('LanguageScreen tests', () => {
  it('should highlight the language item, if it is selected', () => {
    const setOptionsMock = jest.fn()
    const navigationMock = {
      setOptions: setOptionsMock,
    }

    const { getByText } = render(
      <Provider store={configureTestStore()}>
        <LanguageScreen navigation={navigationMock} />
      </Provider>
    )

    const item = getByText('Deutsch')
    expect(item).toHaveStyle({ fontWeight: 'bold' })
  })

  it('it should update the current language-code in store, if an item is selected', () => {
    const store = configureTestStore()

    const setOptionsMock = jest.fn()
    const navigationMock = {
      setOptions: setOptionsMock,
    }

    const { getByText } = render(
      <Provider store={store}>
        <LanguageScreen navigation={navigationMock} />
      </Provider>
    )

    const item = getByText('English')
    fireEvent.press(item)
    expect(
      store
        .getState()
        .settings.find(
          (setting) => setting.key === SETTING_KEY_CURRENT_LANGUAGE_CODE
        )?.value
    ).toBe('en')
  })
})
