import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock'

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext)

jest.mock('expo-localization', () => ({
  ...jest.requireActual('expo-localization'),
  getLocales: () => [{ languageCode: 'de' }],
}))

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  default: jest.fn(),
}))

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

jest.mock('react-native/Libraries/LogBox/LogBox', () => ({
  default: {
    ignoreLogs: jest.fn(),
  },
}))

jest.mock('react-native-webview', () => {
  const React = require('react')
  return {
    // https://github.com/react-native-webview/react-native-webview/issues/3233
    WebView: () => React.Fragment,
  }
})
