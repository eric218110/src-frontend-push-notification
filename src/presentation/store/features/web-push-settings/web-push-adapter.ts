import { createAsyncThunk } from '@reduxjs/toolkit'
import { listApplicationByIdService } from '@services/http/application/list/byId'
import { listWebPushSettingsInApplicationById } from '@services/http/webPushSettings/list'
import { State } from './web-push-state'

export const fetchWebPushSettingsAndApplication = createAsyncThunk(
  'fetchWebPushSettingsAndApplication',
  async (appId: number): Promise<Omit<State, 'isLoading'>> => {
    const application = await listApplicationByIdService(appId)
    const webPushSettings = await listWebPushSettingsInApplicationById(appId)

    if (application.data && webPushSettings.data) {
      return {
        data: {
          ...webPushSettings.data,
          ...application.data
        }
      }
    }

    throw new Error('Not possible read data')
  }
)
