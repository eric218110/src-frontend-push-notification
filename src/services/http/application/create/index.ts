import {
  CreateApplicationForm,
  ResponseOnCreateNewApplicationSuccess
} from '@domain/models/application'
import { HttpResponse } from '@domain/models/http'
import { api } from '@services/util/api'
import { AxiosError } from 'axios'

export const createNewApplication = async (
  body: CreateApplicationForm
): Promise<HttpResponse<ResponseOnCreateNewApplicationSuccess>> => {
  try {
    const { data } = await api.post<ResponseOnCreateNewApplicationSuccess>(
      'apps',
      body
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
