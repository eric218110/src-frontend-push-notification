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
import { useState } from 'react'
import { AppInformations } from '../steps/appInformations'

type CreateNewAppComponentProps = {
  isOpen: boolean
  onClose: () => void
}

type StepType = Record<string, JSX.Element>

export const CreateNewAppComponent = ({
  isOpen,
  onClose
}: CreateNewAppComponentProps): JSX.Element => {
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const steps: StepType = {
    'informações do aplicativo': <AppInformations onNext={handleNext} />,
    'Canal de notificação': <h1>Teste</h1>,
    'Revisão dos dados': <h1>Valida</h1>
  }

  const [activeStep, setActiveStep] = useState(0)

  const handlerOnClose = () => {
    onClose()
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen} disableEscapeKeyDown>
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
