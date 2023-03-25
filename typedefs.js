/**
 * @namespace typedefs
 */

/**
 * @typedef {'light' | 'dark' | undefined} ColorScheme
 */

/**
 * @typedef {Object} Theme
 * @property {String} backgroundColor
 * @property {String} textColor
 * @property {String} borderColor
 * @property {String} iconColor
 * @property {import("expo-status-bar").StatusBarStyle} statusBarStyle
 */

/**
 * @typedef {Object} Setting
 * @property {'currentTheme' | 'currentWhiteBalance'} key
 * @property {ColorScheme | import("expo-camera").WhiteBalance} value
 */

/**
 * @typedef {Object} CurrentThemeSetting
 * @property {'currentTheme'} key
 * @property {ColorScheme} value
 */

/**
 * @typedef {Object} CurrentWhiteBalanceSetting
 * @property {'currentWhiteBalance'} key
 * @property {import("expo-camera").WhiteBalance} value
 */

/**
 * @typedef {Setting[]} Settings
 */

/**
 * @typedef {Object} SettingAction
 * @property {string} type
 * @property {Setting} [payload]
 */

exports.unused = {}
