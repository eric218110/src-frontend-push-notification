import { ResponseOnCreateNewApplicationSuccess } from '@domain/models/application'
import { ResponsePaginationApplication } from '@domain/models/application/index'
import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import { fetchAllApplication } from './application-adapter'

type ApplicationState = {
  applications: ResponseOnCreateNewApplicationSuccess[]
  showAllApplication: ResponsePaginationApplication
  isLoading: boolean
  error?: string
}

export const NAME = 'Feature for store application'

const initialState: ApplicationState = {
  applications: [{ app_id: 0, app_token: '' }],
  showAllApplication: { items: [], count: 0 },
  isLoading: false
}

const applicationSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    onAddApplication: (
      state,
      action: PayloadAction<ResponseOnCreateNewApplicationSuccess>
    ) => {
      state.applications = [...state.applications, ...[action.payload]]
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<ApplicationState>) => {
    builder.addCase(fetchAllApplication.pending, state => {
      state.isLoading = true
    })
    builder.addCase(fetchAllApplication.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.showAllApplication = payload.data
      }
      state.isLoading = false
    })
    builder.addCase(fetchAllApplication.rejected, (state, { payload }) => {
      state = initialState
      if (payload) {
        console.log(payload)
        state.error = 'Not possible read data'
      }
    })
  }
})

export const { onAddApplication } = applicationSlice.actions
export const reducer = applicationSlice.reducer
