import { SnackbarProvider as Provider } from 'notistack'

export const SnackBarProvider = ({ children }: { children: JSX.Element }) => (
  <Provider maxSnack={5}>{children}</Provider>
)
