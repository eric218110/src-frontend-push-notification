import { HttpResponse } from '@domain/models/http'
import { RegisterFormModel, RegisterUserSuccess } from '@domain/models/register'
import { api } from '@services/util/api'
import { AxiosError } from 'axios'

export const registerNewUser = async (
  body: RegisterFormModel
): Promise<HttpResponse<RegisterUserSuccess>> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirme_password, ...rest } = body
    const { data } = await api.post<RegisterUserSuccess>('users/register', rest)
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
