// @ts-check
import { configureStore } from '@reduxjs/toolkit'

import { settingsReducer } from './settings'

/**
 * @param {Object} [preloadedState]
 */
const configureTestStore = (preloadedState = undefined) => {
  return configureStore({
    reducer: {
      settings: settingsReducer,
    },
    preloadedState,
  })
}

export { configureTestStore }
