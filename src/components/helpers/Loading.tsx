import React from 'react'
import { Box, CircularProgress } from '@mui/material'

interface LoadingScreenProps {
  message?: string
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Loading...',
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress />
      <Box sx={{ marginTop: '16px' }}>
        <span>{message}</span>
      </Box>
    </Box>
  )
}

export default LoadingScreen
