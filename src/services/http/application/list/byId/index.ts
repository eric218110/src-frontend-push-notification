import { ResponseOnListApplicationById } from '@domain/models/application'
import { axiosInstance } from '@services/util/axios'

export const listApplicationByIdService = async (appId: number) => {
  const { data } = await axiosInstance().get<ResponseOnListApplicationById>(
    `apps/${appId}`
  )
  return data
}
