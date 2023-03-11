import { ResponsePaginationApplication } from '@domain/models/application'
import { api } from '@services/util/api'

export const showAllApplication = async (
  take: number,
  skip: number
): Promise<ResponsePaginationApplication> => {
  const { data } = await api.get<ResponsePaginationApplication>(
    `apps?skip=${skip}&take=${take}`
  )
  return data
}
