import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { pokeApi } from '../features/pokeApi'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  [pokeApi.reducerPath]: pokeApi.reducer,
})

const persistConfig = { key: 'root', version: 1, storage, whitelist: [pokeApi.reducerPath] }
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
    }).concat(pokeApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
