import { Button, Divider, Stack, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

export const ViewApp = () => {
  const { pathname } = useLocation()

  const appId = pathname.split('/').pop()

  return (
    <Stack gap={3}>
      <Typography variant="h5">App {appId}</Typography>
      <Divider />
      <Typography>App Name</Typography>
      <Button variant="text">{`Ver`}</Button>
    </Stack>
  )
}
