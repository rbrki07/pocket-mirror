// @ts-check
import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react-native'
import { PMLottieViewCameraPermission } from './PMLottieViewCameraPermission'
import { configureTestStore } from './../store/StoreTestUtils'

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
