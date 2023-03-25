// @ts-check
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

/**
 * @typedef {Object} obj
 * @property {typedefs.ColorScheme} obj.scheme
 * @property {typedefs.Theme} obj.scheme.theme
 */
const THEME = {
  light: {
    backgroundColor: '#fff',
    textColor: '#000',
    borderColor: '#000',
    iconColor: '#000',
    statusBarStyle: 'dark',
  },
  dark: {
    backgroundColor: '#000',
    textColor: '#fff',
    borderColor: '#fff',
    iconColor: '#fff',
    statusBarStyle: 'light',
  },
}

export { THEME }
