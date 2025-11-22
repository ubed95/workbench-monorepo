import { type PaletteOptions } from '@mui/material/styles';

/**
 * HSL to Hex conversion utility
 * MUI requires hex values for palette colors
 * Opacity is handled separately by MUI's alpha() function
 */
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
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
    main: hslToHex(135, 48, 24),      // hsl(135 48% 24%)
    light: hslToHex(135, 48, 35),     // Lighter variant
    dark: hslToHex(135, 48, 18),      // Darker variant
    contrastText: '#ffffff',          // hsl(0 0% 100%)
  },
  secondary: {
    main: hslToHex(115, 50, 92),      // hsl(115 50% 92%)
    light: hslToHex(115, 50, 96),     // Lighter variant
    dark: hslToHex(115, 50, 85),      // Darker variant
    contrastText: hslToHex(135, 48, 24), // primary color - hsl(135 48% 24%)
  },
  accent: {
    main: hslToHex(80, 80, 70),       // hsl(80 80% 70%)
    light: hslToHex(80, 80, 80),
    dark: hslToHex(80, 80, 60),
    contrastText: hslToHex(0, 0, 9),  // hsl(0 0% 9%)
  },
  error: {
    main: hslToHex(0, 72, 51),        // hsl(0 72% 51%) - destructive
    light: hslToHex(0, 72, 65),
    dark: hslToHex(0, 72, 40),
    contrastText: '#ffffff',          // hsl(0 0% 100%)
  },
  warning: {
    main: hslToHex(45, 90, 60),       // Generated warning color
    light: hslToHex(45, 90, 70),
    dark: hslToHex(45, 90, 50),
    contrastText: hslToHex(0, 0, 9),
  },
  info: {
    main: hslToHex(200, 70, 50),      // Generated info color
    light: hslToHex(200, 70, 60),
    dark: hslToHex(200, 70, 40),
    contrastText: '#ffffff',
  },
  success: {
    main: hslToHex(135, 48, 24),      // Using primary as success
    light: hslToHex(135, 48, 35),
    dark: hslToHex(135, 48, 18),
    contrastText: '#ffffff',
  },
  background: {
    default: '#ffffff',               // hsl(0 0% 100%) - white
    paper: '#ffffff',                 // card - hsl(0 0% 100%)
  },
  text: {
    primary: hslToHex(0, 0, 9),       // hsl(0 0% 9%) - foreground
    secondary: hslToHex(0, 0, 40),    // hsl(0 0% 40%) - muted-foreground
    disabled: hslToHex(0, 0, 60),
  },
  divider: hslToHex(135, 30, 90),     // hsl(135 30% 90%) - border
  // action: {
  //   active: hslToHex(135, 48, 24),    // primary color for active states
  //   hover: hslToHex(135, 48, 35, 0.08), // primary with low opacity
  //   selected: hslToHex(135, 48, 35, 0.12),
  //   disabled: hslToHex(0, 0, 60),
  //   disabledBackground: hslToHex(0, 0, 96),
  //   focus: hslToHex(135, 48, 24, 0.12),
  // },
};

/**
 * MUI Palette configuration
 * Overrides default MUI colors with company brand
 *
 * Note: Opacity values (action.hover, etc.) are handled by MUI automatically
 * using the alpha() function with the base colors above
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
  // ❌ REMOVED action object - MUI generates this automatically from your colors
};
