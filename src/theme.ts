import { createTheme } from '@mui/material/styles';
import elevation from '@/styles/elevation';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(80, 87, 101, 1)'
    },
    secondary: {
      main: 'rgba(241, 90, 41, 1)',
      dark: 'rgba(200, 75, 35, 1)'
    },
    text: {
      primary: 'rgba(80, 87, 101, 1)',
    },
    action: {
      active: 'rgba(241, 90, 41, 1)',
    },
    divider: 'rgba(220, 221, 224, 1)',
    common: {
      white: '#ffffff',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 600,
      lg: 1136,
      xl: 1920,
    },
  },
  elevation,
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
      },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.5,
    }
  },
  components: {
    MuiCssBaseline: {
        styleOverrides: () => ({
          html: {
            height: '100%',
          },
          body: {
            minHeight: '100%',
          },
        }),
    },
    MuiGrid: {
        defaultProps: {
          columns: {
            sm: 4,
            md: 8,
            lg: 12,
          },
          spacing: 4, // 4 * 4px = 16px gutter size
        },
    },
    MuiContainer: {
        styleOverrides: {
          root: ({ theme }) => ({
            [theme.breakpoints.up('xs')]: {
              padding: theme.spacing(0),
            },
            [theme.breakpoints.up('md')]: {
              padding: theme.spacing(0),
              maxWidth: 'unset',
            },
            [theme.breakpoints.up('lg')]: {
              padding: theme.spacing(4),
              paddingBottom: 0,
            },
            [theme.breakpoints.up('xl')]: {
              maxWidth: theme.breakpoints.values.xl,
            },
          }),
        },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: ({ theme }) => ({
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.common.white,
          boxShadow: theme.elevation[1],
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
            cursor: 'pointer',
          },
        }),
        containedSecondary: ({ theme }) => ({
          backgroundColor: theme.palette.common.white,
          border: `1px solid ${theme.palette.divider}`,
          color: theme.palette.grey[500],
          minWidth: '40px',
          minHeight: '40px',
          padding: 0,
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: "#f0f0f0",
            cursor: 'pointer',
          },
        }),
        outlinedSecondary: ({ theme }) => ({
          backgroundColor: theme.palette.common.white,
          border: `1px solid ${theme.palette.divider}`,
          color: theme.palette.grey[500],
          borderRadius: '8px',
          '&:hover': {
            cursor: 'pointer',
          },
        }),
        root:{
          borderRadius: '8px',
          textTransform: 'capitalize',
          fontWeight: 'bold',
          
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          boxShadow: theme.elevation[ownerState.elevation || 0],
          borderRadius: 8,
          width: '100%',
          padding: theme.spacing(2),
        }),
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0px 1000px transparent inset', // Transparent background
            WebkitTextFillColor: '#000',
          },
        },
      },
    },
  },
});

export default theme;
