// @ts-check
import { getThemeName } from './ThemeUtil'

describe('useTheme hook', () => {
  it('should return light if currentTheme is light', () => {
    const themeName = getThemeName({
      currentTheme: 'light',
      colorScheme: 'dark',
      defaultTheme: 'dark',
    })
    expect(themeName).toEqual('light')
  })

  it('should return dark if currentTheme is dark', () => {
    const themeName = getThemeName({
      currentTheme: 'dark',
      colorScheme: 'light',
      defaultTheme: 'light',
    })
    expect(themeName).toEqual('dark')
  })

  it('should return light if currentTheme is undefined and colorScheme is light', () => {
    const themeName = getThemeName({
      currentTheme: undefined,
      colorScheme: 'light',
      defaultTheme: 'dark',
    })
    expect(themeName).toEqual('light')
  })

  it('should return dark if currentTheme is undefined and colorScheme is dark', () => {
    const themeName = getThemeName({
      currentTheme: undefined,
      colorScheme: 'dark',
      defaultTheme: 'light',
    })
    expect(themeName).toEqual('dark')
  })

  it('should return light if currentTheme is undefined and colorScheme is undefined', () => {
    const themeName = getThemeName({
      currentTheme: undefined,
      colorScheme: undefined,
      defaultTheme: 'light',
    })
    expect(themeName).toEqual('light')
  })

  it('should return dark if currentTheme is undefined and colorScheme is undefined', () => {
    const themeName = getThemeName({
      currentTheme: undefined,
      colorScheme: undefined,
      defaultTheme: 'dark',
    })
    expect(themeName).toEqual('dark')
  })
})
