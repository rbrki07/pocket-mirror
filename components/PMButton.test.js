// @ts-check
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { Provider } from 'react-redux'

import { PMButton } from './PMButton'
import { configureTestStore } from '../store/StoreTestUtils'

describe('PMButton component tests', () => {
  it('should have a border if selected is true', () => {
    const { getByTestId } = render(
      <Provider store={configureTestStore()}>
        <PMButton
          onPressCallback={() => {}}
          iconName="add"
          selected
          testID="testButton"
        />
      </Provider>
    )
    const testButton = getByTestId('testButton')
    expect(testButton).toHaveStyle({ borderWidth: 1 })
  })

  it('should have no border if selected is false - which is default', () => {
    const { getByTestId } = render(
      <Provider store={configureTestStore()}>
        <PMButton
          onPressCallback={() => {}}
          iconName="add"
          testID="testButton"
        />
      </Provider>
    )
    const testButton = getByTestId('testButton')
    expect(testButton).toHaveStyle({ borderWidth: 0 })
  })

  it('should have a lower opacity if disabled is true', () => {
    const { getByTestId } = render(
      <Provider store={configureTestStore()}>
        <PMButton
          onPressCallback={() => {}}
          iconName="add"
          disabled
          testID="testButton"
        />
      </Provider>
    )
    const testButton = getByTestId('testButton')
    expect(testButton.children[0]).toHaveStyle({ opacity: 0.25 })
  })

  it('should have no opacity if disabled is false - which is default', () => {
    const { getByTestId } = render(
      <Provider store={configureTestStore()}>
        <PMButton
          onPressCallback={() => {}}
          iconName="add"
          testID="testButton"
        />
      </Provider>
    )
    const testButton = getByTestId('testButton')
    expect(testButton.children[0]).toHaveStyle({ opacity: 1 })
  })

  it('should call onPressCallback if pressed', () => {
    const onPressCallback = jest.fn()
    const { getByTestId } = render(
      <Provider store={configureTestStore()}>
        <PMButton
          onPressCallback={onPressCallback}
          iconName="add"
          testID="testButton"
        />
      </Provider>
    )
    const testButton = getByTestId('testButton')
    fireEvent.press(testButton)
    expect(onPressCallback).toHaveBeenCalled()
  })

  it('should render correctly', () => {
    expect(
      render(
        <Provider store={configureTestStore()}>
          <PMButton onPressCallback={jest.fn()} />
        </Provider>
      ).toJSON()
    ).toMatchSnapshot()
  })
})
