import { SnackbarProvider } from 'notistack'
import { Routes } from '../routes'

export const MainProviders = () => (
  <SnackbarProvider maxSnack={3}>
    <Routes />
  </SnackbarProvider>
)
