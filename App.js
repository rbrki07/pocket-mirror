// @ts-check
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { PMMain } from './components/PMMain'
import { store, persitor } from './store'

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persitor}>
        <PMMain />
      </PersistGate>
    </Provider>
  )
}
