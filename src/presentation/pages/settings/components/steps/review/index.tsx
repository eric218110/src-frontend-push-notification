import { Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { Button } from '@presentation/components/button'
import { useWebPushSettings } from '@presentation/pages/settings/hook'
import { useNavigate } from 'react-router-dom'

type ReviewWebPushSettingsProps = {
  onClose: () => void
}

export const ReviewWebPushSettings = (props: ReviewWebPushSettingsProps) => {
  const { onClose } = props
  const { app_name, app_id } = useWebPushSettings().loadInformations()
  const navigate = useNavigate()

  const handlerOnClose = () => {
    onClose()
    navigate(`/apps/${app_id}`)
  }

  return (
    <Stack sx={{ mt: 3, mb: 3 }} gap={2} alignItems="flex-start">
      <Typography>
        {`Configurações de web push adicionada no aplicativo "${app_name}". Clique abaixo para visualizar mais detalhes.`}
      </Typography>
      <Button variant="text" onClick={handlerOnClose}>
        {`Ver ${app_name}`}
      </Button>
    </Stack>
  )
}
