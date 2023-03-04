import { ResponseOnCreateNewApplicationSuccess } from '@domain/models/application'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ApplicationState = {
  applications: ResponseOnCreateNewApplicationSuccess[]
}

export const NAME = 'Feature for store application'

const initialState: ApplicationState = {
  applications: [{ app_id: 0, app_token: '' }]
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
  }
})

export const { onAddApplication } = applicationSlice.actions
export const reducer = applicationSlice.reducer
