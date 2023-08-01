// @ts-check
import { act, renderHook } from '@testing-library/react-native'
import { useAppInForeground } from './useAppInForeground'
import { AppState } from 'react-native'

describe('useAppInForeground hook', () => {
  it('should detect the app is in foreground, if appState is "active"', () => {
    const appStateSpy = jest.spyOn(AppState, 'addEventListener')
    const { result } = renderHook(() => useAppInForeground())
    act(() => {
      appStateSpy.mock.calls[0][1]('active')
    })
    expect(result.current).toEqual(true)
  })
  it('should detect the app is in background, if appState is "background"', () => {
    const appStateSpy = jest.spyOn(AppState, 'addEventListener')
    const { result } = renderHook(() => useAppInForeground())
    act(() => {
      appStateSpy.mock.calls[0][1]('background')
    })
    expect(result.current).toEqual(true)
  })
  it('should detect the app is in background, if appState is "inactive"', () => {
    const appStateSpy = jest.spyOn(AppState, 'addEventListener')
    const { result } = renderHook(() => useAppInForeground())
    act(() => {
      appStateSpy.mock.calls[0][1]('inactive')
    })
    expect(result.current).toEqual(true)
  })
})
