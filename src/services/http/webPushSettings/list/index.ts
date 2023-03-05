import { HttpResponse } from '@domain/models/http'
import { ListWebPushSettings } from '@domain/models/settings/webpush'
import { axiosInstance } from '@services/util/axios'
import { AxiosError } from 'axios'

export const listWebPushSettingsInApplicationById = async (
  applicationId: number
): Promise<HttpResponse<ListWebPushSettings>> => {
  try {
    const { data } = await axiosInstance().get<ListWebPushSettings>(
      `apps/${applicationId}/webpushes/settings`
    )
    return { data }
  } catch (err) {
    const error = err as unknown as AxiosError<{ error: string }>

    const message = error.response?.data?.error || error?.message || ''

    return {
      error: {
        message
      }
    }
  }
}
