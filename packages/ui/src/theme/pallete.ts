import { type PaletteOptions } from '@mui/material/styles';

/**
 * HSL to RGB conversion utility
 * MUI requires RGB values for palette colors
 */
function hslToRgb(h: number, s: number, l: number, opacity: number = 1): string {
  s /= 100;
  l /= 100;

  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  const r = Math.round(255 * f(0));
  const g = Math.round(255 * f(8));
  const b = Math.round(255 * f(4));

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Company color palette derived from HSL values
 * Primary: hsl(135, 48%, 24%) - Deep Green
 * Secondary: hsl(115, 50%, 92%) - Light Green
 * Accent: hsl(80, 80%, 70%) - Lime Green
 */
export const colors = {
  // Base colors from your HSL values
  primary: {
    main: hslToRgb(135, 48, 24),      // hsl(135 48% 24%)
    light: hslToRgb(135, 48, 35),     // Lighter variant
    dark: hslToRgb(135, 48, 18),      // Darker variant
    contrastText: '#ffffff',          // hsl(0 0% 100%)
  },
  secondary: {
    main: hslToRgb(115, 50, 92),      // hsl(115 50% 92%)
    light: hslToRgb(115, 50, 96),     // Lighter variant
    dark: hslToRgb(115, 50, 85),      // Darker variant
    contrastText: hslToRgb(135, 48, 24), // primary color - hsl(135 48% 24%)
  },
  accent: {
    main: hslToRgb(80, 80, 70),       // hsl(80 80% 70%)
    light: hslToRgb(80, 80, 80),
    dark: hslToRgb(80, 80, 60),
    contrastText: hslToRgb(0, 0, 9),  // hsl(0 0% 9%)
  },
  error: {
    main: hslToRgb(0, 72, 51),        // hsl(0 72% 51%) - destructive
    light: hslToRgb(0, 72, 65),
    dark: hslToRgb(0, 72, 40),
    contrastText: '#ffffff',          // hsl(0 0% 100%)
  },
  warning: {
    main: hslToRgb(45, 90, 60),       // Generated warning color
    light: hslToRgb(45, 90, 70),
    dark: hslToRgb(45, 90, 50),
    contrastText: hslToRgb(0, 0, 9),
  },
  info: {
    main: hslToRgb(200, 70, 50),      // Generated info color
    light: hslToRgb(200, 70, 60),
    dark: hslToRgb(200, 70, 40),
    contrastText: '#ffffff',
  },
  success: {
    main: hslToRgb(135, 48, 24),      // Using primary as success
    light: hslToRgb(135, 48, 35),
    dark: hslToRgb(135, 48, 18),
    contrastText: '#ffffff',
  },
  background: {
    default: hslToRgb(0, 0, 100),     // hsl(0 0% 100%) - white
    paper: hslToRgb(0, 0, 100),       // card - hsl(0 0% 100%)
  },
  text: {
    primary: hslToRgb(0, 0, 9),       // hsl(0 0% 9%) - foreground
    secondary: hslToRgb(0, 0, 40),    // hsl(0 0% 40%) - muted-foreground
    disabled: hslToRgb(0, 0, 60),
  },
  divider: hslToRgb(135, 30, 90),     // hsl(135 30% 90%) - border
  action: {
    active: hslToRgb(135, 48, 24),    // primary color for active states
    hover: hslToRgb(135, 48, 35, 0.08), // primary with low opacity
    selected: hslToRgb(135, 48, 35, 0.12),
    disabled: hslToRgb(0, 0, 60),
    disabledBackground: hslToRgb(0, 0, 96),
    focus: hslToRgb(135, 48, 24, 0.12),
  },
};

/**
 * MUI Palette configuration
 * Overrides default MUI colors with company brand
 */
export const palette: PaletteOptions = {
  mode: 'light',
  primary: colors.primary,
  secondary: colors.secondary,
  error: colors.error,
  warning: colors.warning,
  info: colors.info,
  success: colors.success,
  background: colors.background,
  text: colors.text,
  divider: colors.divider,
  action: colors.action,
};
