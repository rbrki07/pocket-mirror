// @ts-check
import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react-native'
import { PMLocaleAwareText } from './PMLocaleAwareText'
import { configureTestStore } from './../store/StoreTestUtils'

describe('PMLocaleAwareText snapshot test', () => {
  it('should render correctly', () => {
    expect(
      render(
        <Provider store={configureTestStore()}>
          <PMLocaleAwareText i18nKey={''} />
        </Provider>
      ).toJSON()
    ).toMatchSnapshot()
  })
})
