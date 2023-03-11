import { ResponsePaginationApplicationItemsTypes } from '@domain/models/application'

type Column = {
  id: 'name' | 'webPush' | 'email' | 'sms'
  label: string
  minWidth?: number
  align?: 'center'
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Nome', minWidth: 170 },
  { id: 'webPush', label: 'Web Push', minWidth: 100, align: 'center' },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
    align: 'center'
  },
  {
    id: 'sms',
    label: 'SMS',
    minWidth: 170,
    align: 'center'
  }
]

type Data = {
  id: number
  name: string
  webPush: boolean
  email: boolean
  sms: boolean
}

const createData = ({
  app_name,
  channel,
  id
}: ResponsePaginationApplicationItemsTypes): Data => {
  return {
    id,
    name: app_name,
    webPush: channel.webpush,
    email: channel.email,
    sms: channel.sms
  }
}

export const useAppsPage = () => {
  return {
    table: {
      columns,
      createData
    }
  }
}
