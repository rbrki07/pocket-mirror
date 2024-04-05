// @ts-check
import { render } from '@testing-library/react-native'
import React from 'react'
import { Provider } from 'react-redux'

import { configureTestStore } from './../store/StoreTestUtils'
import { PMMain } from './PMMain'

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
