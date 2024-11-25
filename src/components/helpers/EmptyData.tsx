import React from 'react'
import { Box, Typography } from '@mui/material'
import { SentimentDissatisfied as NoDataIcon } from '@mui/icons-material'

const EmptyData: React.FC<{ message: string }> = ({ message }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100px',
        borderRadius: '8px',
        padding: '16px',
        marginTop: '100px',
      }}
    >
      <NoDataIcon sx={{ fontSize: 48, color: 'rgba(0,0,0,0.5)' }} />
      <Typography
        variant="body1"
        sx={{ color: 'rgba(0,0,0,0.6)', marginTop: '8px' }}
      >
        {message}
      </Typography>
    </Box>
  )
}

export default EmptyData
