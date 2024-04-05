// @ts-check
import { render } from '@testing-library/react-native'
import React from 'react'
import { Provider } from 'react-redux'

import { configureTestStore } from './../store/StoreTestUtils'
import { PMLottieViewCameraPermission } from './PMLottieViewCameraPermission'

describe('PMLottieViewCameraPermission snapshot test', () => {
  it('should render correctly', () => {
    expect(
      render(
        <Provider store={configureTestStore()}>
          <PMLottieViewCameraPermission />
        </Provider>
      ).toJSON()
    ).toMatchSnapshot()
  })
})
