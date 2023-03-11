export type CreateApplicationForm = {
  app_name: string
}

export type ResponseOnCreateNewApplicationSuccess = {
  app_id: number
  app_token: string
}

export type OnSuccessCreateApp = CreateApplicationForm &
  ResponseOnCreateNewApplicationSuccess

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

export type ResponsePaginationApplicationItemsTypes = CreateApplicationForm & {
  id: number
  channel: ChanelTypes
}

export type ResponsePaginationApplication = {
  items: ResponsePaginationApplicationItemsTypes[]
  count: number
}
