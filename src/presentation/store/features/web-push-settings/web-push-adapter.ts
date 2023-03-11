import { createAsyncThunk } from '@reduxjs/toolkit'
import { State } from './web-push-state'

export const fetchWebPushSettingsAndApplication = createAsyncThunk(
  'fetchWebPushSettingsAndApplication',
  async (appId: number): Promise<Omit<State, 'isLoading'>> => {
    console.log(appId)
    throw new Error('Not possible read data')
  }
)
