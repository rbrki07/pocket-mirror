// @ts-check
import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react-native'
import { MenuScreen } from './MenuScreen'
import { configureTestStore } from './../store/StoreTestUtils'

describe('MenuScreen snapshot test', () => {
  it('should render correctly', () => {
    const navigationMock = {
      setOptions: jest.fn(),
    }
    expect(
      render(
        <Provider store={configureTestStore()}>
          <MenuScreen navigation={navigationMock} />
        </Provider>
      ).toJSON()
    ).toMatchSnapshot()
  })
})
