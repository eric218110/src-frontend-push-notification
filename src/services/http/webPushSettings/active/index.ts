import { HttpResponse } from '@domain/models/http'
import { UpdateStatusWebPushSettings } from '@domain/models/settings/webpush'
import { axiosInstance } from '@services/util/axios'
import { AxiosError } from 'axios'

export const activeWebPushSettings = async (
  appId: number
): Promise<HttpResponse<UpdateStatusWebPushSettings>> => {
  try {
    const { data } = await axiosInstance().put(
      `apps/${appId}/webpushes/settings`
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
