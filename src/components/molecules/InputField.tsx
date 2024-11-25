import React from 'react'
import { Field, FieldProps } from 'formik'
import CustomTextField from '@/components/atoms/CustomTextField'
import CustomSelect from '@/components/atoms/CustomSelect'
import countries from '@/data/countries.json'
import { User } from '@/types/userType'

interface InputFieldProps {
  name: keyof User
  value: string | number
  error: boolean | string | undefined
  isEditing: boolean
  onChange?: () => void
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  value,
  error,
  isEditing,
  onChange,
}) => {
  const isSelect = name === 'country'
  const placeholders: Record<string, string> = {
    name: 'Full Name',
    country: 'Select country',
    email: 'Email',
    phone: 'Phone',
  }

  return isEditing ? (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        if (isSelect) {
          return (
            <CustomSelect
              options={countries}
              value={field.value || ''}
              onChange={(newValue) => {
                form.setFieldValue(name, newValue)
                onChange?.()
              }}
              error={Boolean(error)}
            />
          )
        }

        return (
          <CustomTextField
            {...field}
            placeholder={placeholders[name]}
            error={Boolean(error)}
            label=""
            onChange={(e) => {
              field.onChange(e)
              onChange?.()
            }}
          />
        )
      }}
    </Field>
  ) : (
    value
  )
}

export default InputField
