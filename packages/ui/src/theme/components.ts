import { Components, Theme } from '@mui/material/styles';

/**
 * Component-level theme overrides (MUI v7)
 * Ensures all MUI components use primary color for focus/hover states
 *
 * Uses !important for focus states to override Tailwind CSS layers
 */
export const components: Components<Theme> = {
  // Button overrides
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.spacing(1),
        padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
        textTransform: 'none',
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: '2px',
        },
      }),
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      },
    },
    defaultProps: {
      color: 'primary',
    },
  },

  // TextField overrides - STRONGER specificity for Tailwind override
  MuiTextField: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiOutlinedInput-root': {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: `${theme.palette.primary.main} !important`,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: `${theme.palette.primary.main} !important`,
            borderWidth: '2px !important',
          },
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: `${theme.palette.primary.main} !important`,
        },
      }),
    },
  },

  // Input overrides - FORCE primary color on focus
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.spacing(1),
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: `${theme.palette.primary.main} !important`,
        },
        '&.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: `${theme.palette.primary.main} !important`,
            borderWidth: '2px !important',
          },
        },
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main} !important`,
          outlineOffset: '2px',
        },
      }),
      notchedOutline: ({ theme }) => ({
        borderColor: theme.palette.divider,
        transition: 'border-color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      }),
    },
  },

  // Input label - FORCE primary color on focus
  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.Mui-focused': {
          color: `${theme.palette.primary.main} !important`,
        },
      }),
    },
  },

  // Input base (for MUI Input component)
  MuiInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&:before': {
          borderBottomColor: theme.palette.divider,
        },
        '&:hover:not(.Mui-disabled):before': {
          borderBottomColor: `${theme.palette.primary.main} !important`,
        },
        '&.Mui-focused:after': {
          borderBottomColor: `${theme.palette.primary.main} !important`,
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
    defaultProps: {
      color: 'primary',
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
    defaultProps: {
      color: 'primary',
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
    defaultProps: {
      color: 'primary',
    },
  },

  // Select overrides
  MuiSelect: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: `${theme.palette.primary.main} !important`,
          borderWidth: '2px !important',
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
        textTransform: 'none',
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

  // Form Control Label
  MuiFormControlLabel: {
    styleOverrides: {
      root: {
        marginLeft: 0,
      },
    },
  },
};
