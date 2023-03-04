import { CreateApplicationForm } from '@domain/models/application'
import { ChannelPossibles } from '@domain/models/channel'
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { onAddApplication } from '@presentation/store/features/application'
import { useServices } from '@services/index'
import { useSnackbar } from 'notistack'
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

type AppInformationsProps = {
  onNext: () => void
}

type FormType = CreateApplicationForm & {
  channel: string
}

export type AppInformationsRef = {
  loadCurrentChannel: () => ChannelPossibles
}

export const AppInformations = forwardRef<
  AppInformationsRef,
  AppInformationsProps
>(({ onNext }, ref): JSX.Element => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { isValid }
  } = useForm<FormType>({ defaultValues: { app_name: '', channel: '' } })

  const loadCurrentChannel = useCallback(
    () => getValues('channel') as ChannelPossibles,
    []
  )

  useImperativeHandle(ref, () => ({ loadCurrentChannel }), [loadCurrentChannel])

  const { createNewApplication } = useServices()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const dispath = useDispatch()

  const onSubmit = async (form: FormType) => {
    setLoading(true)
    const { data, error } = await createNewApplication(form)
    if (data) {
      dispath(onAddApplication(data))
      onNext()
      enqueueSnackbar(`App ${form.app_name} criado com sucesso`, {
        variant: 'info'
      })
      setLoading(false)
      return
    }

    if (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
      setLoading(false)
      return
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography>
        Para registrar um aplicativo é necessário preencher as seguintes
        informações:
      </Typography>
      <Controller
        name={'app_name'}
        control={control}
        rules={{ required: true }}
        render={({
          field: { onChange, value },
          fieldState: { error, invalid }
        }) => (
          <TextField
            autoFocus
            placeholder="Informe o nome de sua aplicação"
            type="text"
            onChange={onChange}
            value={value}
            error={invalid}
            margin="dense"
            label="Nome do app"
            fullWidth
            variant="outlined"
            disabled={loading}
            sx={{ mt: 3 }}
            helperText={
              error?.type === 'required' ? 'Campo obrigatório' : error?.message
            }
          />
        )}
      />
      <Controller
        name={'channel'}
        control={control}
        rules={{ required: true }}
        render={({
          field: { onChange, value },
          fieldState: { error, invalid }
        }) => (
          <FormControl sx={{ mt: 2, minWidth: '100%' }} error={invalid}>
            <InputLabel htmlFor="chanel">Selecione o canal</InputLabel>
            <Select
              disabled={loading}
              value={value}
              label="Selecione o canal"
              onChange={onChange}
            >
              <MenuItem value="web-push">Web Push</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="sms">SMS</MenuItem>
            </Select>
            {error && error.type === 'required' && (
              <FormHelperText>Campo obrigatório</FormHelperText>
            )}
          </FormControl>
        )}
      />

      <Box sx={{ mt: 2 }}>
        <div>
          <Button
            disabled={!isValid || loading}
            variant="contained"
            type="submit"
            sx={{ mt: 1, mr: 1 }}
          >
            Continuar
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
          <Button disabled sx={{ mt: 1, mr: 1 }}>
            Back
          </Button>
        </div>
      </Box>
    </form>
  )
})

AppInformations.displayName = 'AppInformations'
