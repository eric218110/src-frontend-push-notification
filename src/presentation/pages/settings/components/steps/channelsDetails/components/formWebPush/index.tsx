import { WebPushSettingsCreateForm } from '@domain/models/settings/webpush'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField
} from '@mui/material'
import { Stack } from '@mui/system'
import { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { QontoConnector, QontoStepIcon } from '../qonto'

const steps = ['Dados básicos', 'Texto permissão', 'Texto boas vindas']

export const FormWebPush = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid }
  } = useForm<WebPushSettingsCreateForm>()

  const [loading, setLoading] = useState(false)

  const onSubmit = async (form: WebPushSettingsCreateForm) => {
    console.log(form)
    setLoading(true)
  }

  const [currentStep, setCurrentStep] = useState(0)

  const handlerOnNext = useCallback(() => {
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

  useEffect(() => {
    // console.log(currentStep)
  }, [currentStep])

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
        {currentStep === 0 && (
          <Box>
            <Stack direction="row" gap={2} sx={{ pr: 3, pl: 3 }}>
              <Controller
                name={'name'}
                control={control}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error, invalid }
                }) => (
                  <TextField
                    autoFocus
                    placeholder="Nome do site que irá enviar a notificação"
                    type="text"
                    onChange={onChange}
                    value={value}
                    error={invalid}
                    margin="dense"
                    label="Site"
                    fullWidth
                    variant="outlined"
                    disabled={loading}
                    sx={{ mt: 3 }}
                    helperText={
                      error?.type === 'required'
                        ? 'Campo obrigatório'
                        : error?.message
                    }
                  />
                )}
              />
              <Controller
                name={'address'}
                control={control}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error, invalid }
                }) => (
                  <TextField
                    autoFocus
                    placeholder="Url do site que"
                    type="url"
                    onChange={onChange}
                    value={value}
                    error={invalid}
                    margin="dense"
                    label="Url"
                    fullWidth
                    variant="outlined"
                    disabled={loading}
                    sx={{ mt: 3 }}
                    helperText={
                      error?.type === 'required'
                        ? 'Campo obrigatório'
                        : error?.message
                    }
                  />
                )}
              />
              <Controller
                name={'url_icon'}
                control={control}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error, invalid }
                }) => (
                  <TextField
                    autoFocus
                    placeholder="Imagem do ícone do site"
                    type="url"
                    onChange={onChange}
                    value={value}
                    error={invalid}
                    margin="dense"
                    label="Url Icon"
                    fullWidth
                    variant="outlined"
                    disabled={loading}
                    sx={{ mt: 3 }}
                    helperText={
                      error?.type === 'required'
                        ? 'Campo obrigatório'
                        : error?.message
                    }
                  />
                )}
              />
            </Stack>
          </Box>
        )}
        {currentStep === 1 && (
          <Box>
            <Stack direction="row" gap={2} sx={{ pr: 3, pl: 3 }}>
              <Controller
                name={'message_text_allow_notification'}
                control={control}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error, invalid }
                }) => (
                  <TextField
                    autoFocus
                    placeholder="Texto da mensagem de permissão"
                    type="text"
                    onChange={onChange}
                    value={value}
                    error={invalid}
                    margin="dense"
                    label="Texto Mensagem"
                    fullWidth
                    variant="outlined"
                    disabled={loading}
                    sx={{ mt: 3 }}
                    helperText={
                      error?.type === 'required'
                        ? 'Campo obrigatório'
                        : error?.message
                    }
                  />
                )}
              />
              <Controller
                name={'allow_button_text'}
                control={control}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error, invalid }
                }) => (
                  <TextField
                    autoFocus
                    placeholder="Texto do botão Permitir"
                    type="text"
                    onChange={onChange}
                    value={value}
                    error={invalid}
                    margin="dense"
                    label="Texto permitir"
                    fullWidth
                    variant="outlined"
                    disabled={loading}
                    sx={{ mt: 3 }}
                    helperText={
                      error?.type === 'required'
                        ? 'Campo obrigatório'
                        : error?.message
                    }
                  />
                )}
              />
              <Controller
                name={'deny_button_text'}
                control={control}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error, invalid }
                }) => (
                  <TextField
                    autoFocus
                    placeholder="Texto do botão Negar"
                    type="text"
                    onChange={onChange}
                    value={value}
                    error={invalid}
                    margin="dense"
                    label="Texto Negar"
                    fullWidth
                    variant="outlined"
                    disabled={loading}
                    sx={{ mt: 3 }}
                    helperText={
                      error?.type === 'required'
                        ? 'Campo obrigatório'
                        : error?.message
                    }
                  />
                )}
              />
            </Stack>
          </Box>
        )}
        {currentStep === 2 && (
          <>
            <Box>
              <Stack direction="row" gap={2} sx={{ pr: 3, pl: 3 }}>
                <Controller
                  name={'message_title'}
                  control={control}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error, invalid }
                  }) => (
                    <TextField
                      autoFocus
                      placeholder="Título para a mensagem da notificação web"
                      type="text"
                      onChange={onChange}
                      value={value}
                      error={invalid}
                      margin="dense"
                      label="Título da notificação"
                      fullWidth
                      variant="outlined"
                      disabled={loading}
                      sx={{ mt: 3 }}
                      helperText={
                        error?.type === 'required'
                          ? 'Campo obrigatório'
                          : error?.message
                      }
                    />
                  )}
                />
                <Controller
                  name={'message_text'}
                  control={control}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error, invalid }
                  }) => (
                    <TextField
                      autoFocus
                      placeholder="Texto para a mensagem da notificação web"
                      type="text"
                      onChange={onChange}
                      value={value}
                      error={invalid}
                      margin="dense"
                      label="Texto da mensagem"
                      fullWidth
                      variant="outlined"
                      disabled={loading}
                      sx={{ mt: 3 }}
                      helperText={
                        error?.type === 'required'
                          ? 'Campo obrigatório'
                          : error?.message
                      }
                    />
                  )}
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
                <Controller
                  name={'enable_url_redirect'}
                  control={control}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error, invalid }
                  }) => (
                    <FormControl
                      sx={{ minWidth: 'calc(50% - 1ch)', mt: 3 }}
                      error={invalid}
                    >
                      <InputLabel htmlFor="chanel">
                        Link de destino, ao clicar na notificação
                      </InputLabel>
                      <Select
                        disabled={loading}
                        value={value}
                        label="Link de destino, ao clicar na notificação"
                        onChange={onChange}
                      >
                        <MenuItem value="true">Habilitar</MenuItem>
                        <MenuItem value="false">Desabilitar</MenuItem>
                      </Select>
                      {error && error.type === 'required' && (
                        <FormHelperText>Campo obrigatório</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  name={'url_redirect'}
                  control={control}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error, invalid }
                  }) => (
                    <TextField
                      autoFocus
                      placeholder="Endereço do link de destino"
                      type="text"
                      onChange={onChange}
                      value={value}
                      error={invalid}
                      margin="dense"
                      label="Endereço do link de destino"
                      fullWidth
                      variant="outlined"
                      disabled={loading}
                      sx={{ mt: 3 }}
                      helperText={
                        error?.type === 'required'
                          ? 'Campo obrigatório'
                          : error?.message
                      }
                    />
                  )}
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
