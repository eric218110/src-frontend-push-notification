import { ListWebPushSettings } from '@domain/models/settings/webpush'
import { axiosInstance } from '@services/util/axios'

export const listWebPushSettingsInApplicationById = async (
  applicationId: number
) => {
  const { data } = await axiosInstance().get<ListWebPushSettings>(
    `apps/${applicationId}/webpushes/settings`
  )
  return data
}
