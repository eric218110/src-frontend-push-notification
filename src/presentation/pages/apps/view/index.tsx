import { Divider, Stack, Typography } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { Button } from '@presentation/components/button'
import { useMutationActiveWebPushApplication } from '@presentation/query/active-web-push-application'
import { useQueryWebPushWithApplication } from '@presentation/query/web-push-with-applications'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

export const ViewApp = () => {
  const { pathname } = useLocation()
  const appId = Number(pathname.split('/').pop())

  const [isUpdating, setIsUpdating] = useState(false)

  const { appInformations, isLoading, webPushSettings } =
    useQueryWebPushWithApplication(appId)

  const { mutate } = useMutationActiveWebPushApplication()

  const handlerOpdateStatusApplication = async () => {
    setIsUpdating(true)
    mutate(appId)
    setIsUpdating(false)
  }

  return (
    <Stack sx={{ p: 3 }}>
      <Backdrop
        sx={{
          color: theme => theme.palette.primary.main,
          zIndex: theme => theme?.zIndex.drawer + 1
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Stack gap={3}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4" color="Highlight">
            {appInformations && appInformations.app_name}
          </Typography>
          {
            <Button
              isLoading={isUpdating}
              disabled={isUpdating}
              onClick={handlerOpdateStatusApplication}
              color={
                appInformations?.active_channels?.webpush ? 'error' : 'success'
              }
            >
              {appInformations?.active_channels?.webpush
                ? 'Desativar'
                : 'Ativar'}
            </Button>
          }
        </Stack>
        <Divider />
        {webPushSettings && webPushSettings?.settings?.site?.name !== '' && (
          <Stack gap={3}>
            <Typography color="Highlight">
              Configuração de notificação
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <div>
                <Typography color="GrayText">Canal selecionado</Typography>
                <Typography variant="inherit">Web Push</Typography>
              </div>
              {Object.entries(webPushSettings?.settings?.site || {}).map(
                ([key, value]) => (
                  <Stack justifyContent="center" key={key}>
                    <Typography color="GrayText">{key}</Typography>
                    <Typography variant="inherit">{value}</Typography>
                  </Stack>
                )
              )}
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              {Object.entries(
                webPushSettings?.settings?.welcome_notification || {}
              )
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
              {Object.entries(
                webPushSettings?.settings?.allow_notification || {}
              ).map(([key, value]) => (
                <Stack key={key}>
                  <Typography color="GrayText">{key}</Typography>
                  <Typography variant="inherit">{value}</Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}
