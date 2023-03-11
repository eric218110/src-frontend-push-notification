import { AxiosError } from 'axios'

export const normalizeHttpError = (err: unknown) => {
  if (!err) return
  const error = err as unknown as AxiosError<{ error: string }>

  const message = error?.response?.data?.error || error?.message || ''

  return {
    message
  }
}
