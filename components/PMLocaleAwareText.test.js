// @ts-check
import { render } from '@testing-library/react-native'
import React from 'react'
import { Provider } from 'react-redux'

import { configureTestStore } from './../store/StoreTestUtils'
import { PMLocaleAwareText } from './PMLocaleAwareText'

describe('PMLocaleAwareText snapshot test', () => {
  it('should render correctly', () => {
    expect(
      render(
        <Provider store={configureTestStore()}>
          <PMLocaleAwareText i18nKey="" />
        </Provider>
      ).toJSON()
    ).toMatchSnapshot()
  })
})
