import { ResponsePaginationApplication } from '@domain/models/application'
import { HttpResponse } from '@domain/models/http'
import { axiosInstance } from '@services/util/axios'
import { AxiosError } from 'axios'

export const showAllApplication = async (
  take: number,
  skip: number
): Promise<HttpResponse<ResponsePaginationApplication[]>> => {
  try {
    const { data } = await axiosInstance().get<ResponsePaginationApplication[]>(
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
