import { ChannelPossibles } from '@domain/models/channel'
import { Box, Divider, Typography } from '@mui/material'
import { FormWebPush } from './components/formWebPush'
type ChannelsDetailsProps = {
  currentChanel: ChannelPossibles
  onBack: () => void
  onNext: () => void
}

export const ChannelsDetails = ({
  currentChanel,
  onNext
}: ChannelsDetailsProps) => {
  return (
    <Box flexDirection="column" gap={2} display="flex">
      <Divider />
      <Typography variant="subtitle2">
        Configuraçōes para o canal:
        <Typography
          component="span"
          color="Highlight"
        >{` ${currentChanel}`}</Typography>
      </Typography>
      {currentChanel === 'web-push' && <FormWebPush onNext={onNext} />}
    </Box>
  )
}
