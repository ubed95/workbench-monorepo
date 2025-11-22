import { createTheme, type ThemeOptions } from '@mui/material/styles';
import { typography } from './typography';
import { components } from './components';
import { palette } from './pallete';

/**
 * Workbench MUI Theme Configuration
 *
 * This theme enforces company brand colors across all MUI components
 * Primary color (deep green) is used for all interactive states
 *
 * Usage:
 * ```
 * import { ThemeProvider } from '@mui/material/styles';
 * import { theme } from '@workbench/ui';
 *
 * function App() {
 *   return (
 *     <ThemeProvider theme={theme}>
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */

const themeOptions: ThemeOptions = {
  palette,
  typography,
  components,

  // Spacing unit (default: 8px)
  spacing: 8,

  // Shape configuration
  shape: {
    borderRadius: 8,
  },

  // Breakpoints (responsive design)
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  // Z-index layers
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
};

export const theme = createTheme(themeOptions);

// Type augmentation for custom theme properties (future use)
declare module '@mui/material/styles' {
  interface Theme {
    // Add custom theme properties here if needed
  }
  interface ThemeOptions {
    // Add custom theme options here if needed
  }
}
