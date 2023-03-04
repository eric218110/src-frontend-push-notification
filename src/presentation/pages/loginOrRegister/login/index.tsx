import GoogleIcon from '@mui/icons-material/Google'
import SendIcon from '@mui/icons-material/Send'
import { Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Button } from '@presentation/components/button'
import { Input } from '@presentation/components/input'
import { useLoginOutlet } from './view-model'

export const LoginOutlet = (): JSX.Element => {
  const { form, googleAuth, palette, register } = useLoginOutlet()

  return (
    <form onSubmit={form.handleSubmit(form.onSubmit)}>
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
              color="secondary"
              endIcon={<GoogleIcon />}
              disabled={googleAuth.loading}
              onClick={() => googleAuth.sign()}
            >
              Continuar com o Google
            </Button>
          </Stack>
          <Typography
            sx={{ mb: 3, mt: 3 }}
            variant="subtitle1"
            color={'GrayText'}
          >
            ou
          </Typography>
          {Object.entries(form.inputs).map(
            ([key, { placeholder, label, type }]) => (
              <Stack sx={{ width: '40ch' }} key={key}>
                <Input
                  name={key}
                  control={form.control}
                  placeholder={placeholder}
                  label={label}
                  isLoading={form.isSubmitting}
                  type={type}
                />
              </Stack>
            )
          )}
          <Stack sx={{ m: 5, width: '40ch' }} direction="column" spacing={2}>
            <Button
              disabled={!form.isValid || form.isSubmitting}
              endIcon={<SendIcon />}
            >
              Entrar
            </Button>
            <Stack alignItems="center">
              <Typography variant="subtitle1" color={'GrayText'}>
                Não possui conta?
                <Button onClick={register.handlerOnPresRegister} variant="text">
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
