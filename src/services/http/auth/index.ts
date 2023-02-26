import axios, { AxiosError } from 'axios'
import { HttpResponse } from '../../../domain/models/http'
import { LoginFormModel, LoginSuccess } from '../../../domain/models/login'
import { loadEnvByKey } from '../../env'

export const authByLoginAndPassword = async (
  body: LoginFormModel
): Promise<HttpResponse<LoginSuccess>> => {
  const baseuUrl = loadEnvByKey('VITE_BASE_URL')

  const url = `${baseuUrl}login`

  try {
    const { data } = await axios.post<LoginSuccess>(url, body)
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
