// @ts-check
import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react-native'
import { PMMain } from './PMMain'
import { configureTestStore } from './../store/StoreTestUtils'

describe('PMMain snapshot test', () => {
  it('should render correctly', () => {
    expect(
      render(
        <Provider store={configureTestStore()}>
          <PMMain />
        </Provider>
      ).toJSON()
    ).toMatchSnapshot()
  })
})
