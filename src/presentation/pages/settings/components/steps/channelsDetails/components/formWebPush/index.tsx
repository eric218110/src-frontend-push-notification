import { WebPushSettingsCreateForm } from '@domain/models/settings/webpush'
import { Box, Button, Step, StepLabel, Stepper } from '@mui/material'
import { Stack } from '@mui/system'
import { Input } from '@presentation/components/input'
import { Select } from '@presentation/components/select'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { QontoConnector, QontoStepIcon } from '../qonto'
import { inputs } from './inputs'

const steps = ['Dados básicos', 'Texto permissão', 'Texto boas vindas']

const stepsPosition = { urlInformtions: 0, textPermission: 1, textWelcome: 2 }

export const FormWebPush = () => {
  const {
    handleSubmit,
    control,
    getValues,
    setError,
    watch,
    clearErrors,
    formState: { isValid }
  } = useForm<WebPushSettingsCreateForm>()

  const [loading, setLoading] = useState(false)

  const onSubmit = async (form: WebPushSettingsCreateForm) => {
    console.log(form)
    setLoading(true)
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
      ;[
        'message_title',
        'message_text',
        'enable_url_redirect',
        'url_redirect'
      ].forEach(input => {
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
                  fields={{ true: 'Habilitar', false: 'Desabilitar' }}
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
          sx={{ mt: 3, mr: 5 }}
        >
          <Button onClick={handlerOnBack}>Anterior</Button>
          {currentStep !== 2 && (
            <Button onClick={handlerOnNext}>Próximo</Button>
          )}
          {currentStep === 2 && (
            <Button
              disabled={!isValid || loading}
              type="submit"
              onClick={handlerOnNext}
            >
              Enviar
            </Button>
          )}
        </Stack>
      </Stack>
    </form>
  )
}
