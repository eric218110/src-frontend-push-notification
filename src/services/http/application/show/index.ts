import { ResponsePaginationApplication } from '@domain/models/application'
import { HttpResponse } from '@domain/models/http'
import { api } from '@services/util/api'
import { AxiosError } from 'axios'

export const showAllApplication = async (
  take: number,
  skip: number
): Promise<HttpResponse<ResponsePaginationApplication[]>> => {
  try {
    const { data } = await api.get<ResponsePaginationApplication[]>(
      `apps?skip=${skip}&take=${take}`
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
