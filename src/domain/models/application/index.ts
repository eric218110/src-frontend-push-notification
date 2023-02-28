export type CreateApplicationForm = {
  app_name: string
}

export type ResponseOnCreateNewApplicationSuccess = {
  app_id: number
  app_token: string
}

export type ParamsListApplicationById = {
  appId: number
}

export type ResponseOnListApplicationById = {
  app_name: string
  active_channels: {
    webpush: boolean
    email: boolean
    sms: boolean
  }
}
