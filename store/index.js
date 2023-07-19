// @ts-check
import { combineReducers } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  createMigrate,
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
import { migrations, settingsReducer } from './settings'

const pmReducer = combineReducers({
  settings: settingsReducer,
})

const persistConfig = {
  key: 'pocket-mirror',
  version: 1,
  storage: AsyncStorage,
  migrate: createMigrate(migrations, { debug: false }),
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
