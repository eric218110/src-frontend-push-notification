import { LoginFormModel, LoginSuccess } from '@domain/models/login'
import GoogleIcon from '@mui/icons-material/Google'
import SendIcon from '@mui/icons-material/Send'
import {
  CircularProgress,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { useAuth } from '@presentation/hooks/auth'
import { useValidator } from '@presentation/validators'
import { useGoogleLogin } from '@react-oauth/google'
import { signSocialWithGoogle } from '@services/http/social/google'
import { useServices } from '@services/index'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

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
  const [loadingGoogle, setLoadingGoogle] = useState(false)
  const { emailIsValid, passwordIsMinLenght } = useValidator()
  const { authByLoginAndPassword } = useServices()
  const { onAuth } = useAuth()

  const onSuccessAuthAndRedirect = (data: LoginSuccess) => {
    onAuth(data)
    enqueueSnackbar('Login realizado com sucesso', { variant: 'success' })
    navigate('/')
  }

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
    const { error, data } = await authByLoginAndPassword({ login, password })
    if (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
    if (data) {
      onSuccessAuthAndRedirect(data)
    }
    setLoading(false)
  }

  const handlerOnPresRegister = () => {
    navigate('register')
  }

  const { palette } = useTheme()

  const signWithGoogle = useGoogleLogin({
    onSuccess: async codeResponse => {
      setLoadingGoogle(true)
      const { data, error } = await signSocialWithGoogle(
        codeResponse.access_token
      )
      if (data) {
        onSuccessAuthAndRedirect(data)
        setLoadingGoogle(false)
        return
      }
      if (error) {
        enqueueSnackbar(error.message, { variant: 'error' })
      }
      setLoadingGoogle(false)
    },
    flow: 'implicit'
  })

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
            backgroundColor:
              palette.background.default === '#121212'
                ? 'rgba(0,0,0,0.9)'
                : 'rgba(256,256,256,0.9)'
          }}
        >
          <Stack sx={{ width: '40ch' }}>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<GoogleIcon />}
              disabled={loadingGoogle}
              onClick={() => signWithGoogle()}
            >
              Continuar com o Google
              {loadingGoogle && (
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
          </Stack>
          <Typography
            sx={{ mb: 3, mt: 3 }}
            variant="subtitle1"
            color={'GrayText'}
          >
            ou
          </Typography>
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
          sx={{
            backgroundColor:
              palette.background.default === '#121212'
                ? 'rgba(0,0,0,0.3)'
                : 'rgba(256,256,256,0)'
          }}
        ></Grid>
      </Grid>
    </form>
  )
}
