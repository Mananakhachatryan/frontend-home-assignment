declare module '@mui/material/styles' {
  interface Theme {
    elevation: Record<number, string>;
  }

  interface ThemeOptions {
    elevation?: Record<number, string>;
  }
}

const elevation = {
  0: 'none',
  1: '2px 2px 14px 0px rgba(153, 153, 153, 0.25)',
  2: '-4px 0px 10px 0px rgba(153, 153, 153, 0.25), 4px 4px 10px 0px rgba(153, 153, 153, 0.25)',
  3: '-6px 0px 10px 0px rgba(153, 153, 153, 0.25), 6px 6px 10px 0px rgba(153, 153, 153, 0.25)',
};

export default elevation;
