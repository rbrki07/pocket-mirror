// @ts-check
import { render } from '@testing-library/react-native'
import React from 'react'
import { Provider } from 'react-redux'

import { configureTestStore } from './../store/StoreTestUtils'
import { ThirdPartyLibsScreen } from './ThirdPartyLibsScreen'

describe('ThirdPartyLibsScreen snapshot test', () => {
  it('should render correctly', () => {
    const navigationMock = {
      setOptions: jest.fn(),
    }
    expect(
      render(
        <Provider store={configureTestStore()}>
          <ThirdPartyLibsScreen navigation={navigationMock} />
        </Provider>
      ).toJSON()
    ).toMatchSnapshot()
  })
})
