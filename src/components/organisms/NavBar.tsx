import React, { useCallback } from 'react'
import {
  Toolbar,
  Box,
  Button,
  Typography,
  useMediaQuery,
  Paper,
} from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'

const NavBar: React.FC = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const location = useLocation()

  const getButtonStyles = useCallback(
    (path: string) => ({
      color: theme.palette.primary.main,
      border:
        location.pathname === path
          ? `2px solid ${theme.palette.divider}`
          : `2px solid white`,
      textTransform: 'capitalize',
      transition: 'all 0.3s ease',
      borderRadius: '8px',
      '&:hover': {
        border: `2px solid ${theme.palette.secondary.main} `,
        color: theme.palette.secondary.main,
      },
    }),
    [
      location.pathname,
      theme.palette.divider,
      theme.palette.primary.main,
      theme.palette.secondary.main,
    ],
  )

  return (
    <Paper
      elevation={1}
      sx={{
        zIndex: theme.zIndex.appBar,
        color: theme.palette.text.primary,
        width: isDesktop ? 'calc(100% - 32px)' : '100%',
        left: isDesktop ? '15px' : '0',
        top: isDesktop ? '15px' : '0',
        position: isDesktop ? 'fixed' : 'sticky',
        borderRadius: isDesktop ? '8px' : 0,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h6"
          component={RouterLink}
          to="/statistics"
          sx={{
            textDecoration: 'none',
            fontWeight: 'bold',
            color: theme.palette.primary.main,
          }}
        >
          Stats Board
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            justifyContent: isDesktop ? 'flex-end' : 'center',
          }}
        >
          <Button
            component={RouterLink}
            to="/statistics"
            sx={getButtonStyles('/statistics')}
          >
            Statistics
          </Button>
          <Button component={RouterLink} to="/" sx={getButtonStyles('/')}>
            Users
          </Button>
        </Box>
      </Toolbar>
    </Paper>
  )
}

export default NavBar
