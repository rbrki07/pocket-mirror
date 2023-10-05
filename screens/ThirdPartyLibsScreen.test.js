// @ts-check
import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react-native'
import { ThirdPartyLibsScreen } from './ThirdPartyLibsScreen'
import { configureTestStore } from './../store/StoreTestUtils'

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
