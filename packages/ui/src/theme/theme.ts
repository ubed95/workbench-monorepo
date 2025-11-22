import { createTheme, ThemeOptions } from '@mui/material/styles';
import { palette } from './pallete';
import { typography } from './typography';
import { components } from './components';

/**
 * Workbench MUI Theme Configuration (v7 with Native Color)
 *
 * This theme enforces company brand colors across all MUI components
 * Primary color (deep green) is used for all interactive states
 *
 * MUI v7 requires cssVariables + nativeColor for proper theme.alpha support
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
  // 🔥 CRITICAL: Enable CSS variables with native color for MUI v7
  cssVariables: {
    colorSchemeSelector: 'class', // Use .light / .dark classes
    nativeColor: true, // Enable native color manipulation (color-mix, relative colors)
  },

  palette,
  typography,
  components,

  // Color schemes (light/dark support)
  colorSchemes: {
    light: {
      palette,
    },
    // Dark mode can be added later
    // dark: {
    //   palette: darkPalette,
    // },
  },

  // Default to light mode
  defaultColorScheme: 'light',

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
