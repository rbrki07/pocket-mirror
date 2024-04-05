// @ts-check
import { render } from '@testing-library/react-native'
import React from 'react'

import App from './App'

describe('App snapshot test', () => {
  it('should render correctly', () => {
    expect(render(<App />).toJSON()).toMatchSnapshot()
  })
})
