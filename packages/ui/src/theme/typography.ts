import { type TypographyOptions } from '@mui/material/styles/createTypography';

/**
 * Typography configuration
 * Defines font families, sizes, and weights
 */
export const typography: TypographyOptions = {
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),

  // Font sizes
  fontSize: 14,

  // Heading styles
  h1: {
    fontSize: '2.5rem',
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '-0.01562em',
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '-0.00833em',
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.2,
  },

  // Body text
  body1: {
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.43,
  },

  // Button text
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    textTransform: 'none', // Disable uppercase
    letterSpacing: '0.02857em',
  },
};
