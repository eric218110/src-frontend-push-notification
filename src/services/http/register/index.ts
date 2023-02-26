import { AxiosError } from 'axios'
import { HttpResponse } from '../../../domain/models/http'
import {
  RegisterFormModel,
  RegisterUserSuccess
} from '../../../domain/models/register'
import { axiosInstance } from '../../util/axios'

export const registerNewUser = async (
  body: RegisterFormModel
): Promise<HttpResponse<RegisterUserSuccess>> => {
  try {
    const { data } = await axiosInstance().post<RegisterUserSuccess>(
      'users/register',
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
