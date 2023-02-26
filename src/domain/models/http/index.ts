import { ErrorHandler } from '../error'

export type HttpResponse<T> = {
  data?: T
  error?: ErrorHandler
}
