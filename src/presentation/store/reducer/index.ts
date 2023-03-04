import { configureStore } from '@reduxjs/toolkit'
import { applicationFeature } from '../features'

export const store = configureStore({
  reducer: {
    [applicationFeature.NAME]: applicationFeature.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
