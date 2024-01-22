// @ts-check
import React from 'react'
import { LogBox } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persitor } from './store'
import { PMMain } from './components/PMMain'

LogBox.ignoreLogs([
  "[Reanimated] Couldn't determine the version of the native part of Reanimated.",
])

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persitor}>
        <PMMain />
      </PersistGate>
    </Provider>
  )
}
