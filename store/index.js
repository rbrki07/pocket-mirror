// @ts-check
import { combineReducers } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import { settingsReducer } from './settings'

const pmReducer = combineReducers({
  settings: settingsReducer,
})

const persistConfig = {
  key: 'pocket-mirror',
  version: 1,
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, pmReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

const persitor = persistStore(store)

export { store, persitor }
