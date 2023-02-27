import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'

export const SettingsPage = () => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Box>
        <Typography variant="h4">Configurações</Typography>
        <Divider sx={{ mt: 3, mb: 3 }} />
        <Typography sx={{ mb: 3 }} variant="subtitle2">
          Voçe ainda não possui nenhum aplicativo registrado
        </Typography>
        <Button onClick={handleClickOpen}>Cadastrar agora</Button>
      </Box>
      <Dialog open={open} disableEscapeKeyDown>
        <DialogTitle>Cadastrar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para registrar um aplicativo é necessário preencher as seguintes
            informações:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome do app"
            type="app_name"
            fullWidth
            variant="outlined"
            sx={{ mt: 3 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Enviar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
