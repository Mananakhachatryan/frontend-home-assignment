import React from 'react'
import { Button, Box } from '@mui/material'
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'

interface ActionButtonsProps {
  isEditing: boolean
  onSave: () => void
  onCancel: () => void
  onDelete: () => void
  isValid: boolean
  errorCounts: { empty: number; invalid: number }
  isNewRow?: boolean
  hasInteracted: boolean
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isEditing,
  onSave,
  onCancel,
  onDelete,
  isValid,
  errorCounts,
  isNewRow = false,
  hasInteracted,
}) => {
  const isSaveDisabled = isNewRow
    ? !hasInteracted || errorCounts.empty > 0 || errorCounts.invalid > 0
    : !isValid

  const renderEditButtons = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: '8px',
        alignItems: 'flex-start',
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={onSave}
        startIcon={<SaveIcon />}
        disabled={isSaveDisabled}
        sx={{
          width: { xs: '100%', sm: 'auto' },
        }}
      >
        Save
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={onCancel}
        startIcon={<CancelIcon />}
        sx={{
          width: { xs: '100%', sm: 'auto' },
        }}
      >
        Cancel
      </Button>
    </Box>
  )

  const renderDeleteButton = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
      }}
    >
      <Button
        variant="contained"
        color="secondary"
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
      >
        <DeleteIcon />
      </Button>
    </Box>
  )

  return isEditing ? renderEditButtons() : renderDeleteButton()
}

export default ActionButtons
