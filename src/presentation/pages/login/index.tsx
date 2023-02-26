import SendIcon from '@mui/icons-material/Send'
import {
  Container,
  FormControl,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import imageOverlay from '../../../assets/overlay-2.jpg'
import './style.css'

export const LoginPage = (): JSX.Element => {
  return (
    <Container
      maxWidth="lg"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${imageOverlay})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
      fixed
    >
      <Grid color={'red'} container minHeight={160} height="100vh">
        <Grid
          lg
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <FormControl sx={{ m: 5, width: '40ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-login">Login</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={'text'}
              label="Login"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={'password'}
              label="Password"
            />
          </FormControl>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" endIcon={<SendIcon />}>
              Send
            </Button>
          </Stack>
        </Grid>
        <Grid
          xs
          display="flex"
          justifyContent="center"
          alignItems="center"
        ></Grid>
      </Grid>
    </Container>
  )
}
