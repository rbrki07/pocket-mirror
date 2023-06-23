// @ts-check
import { THEME } from '../style/theme'
import { getTheme } from './useTheme'

describe('useTheme hook', () => {
  it('should return light theme if currentTheme is light', () => {
    const theme = getTheme({
      currentTheme: 'light',
      colorScheme: 'dark',
      defaultTheme: 'dark',
    })
    expect(theme).toEqual(THEME['light'])
  })

  it('should return dark theme if currentTheme is dark', () => {
    const theme = getTheme({
      currentTheme: 'dark',
      colorScheme: 'light',
      defaultTheme: 'light',
    })
    expect(theme).toEqual(THEME['dark'])
  })

  it('should return light theme if currentTheme is undefined and colorScheme is light', () => {
    const theme = getTheme({
      currentTheme: undefined,
      colorScheme: 'light',
      defaultTheme: 'dark',
    })
    expect(theme).toEqual(THEME['light'])
  })

  it('should return dark theme if currentTheme is undefined and colorScheme is dark', () => {
    const theme = getTheme({
      currentTheme: undefined,
      colorScheme: 'dark',
      defaultTheme: 'light',
    })
    expect(theme).toEqual(THEME['dark'])
  })

  it('should return light theme if currentTheme is undefined and colorScheme is undefined', () => {
    const theme = getTheme({
      currentTheme: undefined,
      colorScheme: undefined,
      defaultTheme: 'light',
    })
    expect(theme).toEqual(THEME['light'])
  })

  it('should return dark theme if currentTheme is undefined and colorScheme is undefined', () => {
    const theme = getTheme({
      currentTheme: undefined,
      colorScheme: undefined,
      defaultTheme: 'dark',
    })
    expect(theme).toEqual(THEME['dark'])
  })
})
