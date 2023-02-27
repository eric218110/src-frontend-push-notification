import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SendIcon from '@mui/icons-material/Send'
import {
  Box,
  CircularProgress,
  Step,
  StepButton,
  Stepper,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Stack } from '@mui/system'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { RegisterFormModel } from '../../../../domain/models/register'
import { useServices } from '../../../../services'
import { useValidator } from '../../../validators'

const steps = ['Dados pessoais', 'Sua empresa', 'Segurança']

const stepsPosition = {
  personalData: 0,
  company: 1,
  security: 2
}

export const RegisterOutlet = (): JSX.Element => {
  const {
    handleSubmit,
    control,
    getValues,
    setError,
    clearErrors,
    watch,
    formState: { errors, isValid }
  } = useForm<RegisterFormModel>()
  const [loading, setLoading] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState<Record<string, boolean>>({})
  const { emailIsValid, passwordIsEquals } = useValidator()
  const { registerNewUser } = useServices()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const onSubmit = async (payload: RegisterFormModel) => {
    setLoading(true)
    const { error, data } = await registerNewUser(payload)

    if (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
      setLoading(false)
      return
    }
    if (data) {
      enqueueSnackbar('Cadastro realizado', { variant: 'success' })
      setLoading(false)
      navigate('/home')
    }
  }

  watch((_, { name }) => {
    if (name === 'name' && errors.name) clearErrors('name')
    if (name === 'email' && errors.email) clearErrors('email')
  })

  const totalSteps = () => {
    return steps.length
  }

  const completedSteps = () => {
    return Object.keys(completed).length
  }

  const isLastStep = () => {
    return activeStep === totalSteps() - 1
  }

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps()
  }

  const handleNext = () => {
    if (validateStep()) {
      clearErrors()
      const newCompleted = completed
      newCompleted[activeStep] = true
      setCompleted(newCompleted)
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1

      if (!allStepsCompleted()) {
        setActiveStep(newActiveStep)
        return
      }
    }
  }

  const validateStep = () => {
    if (activeStep === stepsPosition.company) return true
    if (activeStep === stepsPosition.personalData) {
      const inputs = { name: getValues('name'), email: getValues('email') }
      let isValid = true

      Object.entries(inputs).forEach(([k, value]) => {
        const key = k as keyof RegisterFormModel

        if (!value) {
          setError(key, { type: 'required' })
          isValid = false
        } else {
          clearErrors(key)
        }
        if (isValid && key === 'email' && !emailIsValid(value)) {
          setError('email', { message: 'E-mail invalido' })
          isValid = false
        }
      })

      return isValid
    }
    return false
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleStep = (step: number) => () => {
    setActiveStep(step)
  }

  const { palette } = useTheme()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container minHeight={160} height="100vh">
        <Grid
          lg
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{
            backgroundColor:
              palette.background.default === '#121212'
                ? 'rgba(0,0,0,0.9)'
                : 'rgba(256,256,256,0.9)'
          }}
        >
          <Box sx={{ width: '90%', pl: 6, pr: 6 }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <Stack sx={{ pr: 1, pl: 1 }}>
              {activeStep === stepsPosition.personalData && (
                <>
                  <Stack sx={{ mt: 5 }}>
                    <Controller
                      name={'name'}
                      control={control}
                      rules={{ required: true }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error, invalid }
                      }) => (
                        <TextField
                          placeholder="Informe seu nome completo"
                          sx={{ mb: 4, width: '100%' }}
                          type={'text'}
                          label="Nome"
                          onChange={onChange}
                          value={value}
                          error={invalid}
                          helperText={
                            error?.type === 'required'
                              ? 'Campo obrigatório'
                              : error?.message
                          }
                        />
                      )}
                    />
                  </Stack>
                  <Stack>
                    <Controller
                      name={'email'}
                      control={control}
                      rules={{ required: true }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error, invalid }
                      }) => (
                        <TextField
                          placeholder="Ex: joedoe@example.com"
                          sx={{ mb: 4, width: '100%' }}
                          type={'email'}
                          label="E-mail"
                          onChange={onChange}
                          value={value}
                          error={invalid}
                          helperText={
                            error?.type === 'required'
                              ? 'Campo obrigatório'
                              : error?.message
                          }
                        />
                      )}
                    />
                  </Stack>
                  <Stack>
                    <Controller
                      name={'phone_number'}
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { invalid }
                      }) => (
                        <TextField
                          placeholder="Ex: 99 99999 9999"
                          sx={{ mb: 4, width: '100%' }}
                          type={'number'}
                          label="Telefone ( * )"
                          onChange={onChange}
                          value={value}
                          error={invalid}
                        />
                      )}
                    />
                  </Stack>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      onClick={() => {
                        navigate('/auth')
                      }}
                      sx={{ mr: 1 }}
                      startIcon={<ArrowBackIcon />}
                    >
                      Voltar
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleNext} endIcon={<ArrowForwardIcon />}>
                      Próximo
                    </Button>
                  </Box>
                </>
              )}
              {activeStep === stepsPosition.company && (
                <>
                  <Stack sx={{ mt: 5 }}>
                    <Controller
                      name={'company_name'}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          placeholder="Informe o nome da sua empresa"
                          sx={{ mb: 4, width: '100%' }}
                          type={'text'}
                          label="Nome da Empresa ( * )"
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                  </Stack>
                  <Stack sx={{ mt: 5 }}>
                    <Controller
                      name={'company_address'}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          placeholder="Ex: Rua das laranjeiras, N 999, São Paulo SP"
                          sx={{ mb: 4, width: '100%' }}
                          type={'text'}
                          label="Endereço da Empresa ( * )"
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                  </Stack>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      startIcon={<ArrowBackIcon />}
                      color="inherit"
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Voltar
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleNext} endIcon={<ArrowForwardIcon />}>
                      Próximo
                    </Button>
                  </Box>
                </>
              )}
              {activeStep === stepsPosition.security && (
                <>
                  <Stack sx={{ mt: 5 }}>
                    <Controller
                      name={'password'}
                      control={control}
                      rules={{ required: true }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error, invalid }
                      }) => (
                        <TextField
                          placeholder="Crie uma nova senha"
                          sx={{ mb: 4, width: '100%' }}
                          type={'password'}
                          label="Senha"
                          onChange={onChange}
                          value={value}
                          error={invalid}
                          helperText={
                            error?.type === 'required'
                              ? 'Campo obrigatório'
                              : error?.message ||
                                'Insira uma senha com caracteres especiais Ex: (! @ # $ % & *), letras e números'
                          }
                        />
                      )}
                    />
                  </Stack>
                  <Stack sx={{ mt: 5 }}>
                    <Controller
                      name={'confirme_password'}
                      control={control}
                      rules={{
                        required: true,
                        validate: (val: string) => {
                          if (!passwordIsEquals(watch('password'), val)) {
                            return 'As senha Não são iguais'
                          }
                        }
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error, invalid }
                      }) => (
                        <TextField
                          placeholder="Repita a senha"
                          sx={{ mb: 4, width: '100%' }}
                          type={'password'}
                          label="Confirmação de senha"
                          onChange={onChange}
                          value={value}
                          error={invalid}
                          helperText={
                            error?.type === 'required'
                              ? 'Campo obrigatório'
                              : error?.message ||
                                'Informe a mesma senha criada no campo acima'
                          }
                        />
                      )}
                    />
                  </Stack>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      startIcon={<ArrowBackIcon />}
                      color="inherit"
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Voltar
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button
                      variant="outlined"
                      disabled={!isValid}
                      type="submit"
                      endIcon={<SendIcon />}
                    >
                      Enviar
                      {loading && (
                        <CircularProgress
                          size={24}
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px'
                          }}
                        />
                      )}
                    </Button>
                  </Box>
                </>
              )}
              <Box sx={{ mt: 3 }}>
                <Typography variant="caption" color="GrayText" fontWeight="100">
                  * Campo Opicional
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid
          xs
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            backgroundColor:
              palette.background.default === '#121212'
                ? 'rgba(0,0,0,0.3)'
                : 'rgba(256,256,256,0)'
          }}
        ></Grid>
      </Grid>
    </form>
  )
}
