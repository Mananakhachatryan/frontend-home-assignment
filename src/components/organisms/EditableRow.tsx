import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { TableRow, TableCell } from '@mui/material'
import { Formik } from 'formik'
import ActionButtons from '../molecules/ActionButtons'
import InputField from '../molecules/InputField'
import validationSchema from '@/utils/validationSchema'
import { User } from '@/types/userType'

interface EditableRowProps {
  user: User
  onSave: (updatedUser: EditableRowProps['user']) => void
  onDelete: (id: string) => void
  isEditing: boolean
  isNewRow?: boolean
  updateErrorCounts: (
    id: string,
    errors: { empty: number; invalid: number },
  ) => void
}

const EditableRow: React.FC<EditableRowProps> = ({
  user,
  onSave,
  onDelete,
  isEditing,
  isNewRow = false,
  updateErrorCounts,
}) => {
  const [originalUser] = useState(user)
  const [localIsEditing, setLocalIsEditing] = useState(isEditing)
  const [errorCounts, setErrorCounts] = useState({ empty: 0, invalid: 0 })
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    isNewRow && setLocalIsEditing(true)
  }, [isNewRow])

  const calculateErrors = useCallback(
    (values: Partial<User>, errors: Record<string, string>) => {
      let empty = 0
      let invalid = 0

      Object.keys(values).forEach((key) => {
        if (!values[key as keyof User]) {
          empty++
        } else if (errors[key]) {
          invalid++
        }
      })

      return { empty, invalid }
    },
    [],
  )

  const handleSave = useCallback(
    async (values: EditableRowProps['user'], resetForm: () => void) => {
      await onSave(values)
      resetForm()
      setErrorCounts({ empty: 0, invalid: 0 })
      setLocalIsEditing(false)
      setHasInteracted(false)
    },
    [onSave],
  )

  const handleCancel = useCallback(
    (resetForm: (nextState?: Partial<{ values: User }>) => void) => {
      isNewRow && onDelete(user.id)
      !isNewRow &&
        (resetForm({ values: originalUser }),
        setErrorCounts({ empty: 0, invalid: 0 }),
        updateErrorCounts?.(user.id, { empty: 0, invalid: 0 }))

      setLocalIsEditing(false)
      setHasInteracted(false)
    },
    [isNewRow, onDelete, user.id, originalUser, updateErrorCounts],
  )

  const handleInteraction = useCallback(() => {
    setHasInteracted(true)
  }, [])

  const columnWidths = useMemo(
    () => ({
      name: '20%',
      country: '20%',
      email: '20%',
      phone: '20%',
      actions: '20%',
    }),
    [],
  )

  const updateErrors = useCallback(
    (values: Partial<User>, errors: Record<string, string>) => {
      const newErrorCounts = calculateErrors(values, errors)
      setErrorCounts(newErrorCounts)
      updateErrorCounts?.(user.id, newErrorCounts)
    },
    [calculateErrors, updateErrorCounts, user.id],
  )

  return (
    <Formik<User>
      initialValues={user}
      validationSchema={validationSchema}
      validate={(values) => {
        const errors: Record<string, string> = {}
        try {
          validationSchema.validateSync(values, { abortEarly: false })
        } catch (err: any) {
          err.inner.forEach(
            ({ path, message }: { path: string; message: string }) => {
              if (path) errors[path] = message
            },
          )
        }

        updateErrors(values, errors)
        return errors
      }}
      onSubmit={(values, { resetForm }) => handleSave(values, resetForm)}
      enableReinitialize
    >
      {({ values, errors, touched, handleSubmit, isValid, resetForm }) => (
        <TableRow
          onClick={() => !localIsEditing && setLocalIsEditing(true)}
          sx={{
            cursor: localIsEditing ? 'default' : 'pointer',
            transition: 'opacity 0.3s ease',
          }}
        >
          {Object.keys(user)
            .filter((key) => key !== 'id')
            .map((field) => (
              <TableCell
                key={field}
                sx={{ width: columnWidths[field as keyof typeof columnWidths] }}
              >
                <InputField
                  name={field as keyof User}
                  value={values[field as keyof User] || ''}
                  error={Boolean(
                    touched[field as keyof User] && errors[field as keyof User],
                  )}
                  isEditing={localIsEditing}
                  onChange={handleInteraction}
                />
              </TableCell>
            ))}
          <TableCell sx={{ width: columnWidths.actions }}>
            <ActionButtons
              isEditing={localIsEditing}
              onSave={handleSubmit}
              onCancel={() => handleCancel(resetForm)}
              onDelete={() => onDelete(user.id)}
              isValid={hasInteracted && errorCounts.empty === 0 && isValid}
              errorCounts={errorCounts}
              isNewRow={isNewRow}
              hasInteracted={hasInteracted}
            />
          </TableCell>
        </TableRow>
      )}
    </Formik>
  )
}

export default EditableRow
