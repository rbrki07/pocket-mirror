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
 * @property {'currentTheme' | 'currentWhiteBalance' | 'currentZoomLevel' | 'currentLanguageCode' | 'cameraContainerHeight' | 'cameraContainerWidth' | 'cameraHeight' | 'cameraWidth'} key
 * @property {ColorScheme | import("expo-camera").WhiteBalance | Number | String} value
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
 * @typedef {Object} CurrentZoomLevelSetting
 * @property {'currentZoomLevel'} key
 * @property {Number} value
 */

/**
 * @typedef {Object} CurrentLanguageCodeSetting
 * @property {'currentLanguageCode'} key
 * @property {String} value
 */

/**
 * @typedef {Object} CameraContainerHeightSetting
 * @property {'cameraContainerHeight'} key
 * @property {Number} value
 */

/**
 * @typedef {Object} CameraContainerWidthSetting
 * @property {'cameraContainerWidth'} key
 * @property {Number} value
 */

/**
 * @typedef {Object} CameraHeightSetting
 * @property {'cameraHeight'} key
 * @property {Number} value
 */

/**
 * @typedef {Object} CameraWidthSetting
 * @property {'cameraWidth'} key
 * @property {Number} value
 */

/**
 * @typedef {Object} CameraDimensions
 * @property {Number} cameraContainerHeight
 * @property {Number} cameraContainerWidth
 * @property {Number} cameraHeight
 * @property {Number} cameraWidth
 */

/**
 * @typedef {Setting[]} Settings
 */

/**
 * @typedef {Object} SettingAction
 * @property {string} type
 * @property {Setting} [payload]
 */

/**
 * @typedef {Object} GlobalStyle
 * @property {Object} container
 * @property {Object} itemSeparatorComponent
 * @property {Object} link
 * @property {Object} listHeaderFooterComponent
 * @property {Object} text
 * @property {Object} title
 */

exports.unused = {}
