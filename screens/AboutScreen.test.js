// @ts-check
import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react-native'
import { AboutScreen } from './AboutScreen'
import { configureTestStore } from './../store/StoreTestUtils'

describe('AboutScreen snapshot test', () => {
  it('should render correctly', () => {
    const navigationMock = {
      setOptions: jest.fn(),
    }
    expect(
      render(
        <Provider store={configureTestStore()}>
          <AboutScreen navigation={navigationMock} />
        </Provider>
      ).toJSON()
    ).toMatchSnapshot()
  })
})
