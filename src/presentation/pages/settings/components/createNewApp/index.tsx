import { ChannelPossibles } from '@domain/models/channel'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Step,
  StepContent,
  StepLabel,
  Stepper
} from '@mui/material'
import { useRef, useState } from 'react'
import { AppInformations, AppInformationsRef } from '../steps/appInformations'
import { ChannelsDetails } from '../steps/channelsDetails'
import { ReviewWebPushSettings } from '../steps/review'

type CreateNewAppComponentProps = {
  isOpen: boolean
  onClose: () => void
}

type StepType = Record<string, JSX.Element>

export const CreateNewAppComponent = ({
  isOpen,
  onClose
}: CreateNewAppComponentProps): JSX.Element => {
  const onNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const onBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handlerOnClose = () => {
    setActiveStep(0)
    onClose()
  }

  const stepAppInformationsRef = useRef<AppInformationsRef>(null)

  const currentChanel =
    stepAppInformationsRef.current?.loadCurrentChannel() as ChannelPossibles

  const steps: StepType = {
    'informações do aplicativo': (
      <AppInformations onNext={onNext} ref={stepAppInformationsRef} />
    ),
    'Canal de notificação': (
      <ChannelsDetails
        currentChanel={currentChanel}
        onNext={onNext}
        onBack={onBack}
      />
    ),
    Finalizar: <ReviewWebPushSettings onClose={handlerOnClose} />
  }

  const [activeStep, setActiveStep] = useState(0)

  return (
    <Dialog fullWidth maxWidth="md" open={isOpen} disableEscapeKeyDown>
      <DialogTitle>Cadastrar</DialogTitle>
      <Divider />
      <DialogContent>
        <Stepper activeStep={activeStep} orientation="vertical">
          {Object.entries(steps).map(([label, element]) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>{element}</StepContent>
            </Step>
          ))}
        </Stepper>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={handlerOnClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  )
}
