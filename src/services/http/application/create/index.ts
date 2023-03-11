import {
  CreateApplicationForm,
  ResponseOnCreateNewApplicationSuccess
} from '@domain/models/application'
import { api } from '@services/util/api'

export const createNewApplication = async (
  body: CreateApplicationForm
): Promise<ResponseOnCreateNewApplicationSuccess> => {
  const { data } = await api.post<ResponseOnCreateNewApplicationSuccess>(
    'apps',
    body
  )

  return data
}
