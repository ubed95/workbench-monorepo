/**
 * @workbench/ui - Workbench UI Component Library
 *
 * This library provides:
 * - Custom MUI theme with company brand colors
 * - Reusable components (future)
 * - Theme utilities
 */

// Export theme
export { theme, palette, colors, typography, components } from './theme';
export type { Theme, ThemeOptions } from './theme';

// Re-export MUI essentials for consumer convenience
export { ThemeProvider, CssBaseline } from '@mui/material';

// Future: Export custom components
// export { Button } from './components/Button';
