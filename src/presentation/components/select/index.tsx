/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as SelectMUI,
  SxProps,
  Theme
} from '@mui/material'
import { Control, Controller } from 'react-hook-form'

type SelectProps = {
  name: string
  control: Control<any, any>
  label: string
  fields: Record<string, string>
  isLoading?: boolean
  notRequired?: boolean
  sx?: SxProps<Theme>
}

export const Select = (props: SelectProps) => {
  const { control, name, label, isLoading, fields, notRequired, sx } = props

  const defaultSx = sx ? sx : { minWidth: 'calc(50% - 1ch)', mt: 3 }

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: notRequired ? false : true }}
      render={({
        field: { onChange, value },
        fieldState: { error, invalid }
      }) => (
        <FormControl sx={defaultSx} error={invalid}>
          <InputLabel htmlFor="chanel">{label} </InputLabel>
          <SelectMUI
            disabled={isLoading}
            value={value}
            label={label}
            onChange={onChange}
          >
            {Object.entries(fields).map(([key, value], index) => (
              <MenuItem key={index.toString()} value={key}>
                {value}
              </MenuItem>
            ))}
          </SelectMUI>
          {!notRequired && error && error.type === 'required' && (
            <FormHelperText>Campo obrigatório</FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}
