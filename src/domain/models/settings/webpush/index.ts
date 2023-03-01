export type WebPushSettingsParams = {
  site: {
    name: string
    address: string
    url_icon: string
  }
  allow_notification: {
    message_text: string
    allow_button_text: string
    deny_button_text: string
  }
  welcome_notification: {
    message_title: string
    message_text: string
    enable_url_redirect: number
    url_redirect: string
  }
}

export type WebPushSettingsCreateForm = {
  name: string
  address: string
  url_icon: string
  message_text_allow_notification: string
  allow_button_text: string
  deny_button_text: string
  message_title: string
  message_text: string
  enable_url_redirect: number
  url_redirect: string
}
