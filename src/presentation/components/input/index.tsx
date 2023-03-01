/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

type InputProps = {
  name: string
  placeholder: string
  control: Control<any, any>
  label: string
  isLoading?: boolean
  type?: React.HTMLInputTypeAttribute
  notRequired?: boolean
  autoFocus?: boolean
}

export const Input = (props: InputProps) => {
  const {
    control,
    isLoading,
    placeholder,
    type,
    notRequired,
    label,
    autoFocus,
    name
  } = props

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: notRequired ? false : true }}
      render={({
        field: { onChange, value },
        fieldState: { error, invalid }
      }) => (
        <TextField
          autoFocus={autoFocus}
          placeholder={placeholder}
          type={type || 'text'}
          onChange={onChange}
          value={value}
          error={notRequired ? false : invalid}
          margin="dense"
          label={label}
          fullWidth
          variant="outlined"
          disabled={isLoading}
          sx={{ mt: 3 }}
          helperText={
            error?.type === 'required' ? 'Campo obrigatório' : error?.message
          }
        />
      )}
    />
  )
}
