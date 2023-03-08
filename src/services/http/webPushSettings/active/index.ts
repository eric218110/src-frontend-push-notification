import { UpdateStatusWebPushSettings } from '@domain/models/settings/webpush'
import { axiosInstance } from '@services/util/axios'

export const activeWebPushSettings = async (
  appId: number
): Promise<UpdateStatusWebPushSettings> => {
  const { data } = await axiosInstance().put<UpdateStatusWebPushSettings>(
    `apps/${appId}/webpushes/settings`
  )
  return data
}
