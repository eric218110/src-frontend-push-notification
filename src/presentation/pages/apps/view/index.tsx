import { Divider, Stack, Typography } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { Button } from '@presentation/components/button'
import {
  fetchWebPushSettingsAndApplication,
  useWebPushSettingsWithApplication
} from '@presentation/store/features/web-push-settings'
import { useAppDispatch } from '@presentation/store/reducer'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const ViewApp = () => {
  const { pathname } = useLocation()
  const appId = Number(pathname.split('/').pop())
  const { data, isLoading } = useWebPushSettingsWithApplication()
  const dispath = useAppDispatch()

  useEffect(() => {
    dispath(fetchWebPushSettingsAndApplication(appId))
  }, [])

  return (
    <>
      <Backdrop
        sx={{
          color: theme => theme.palette.primary.main,
          zIndex: theme => theme.zIndex.drawer + 1
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Stack gap={3}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4" color="Highlight">
            {data.app_name}
          </Typography>
          {data.active_channels.webpush && (
            <Button color="secondary">Desativar</Button>
          )}
          {!data.active_channels.webpush && (
            <Button color="secondary">Ativar</Button>
          )}
        </Stack>
        <Divider />
        {data.settings && (
          <Stack gap={3}>
            <Typography color="Highlight">
              Configuração de notificação
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <div>
                <Typography color="GrayText">Canal selecionado</Typography>
                <Typography variant="inherit">Web Push</Typography>
              </div>
              {Object.entries(data.settings.site).map(([key, value]) => (
                <Stack justifyContent="center" key={key}>
                  <Typography color="GrayText">{key}</Typography>
                  <Typography variant="inherit">{value}</Typography>
                </Stack>
              ))}
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              {Object.entries(data.settings.welcome_notification)
                .map(([key, value]) => {
                  if (key === 'enable_url_redirect') {
                    return [key, value === 1 ? 'Habilitado' : 'Desabilitado']
                  }
                  return [key, value]
                })
                .map(([key, value]) => (
                  <Stack key={key}>
                    <Typography color="GrayText">{key}</Typography>
                    <Typography variant="inherit">{value}</Typography>
                  </Stack>
                ))}
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              {Object.entries(data.settings.allow_notification).map(
                ([key, value]) => (
                  <Stack key={key}>
                    <Typography color="GrayText">{key}</Typography>
                    <Typography variant="inherit">{value}</Typography>
                  </Stack>
                )
              )}
            </Stack>
          </Stack>
        )}
      </Stack>
    </>
  )
}
