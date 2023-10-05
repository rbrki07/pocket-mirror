// @ts-check
import React from 'react'
import { render } from '@testing-library/react-native'
import { ThirdPartyLibsDetailScreen } from './ThirdPartyLibsDetailScreen'

describe('ThirdPartyLibsDetailScreen snapshot test', () => {
  it('should render correctly', () => {
    const routeMock = {
      params: {
        item: {
          uri: 'https://www.github.com',
          license: 'MIT',
        },
      },
    }
    const navigationMock = {
      setOptions: jest.fn(),
    }
    expect(
      render(
        <ThirdPartyLibsDetailScreen
          route={routeMock}
          navigation={navigationMock}
        />
      ).toJSON()
    ).toMatchSnapshot()
  })
})
