import { ResponseOnListApplicationById } from '@domain/models/application'
import { api } from '@services/util/api'

export const listApplicationByIdService = async (appId: number) => {
  const { data } = await api.get<ResponseOnListApplicationById>(`apps/${appId}`)
  return data
}
