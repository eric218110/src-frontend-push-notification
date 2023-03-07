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

type ChanelTypes = {
  webpush: boolean
  email: boolean
  sms: boolean
}

export type ResponseOnListApplicationById = CreateApplicationForm & {
  active_channels: ChanelTypes
}

type ResponsePaginationApplicationItemsTypes = CreateApplicationForm & {
  channel: ChanelTypes
}

export type ResponsePaginationApplication = {
  items: ResponsePaginationApplicationItemsTypes[]
  count: number
}
