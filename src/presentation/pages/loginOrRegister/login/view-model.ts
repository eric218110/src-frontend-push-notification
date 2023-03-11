import { LoginFormModel, LoginSuccess } from '@domain/models/login'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTheme } from '@mui/material'
import { useAuth } from '@presentation/hooks/auth'
import { useGoogleLogin } from '@react-oauth/google'
import { signSocialWithGoogle } from '@services/http/social/google/index'
import { useServices } from '@services/index'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'

export const useLoginOutlet = () => {
  const schema = object({
    login: string()
      .required('Campo obrigatório')
      .email('O campo precisa ser um email valido'),
    password: string()
      .required('Campo obrigatório')
      .min(8, 'O campo deve ser maior ou igual a oito')
  })

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting }
  } = useForm<LoginFormModel>({
    mode: 'all',
    resolver: yupResolver(schema)
  })

  const { palette } = useTheme()
  const { onAuth } = useAuth()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const { authByLoginAndPassword } = useServices()

  const [loadingGoogle, setLoadingGoogle] = useState(false)
  const tokenHasExpired = localStorage.getItem('@@auth-token') !== null

  useEffect(() => {
    if (tokenHasExpired) {
      enqueueSnackbar('Sessão expirada, realize login novamente', {
        variant: 'warning'
      })
      localStorage.removeItem('@@auth-token')
    }
  }, [tokenHasExpired])

  const onSuccessAuthAndRedirect = (data: LoginSuccess) => {
    onAuth(data)
    enqueueSnackbar('Login realizado com sucesso', { variant: 'success' })
    navigate('/')
  }

  const onSubmit = async ({ login, password }: LoginFormModel) => {
    const { error, data } = await authByLoginAndPassword({ login, password })
    if (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
    if (data) {
      onSuccessAuthAndRedirect(data)
    }
  }

  const signWithGoogle = useGoogleLogin({
    onSuccess: async codeResponse => {
      setLoadingGoogle(true)
      const { data, error } = await signSocialWithGoogle(
        codeResponse.access_token
      )
      if (data) {
        onSuccessAuthAndRedirect(data)
        setLoadingGoogle(false)
        return
      }
      if (error) {
        enqueueSnackbar(error.message, { variant: 'error' })
      }
      setLoadingGoogle(false)
    },
    flow: 'implicit'
  })

  const handlerOnPresRegister = () => {
    navigate('register')
  }

  const inputs = {
    login: {
      placeholder: 'Informe seu email',
      label: 'Login',
      type: 'text'
    },
    password: {
      label: 'Password',
      placeholder: 'Insira sua senha',
      type: 'password'
    }
  }

  return {
    form: {
      handleSubmit,
      control,
      isValid,
      isSubmitting,
      onSubmit,
      inputs
    },
    googleAuth: {
      sign: signWithGoogle,
      loading: loadingGoogle
    },
    palette,
    register: {
      handlerOnPresRegister
    }
  }
}
