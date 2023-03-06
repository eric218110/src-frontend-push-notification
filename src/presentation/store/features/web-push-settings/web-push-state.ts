import { ResponseOnListApplicationById } from '@domain/models/application'
import { ListWebPushSettings } from '@domain/models/settings/webpush'

export type State = {
  data: ListWebPushSettings & ResponseOnListApplicationById
  isLoading: boolean
  error?: string
}

export const initialState: State = {
  isLoading: false,
  data: {
    active_channels: {
      email: false,
      sms: false,
      webpush: false
    },
    app_name: '',
    settings: {
      site: {
        address: '',
        name: '',
        url_icon: ''
      },
      allow_notification: {
        allow_button_text: '',
        deny_button_text: '',
        message_text: ''
      },
      welcome_notification: {
        enable_url_redirect: 0,
        message_text: '',
        message_title: '',
        url_redirect: ''
      }
    }
  }
}
