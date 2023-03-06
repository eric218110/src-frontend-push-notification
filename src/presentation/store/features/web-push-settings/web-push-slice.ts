import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'
import { fetchWebPushSettingsAndApplication } from './web-push-adapter'
import { initialState, State } from './web-push-state'

export const NAME =
  'Feature for load settings Web Push and application information with fetch API'

const webPushSettingsSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<State>) => {
    builder.addCase(fetchWebPushSettingsAndApplication.pending, state => {
      state.isLoading = true
    })
    builder.addCase(
      fetchWebPushSettingsAndApplication.fulfilled,
      (state, { payload }) => {
        state.data = payload.data
        state.isLoading = false
      }
    )
    builder.addCase(fetchWebPushSettingsAndApplication.rejected, state => {
      state = initialState
      state.error = 'Not possible read data'
    })
  }
})

export const { reducer } = webPushSettingsSlice
