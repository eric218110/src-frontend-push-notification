import {
  CreateApplicationForm,
  ResponseOnCreateNewApplicationSuccess
} from '@domain/models/application'
import { WebPushSettingsCreateForm } from '@domain/models/settings/webpush'
import { createContext, useCallback, useState } from 'react'

type Application = CreateApplicationForm & ResponseOnCreateNewApplicationSuccess

type WebPushSettingsContextType = {
  onAddApplication: (application: Application) => void
  onAddWebPushSettings: (webPushSettings: WebPushSettingsCreateForm) => void
  loadInformations: () => Application & WebPushSettingsCreateForm
}

type WebPushSettingsProviderType = {
  children: JSX.Element
}

const initialStateApp: Application = {
  app_id: 0,
  app_name: '',
  app_token: ''
}

const initialStateWebPush: WebPushSettingsCreateForm = {
  address: '',
  allow_button_text: '',
  deny_button_text: '',
  enable_url_redirect: 0,
  message_text: '',
  message_text_allow_notification: '',
  message_title: '',
  name: '',
  url_icon: '',
  url_redirect: ''
}

export const WebPushSettingsContext = createContext<WebPushSettingsContextType>(
  {} as WebPushSettingsContextType
)

export const WebPushSettingsProvider = ({
  children
}: WebPushSettingsProviderType) => {
  const [application, setApplication] = useState(initialStateApp)
  const [webPushSettings, setWebPushSettings] = useState(initialStateWebPush)

  const onAddApplication = (props: Application) => {
    setApplication(() => ({ ...props }))
  }

  const onAddWebPushSettings = (props: WebPushSettingsCreateForm) => {
    setWebPushSettings(() => ({ ...props }))
  }

  const loadInformations = useCallback((): Application &
    WebPushSettingsCreateForm => {
    return {
      ...application,
      ...webPushSettings
    }
  }, [application, webPushSettings])

  return (
    <WebPushSettingsContext.Provider
      value={{
        loadInformations,
        onAddApplication,
        onAddWebPushSettings
      }}
    >
      {children}
    </WebPushSettingsContext.Provider>
  )
}
