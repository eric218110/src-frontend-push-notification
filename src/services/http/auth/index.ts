import { HttpResponse } from '@domain/models/http'
import { LoginFormModel, LoginSuccess } from '@domain/models/login'
import { api } from '@services/util/api'
import { AxiosError } from 'axios'

export const authByLoginAndPassword = async (
  body: LoginFormModel
): Promise<HttpResponse<LoginSuccess>> => {
  try {
    const { data } = await api.post<LoginSuccess>('login', body)
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
