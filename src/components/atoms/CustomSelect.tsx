import React from 'react'
import {
  FormControl,
  FormHelperText,
  Autocomplete,
  TextField,
} from '@mui/material'

export type CustomSelectProps = {
  options: string[]
  value: string
  error?: boolean
  helperText?: string
  onChange: (value: string) => void
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  error,
  helperText,
  onChange,
}) => {
  return (
    <FormControl
      fullWidth
      error={error}
      sx={{
        '& .MuiOutlinedInput-root': {
          height: '30px',
          borderColor: error ? 'red' : 'inherit',
          fontSize: '0.875rem',
        },
      }}
    >
      <Autocomplete
        options={options}
        value={value || ''}
        disableClearable
        onChange={(_, newValue) => onChange(newValue || '')}
        renderInput={(params) => (
          <TextField
            {...params}
            error={error}
            size="small"
            placeholder="Select country"
          />
        )}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default CustomSelect
