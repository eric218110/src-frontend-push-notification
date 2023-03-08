import { useServices } from '@services/index'
import { useQuery } from 'react-query'
import { useKey } from './../keys/index'

export const useQueryWebPushWithApplication = (applicationId: number) => {
  const { listWebPushSettingsInApplicationById, listApplicationByIdService } =
    useServices()

  const keyApp = useKey('listApplicationByIdService')
  const keyWebPush = useKey('listWebPushSettingsInApplicationById')

  const { data: webPushSettings, isLoading } = useQuery(keyApp, () =>
    listWebPushSettingsInApplicationById(applicationId)
  )

  const { data: appInformations } = useQuery(keyWebPush, () =>
    listApplicationByIdService(applicationId)
  )

  return {
    appInformations,
    webPushSettings,
    isLoading
  }
}
