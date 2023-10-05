// @ts-check
import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react-native'
import { SettingScreen } from './SettingScreen'
import { configureTestStore } from './../store/StoreTestUtils'

describe('SettingScreen snapshot test', () => {
  it('should render correctly', () => {
    const navigationMock = {
      setOptions: jest.fn(),
    }
    expect(
      render(
        <Provider store={configureTestStore()}>
          <SettingScreen navigation={navigationMock} />
        </Provider>
      ).toJSON()
    ).toMatchSnapshot()
  })
})
