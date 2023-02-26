import SendIcon from '@mui/icons-material/Send'
import { Container, TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Controller, useForm } from 'react-hook-form'
import imageOverlay from '../../../assets/overlay-2.jpg'
import { LoginFormModel } from '../../../domain/models/login'
import { useValidator } from '../../validators'
import './style.css'

export const LoginPage = (): JSX.Element => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { isValid }
  } = useForm<LoginFormModel>({ defaultValues: { login: '', password: '' } })

  const { emailIsValid, passwordIsMinLenght } = useValidator()

  const onSubmit = ({ login, password }: LoginFormModel) => {
    if (passwordIsMinLenght(password)) {
      setError('password', {
        type: 'minLength',
        message: 'O campo deve ser maior ou igual a oito'
      })
    }
    if (!emailIsValid(login)) {
      setError('login', {
        type: 'pattern',
        message: 'O campo precisa ser um email valido'
      })
    }
  }

  return (
    <Container
      maxWidth="lg"
      className="root-wrapper"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${imageOverlay})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
      fixed
    >
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
                  id="outlined-adornment-password"
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
                disabled={!isValid}
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
              >
                Entrar
              </Button>
              <Stack alignItems="center">
                <Typography variant="subtitle1" color={'GrayText'}>
                  Não possui conta?
                  <Button variant="text">Cadastrar</Button>
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
    </Container>
  )
}
