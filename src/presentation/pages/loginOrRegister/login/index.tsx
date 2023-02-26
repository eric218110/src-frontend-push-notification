import SendIcon from '@mui/icons-material/Send'
import { CircularProgress, TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { LoginFormModel } from '../../../../domain/models/login'
import { useServices } from '../../../../services'
import { useValidator } from '../../../validators'

export const LoginOutlet = (): JSX.Element => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { isValid }
  } = useForm<LoginFormModel>({ defaultValues: { login: '', password: '' } })
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const { emailIsValid, passwordIsMinLenght } = useValidator()
  const { authByLoginAndPassword } = useServices()

  const onSubmit = async ({ login, password }: LoginFormModel) => {
    if (passwordIsMinLenght(password)) {
      setError('password', {
        type: 'minLength',
        message: 'O campo deve ser maior ou igual a oito'
      })
      return
    }
    if (!emailIsValid(login)) {
      setError('login', {
        type: 'pattern',
        message: 'O campo precisa ser um email valido'
      })
      return
    }
    setLoading(true)
    const { error } = await authByLoginAndPassword({ login, password })
    if (error) {
      console.log(error)
      enqueueSnackbar(error.message, { variant: 'error' })
    }
    setLoading(false)
  }

  const handlerOnPresRegister = () => {
    navigate('register')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container minHeight={160} height="100vh">
        <Grid
          lg
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{
            backgroundColor: 'rgba(256, 256, 256, 0.85)'
          }}
        >
          <Controller
            name={'login'}
            control={control}
            rules={{ required: true }}
            render={({
              field: { onChange, value },
              fieldState: { error, invalid }
            }) => (
              <TextField
                sx={{ mb: 4, width: '40ch' }}
                type={'text'}
                label="Login"
                onChange={onChange}
                value={value}
                error={invalid}
                helperText={
                  error?.type === 'required'
                    ? 'Campo obrigatório'
                    : error?.message
                }
              />
            )}
          />

          <Controller
            name={'password'}
            control={control}
            rules={{ required: true }}
            render={({
              field: { onChange, value },
              fieldState: { error, invalid }
            }) => (
              <>
                <TextField
                  sx={{ mb: 2, width: '40ch' }}
                  variant="outlined"
                  id="outlined-adornment-password"
                  type={'password'}
                  label="Password"
                  onChange={onChange}
                  value={value}
                  error={invalid}
                  helperText={
                    error?.type === 'required'
                      ? 'Campo obrigatório'
                      : error?.message
                  }
                />
              </>
            )}
          />

          <Stack sx={{ m: 5, width: '40ch' }} direction="column" spacing={2}>
            <Button
              disabled={!isValid || loading}
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
            >
              Entrar
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

            <Stack alignItems="center">
              <Typography variant="subtitle1" color={'GrayText'}>
                Não possui conta?
                <Button onClick={handlerOnPresRegister} variant="text">
                  Cadastrar
                </Button>
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          xs
          display="flex"
          justifyContent="center"
          alignItems="center"
        ></Grid>
      </Grid>
    </form>
  )
}
