import { AxiosError } from 'axios'
import {
  CreateApplicationForm,
  ResponseOnCreateNewApplicationSuccess
} from '../../../../domain/models/application'
import { axiosInstance } from '../../../util/axios'
import { HttpResponse } from './../../../../domain/models/http/index'

export const createNewApplication = async (
  body: CreateApplicationForm,
  accessToken: string
): Promise<HttpResponse<ResponseOnCreateNewApplicationSuccess>> => {
  try {
    const { data } = await axiosInstance(
      accessToken
    ).post<ResponseOnCreateNewApplicationSuccess>('apps', body)
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
