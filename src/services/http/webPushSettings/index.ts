import { HttpResponse } from '@domain/models/http'
import { WebPushSettingsCreateForm } from '@domain/models/settings/webpush'
import { axiosInstance } from '@services/util/axios'
import { AxiosError } from 'axios'

export const addWebPushSettingsInApplication = async (
  webPushSettingsCreateForm: WebPushSettingsCreateForm,
  applicationId: number
): Promise<HttpResponse<boolean>> => {
  try {
    const body = makeBody(webPushSettingsCreateForm)

    const { data } = await axiosInstance().post(
      `apps/${applicationId}/webpushes/settings`,
      body
    )
    return { data: !!data }
  } catch (err) {
    const error = err as unknown as AxiosError<{ error: string }>

    const message = error.response?.data?.error || error?.message || ''

    return {
      error: {
        message
      }
    }
  }
}

const makeBody = (params: WebPushSettingsCreateForm) => {
  return {
    site: {
      name: params.name,
      address: params.address,
      url_icon: params.url_icon
    },
    allow_notification: {
      message_text: params.message_text,
      allow_button_text: params.allow_button_text,
      deny_button_text: params.deny_button_text
    },
    welcome_notification: {
      message_title: params.message_title,
      message_text: params.message_text,
      enable_url_redirect: params.enable_url_redirect,
      url_redirect: params.url_redirect
    }
  }
}
