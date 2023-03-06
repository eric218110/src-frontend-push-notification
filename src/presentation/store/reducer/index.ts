import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { applicationFeature, webPushFeature } from '../features'

export const store = configureStore({
  reducer: {
    [applicationFeature.NAME]: applicationFeature.reducer,
    [webPushFeature.NAME]: webPushFeature.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
