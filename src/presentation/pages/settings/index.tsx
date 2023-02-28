import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext'
import { Button, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { CreateNewAppComponent } from './components/createNewApp'

export const SettingsPage = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClickOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Box>
        <Typography variant="h4">Configurações</Typography>
        <Divider sx={{ mt: 3, mb: 3 }} />
        <Typography sx={{ mb: 3 }} variant="subtitle2">
          Voçe ainda não possui nenhum aplicativo registrado
        </Typography>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          endIcon={<QueuePlayNextIcon />}
        >
          Cadastrar agora
        </Button>
      </Box>
      <CreateNewAppComponent isOpen={isOpen} onClose={handleClose} />
    </>
  )
}
