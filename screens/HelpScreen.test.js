// @ts-check
import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react-native'
import { HelpScreen } from './HelpScreen'
import { configureTestStore } from './../store/StoreTestUtils'

describe('HelpScreen snapshot test', () => {
  it('should render correctly', () => {
    const navigationMock = {
      setOptions: jest.fn(),
    }
    expect(
      render(
        <Provider store={configureTestStore()}>
          <HelpScreen navigation={navigationMock} />
        </Provider>
      ).toJSON()
    ).toMatchSnapshot()
  })
})
