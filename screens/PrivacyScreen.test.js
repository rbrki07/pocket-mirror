// @ts-check
import { render } from '@testing-library/react-native'
import React from 'react'
import { Provider } from 'react-redux'

import { configureTestStore } from './../store/StoreTestUtils'
import { PrivacyScreen } from './PrivacyScreen'

describe('PrivacyScreen snapshot test', () => {
  it('should render correctly', () => {
    const navigationMock = {
      setOptions: jest.fn(),
    }
    expect(
      render(
        <Provider store={configureTestStore()}>
          <PrivacyScreen navigation={navigationMock} />
        </Provider>
      ).toJSON()
    ).toMatchSnapshot()
  })
})
