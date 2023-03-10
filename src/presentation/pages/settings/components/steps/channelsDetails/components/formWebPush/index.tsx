import { WebPushSettingsCreateForm } from '@domain/models/settings/webpush'
import { Box, Step, StepLabel, Stepper } from '@mui/material'
import { Stack } from '@mui/system'
import { Button } from '@presentation/components/button'
import { Input } from '@presentation/components/input'
import { Select } from '@presentation/components/select'
import { useWebPushSettings } from '@presentation/pages/settings/hook'
import { useServices } from '@services/index'
import { useSnackbar } from 'notistack'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { QontoConnector, QontoStepIcon } from '../qonto'
import { inputs } from './inputs'

const steps = ['Dados básicos', 'Texto permissão', 'Texto boas vindas']

const stepsPosition = { urlInformtions: 0, textPermission: 1, textWelcome: 2 }

type FormWebPushProps = {
  onNext: () => void
}

export const FormWebPush = ({ onNext }: FormWebPushProps) => {
  const {
    handleSubmit,
    control,
    getValues,
    setError,
    watch,
    clearErrors,
    reset,
    formState: { isValid }
  } = useForm<WebPushSettingsCreateForm>()

  const [loading, setLoading] = useState(false)
  const { loadInformations, onAddWebPushSettings } = useWebPushSettings()
  const { enqueueSnackbar } = useSnackbar()
  const { addWebPushSettingsInApplication } = useServices()

  const onSubmit = async (form: WebPushSettingsCreateForm) => {
    setLoading(true)
    const { app_id } = loadInformations()
    const { data, error } = await addWebPushSettingsInApplication(form, app_id)

    if (data) {
      onAddWebPushSettings(form)
      onNext()
      enqueueSnackbar('Configurações gravadas com successo', {
        variant: 'success'
      })
      setLoading(false)
      reset()
      return
    }

    if (error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      })
    }

    setLoading(false)
  }

  useEffect(() => {
    const subscription = watch(
      (value, { name }) => name && value[name] !== '' && clearErrors(name)
    )
    return () => subscription.unsubscribe()
  }, [watch])

  const [currentStep, setCurrentStep] = useState(0)

  const handlerOnNext = useCallback(() => {
    let isError = false
    if (
      currentStep === stepsPosition.urlInformtions ||
      currentStep === stepsPosition.textPermission
    ) {
      const index =
        currentStep === stepsPosition.urlInformtions
          ? 'urlInformation'
          : 'permission'

      Object.entries(inputs[index])
        .map(([key]) => key)
        .forEach(input => {
          if (!getValues(input as keyof WebPushSettingsCreateForm)) {
            setError(input as keyof WebPushSettingsCreateForm, {
              type: 'required'
            })
            isError = true
          }
        })
    }

    if (currentStep === stepsPosition.textWelcome) {
      inputs.textWelcome.forEach(input => {
        if (!getValues(input as keyof WebPushSettingsCreateForm)) {
          setError(input as keyof WebPushSettingsCreateForm, {
            type: 'required'
          })
          isError = true
        }
      })
    }

    if (isError) return

    if (currentStep <= steps.length - 2) {
      setCurrentStep(currentStep + 1)
      return
    }
  }, [currentStep])

  const handlerOnBack = () => {
    if (currentStep - 1 >= 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={2} sx={{ mt: 3 }}>
        <Stepper
          alternativeLabel
          activeStep={currentStep}
          connector={<QontoConnector />}
        >
          {steps.map(label => (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {currentStep === stepsPosition.urlInformtions && (
          <Box>
            <Stack direction="row" gap={2} sx={{ pr: 3, pl: 3 }}>
              {Object.entries(inputs.urlInformation).map(
                ([key, { label, placeholder, focus, type }], index) => (
                  <Input
                    key={index}
                    name={key}
                    label={label}
                    placeholder={placeholder}
                    control={control}
                    isLoading={loading}
                    autoFocus={focus}
                    type={type}
                  />
                )
              )}
            </Stack>
          </Box>
        )}
        {currentStep === stepsPosition.textPermission && (
          <Box>
            <Stack direction="row" gap={2} sx={{ pr: 3, pl: 3 }}>
              {Object.entries(inputs.permission).map(
                ([key, { label, placeholder, focus, type }], index) => (
                  <Input
                    key={index}
                    name={key}
                    label={label}
                    placeholder={placeholder}
                    control={control}
                    isLoading={loading}
                    autoFocus={focus}
                    type={type}
                  />
                )
              )}
            </Stack>
          </Box>
        )}
        {currentStep === stepsPosition.textWelcome && (
          <>
            <Box>
              <Stack direction="row" gap={2} sx={{ pr: 3, pl: 3 }}>
                <Input
                  name={'message_title'}
                  label="Título da notificação"
                  placeholder="Título para a mensagem da notificação web"
                  control={control}
                  isLoading={loading}
                />
                <Input
                  name={'message_text'}
                  label="Texto da mensagem"
                  placeholder="Texto para a mensagem da notificação web"
                  control={control}
                  isLoading={loading}
                />
              </Stack>
            </Box>
            <Box>
              <Stack
                direction="row"
                gap={2}
                sx={{ pr: 3, pl: 3 }}
                alignItems="flex-start"
              >
                <Select
                  control={control}
                  label="Link de destino, ao clicar na notificação"
                  isLoading={loading}
                  name="enable_url_redirect"
                  fields={{ 1: 'Habilitar', 0: 'Desabilitar' }}
                />
                <Input
                  name={'url_redirect'}
                  label="Endereço do link de destino"
                  placeholder="Endereço do link de destino"
                  control={control}
                  isLoading={loading}
                />
              </Stack>
            </Box>
          </>
        )}
        <Stack
          gap={2}
          direction="row"
          justifyContent="end"
          sx={{ mt: 3, mr: 3 }}
        >
          <Button variant="outlined" onClick={handlerOnBack}>
            Anterior
          </Button>
          {currentStep !== 2 && (
            <Button variant="outlined" onClick={handlerOnNext}>
              Próximo
            </Button>
          )}
          {currentStep === 2 && (
            <Button
              disabled={!isValid || loading}
              type="submit"
              onClick={handlerOnNext}
              isLoading={loading}
            >
              Enviar
            </Button>
          )}
        </Stack>
      </Stack>
    </form>
  )
}
