import { ResponseOnListApplicationById } from '@domain/models/application'
import { HttpResponse } from '@domain/models/http'
import { axiosInstance } from '@services/util/axios'
import { AxiosError } from 'axios'

export const ListApplicationByIdService = async (
  appId: number
): Promise<HttpResponse<ResponseOnListApplicationById>> => {
  try {
    const { data } = await axiosInstance().get<ResponseOnListApplicationById>(
      `apps/${appId}`
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
