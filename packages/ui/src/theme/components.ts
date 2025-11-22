import type { Components, Theme } from '@mui/material/styles';

/**
 * Component-level theme overrides
 * Ensures all MUI components use primary color for focus states
 */
export const components: Components<Theme> = {
  // Button overrides
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.spacing(1),
        padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: '2px',
        },
      }),
      contained: () => ({
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      }),
    },
  },

  // TextField overrides - Primary color for focus
  MuiTextField: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiOutlinedInput-root': {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
            borderWidth: '2px',
          },
        },
      }),
    },
  },

  // Input overrides
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.spacing(1),
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main,
        },
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: '2px',
        },
      }),
      notchedOutline: ({ theme }) => ({
        borderColor: theme.palette.divider, // Using your border color
      }),
    },
  },

  // Input label
  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.Mui-focused': {
          color: theme.palette.primary.main,
        },
      }),
    },
  },

  // Checkbox overrides
  MuiCheckbox: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.divider,
        '&.Mui-checked': {
          color: theme.palette.primary.main,
        },
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: '2px',
        },
      }),
    },
  },

  // Radio overrides
  MuiRadio: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.divider,
        '&.Mui-checked': {
          color: theme.palette.primary.main,
        },
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: '2px',
        },
      }),
    },
  },

  // Switch overrides
  MuiSwitch: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&:focus-visible .MuiSwitch-thumb': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: '2px',
        },
      }),
      switchBase: ({ theme }) => ({
        '&.Mui-checked': {
          color: theme.palette.primary.main,
        },
        '&.Mui-checked + .MuiSwitch-track': {
          backgroundColor: theme.palette.primary.main,
        },
      }),
    },
  },

  // Select overrides
  MuiSelect: {
    styleOverrides: {
      select: () => ({
        '&:focus': {
          backgroundColor: 'transparent',
        },
      }),
    },
  },

  // Chip overrides
  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.spacing(1),
      }),
      colorPrimary: ({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }),
    },
  },

  // Card overrides
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.spacing(1.5),
        boxShadow: 'none',
        border: `1px solid ${theme.palette.divider}`,
      }),
    },
  },

  // Paper overrides
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.spacing(1.5),
      }),
      outlined: ({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
      }),
    },
  },

  // Tabs overrides
  MuiTabs: {
    styleOverrides: {
      indicator: ({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
      }),
    },
  },

  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.Mui-selected': {
          color: theme.palette.primary.main,
        },
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: '2px',
        },
      }),
    },
  },
};
