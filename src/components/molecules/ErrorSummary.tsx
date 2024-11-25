import React from 'react'
import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface ErrorSummaryProps {
  emptyCount: number
  invalidCount: number
}

const ErrorSummary: React.FC<ErrorSummaryProps> = ({
  emptyCount,
  invalidCount,
}) => {
  const theme = useTheme()

  return (
    <Box sx={{ pt: '12px' }}>
      <Typography variant="body2">
        <span
          style={{
            color:
              emptyCount > 0
                ? theme.palette.error.main
                : theme.palette.primary.main,
          }}
        >
          Empty Fields - {emptyCount},
        </span>
        <span
          style={{
            marginLeft: '5px',
            color:
              invalidCount > 0
                ? theme.palette.error.main
                : theme.palette.primary.main,
          }}
        >
          Invalid Fields - {invalidCount}
        </span>
      </Typography>
    </Box>
  )
}

export default ErrorSummary
