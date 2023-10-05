// @ts-check
import React from 'react'
import { render } from '@testing-library/react-native'
import App from './App'

describe('App snapshot test', () => {
  it('should render correctly', () => {
    expect(render(<App />).toJSON()).toMatchSnapshot()
  })
})
