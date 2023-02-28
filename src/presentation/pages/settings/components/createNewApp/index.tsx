import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { CreateApplicationForm } from '../../../../../domain/models/application'
import { useServices } from '../../../../../services'
import { useAuth } from '../../../../hooks/auth'

type CreateNewAppComponentProps = {
  isOpen: boolean
  onClose: () => void
}

export const CreateNewAppComponent = ({
  isOpen,
  onClose
}: CreateNewAppComponentProps): JSX.Element => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid }
  } = useForm<CreateApplicationForm>({ defaultValues: { app_name: '' } })

  const [loading, setLoading] = useState(false)
  const { auth } = useAuth()
  const { createNewApplication } = useServices()
  const { enqueueSnackbar } = useSnackbar()

  const handlerOnClose = () => {
    onClose()
    reset()
  }

  const closeAndFinish = () => {
    handlerOnClose()
    setLoading(false)
  }

  const onSubmit = async (form: CreateApplicationForm) => {
    setLoading(true)
    const accessToken = auth?.token || ''
    const { data, error } = await createNewApplication(form, accessToken)
    if (data) {
      enqueueSnackbar(`Aplicativo ${form.app_name} registrado com sucesso`, {
        variant: 'success'
      })
      closeAndFinish()
      return
    }

    if (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
      closeAndFinish()
      return
    }
  }

  return (
    <Dialog open={isOpen} disableEscapeKeyDown>
      <DialogTitle>Cadastrar</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            Para registrar um aplicativo é necessário preencher as seguintes
            informações:
          </DialogContentText>
          <Controller
            name={'app_name'}
            control={control}
            rules={{ required: true }}
            render={({
              field: { onChange, value },
              fieldState: { error, invalid }
            }) => (
              <TextField
                placeholder="Informe o nome de sua aplicação"
                type="text"
                onChange={onChange}
                value={value}
                error={invalid}
                autoFocus
                margin="dense"
                label="Nome do app"
                fullWidth
                variant="outlined"
                sx={{ mt: 3 }}
                helperText={
                  error?.type === 'required'
                    ? 'Campo obrigatório'
                    : error?.message
                }
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlerOnClose}>Cancelar</Button>
          <Button disabled={!isValid || loading} type="submit">
            Enviar
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px'
                }}
              />
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
