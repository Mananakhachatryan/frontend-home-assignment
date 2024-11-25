import React from 'react'
import { TextField, TextFieldProps as MuiTextFieldProps } from '@mui/material'

export type CustomTextFieldProps = MuiTextFieldProps & {
  error?: boolean
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  error,
  helperText,
  ...props
}) => {
  return (
    <TextField
      {...props}
      error={error}
      helperText={error ? helperText : ''}
      sx={{
        '& .MuiOutlinedInput-root': {
          height: '30px',
          padding: '0 8px',
          fontSize: '0.875rem',
          borderRadius: '4px',
        },
      }}
    />
  )
}

export default CustomTextField
