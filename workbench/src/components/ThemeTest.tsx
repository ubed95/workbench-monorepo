import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

export default function ThemeTest() {
  const theme = useTheme()

  return (
    <Box className="p-8 min-h-screen bg-background">
      <Typography variant="h3" className="mb-8">
        🎨 MUI Theme Test (Tailwind Layout)
      </Typography>

      {/* Color Swatches */}
      <Card className="mb-8">
        <CardContent>
          <Typography variant="h5" className="mb-4">
            Custom Theme Colors
          </Typography>
          <div className="flex gap-4">
            <div
              style={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              }}
              className="p-4 rounded-lg"
            >
              <Typography>Primary</Typography>
              <Typography variant="caption">{theme.palette.primary.main}</Typography>
            </div>
            <div
              style={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
              }}
              className="p-4 rounded-lg border border-gray-300"
            >
              <Typography>Secondary</Typography>
              <Typography variant="caption">{theme.palette.secondary.main}</Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* MUI Buttons with Tailwind Layout */}
      <Card className="mb-8">
        <CardContent>
          <Typography variant="h5" className="mb-4">
            MUI Buttons (Should Be GREEN)
          </Typography>
          <div className="flex gap-4 flex-wrap">
            <Button variant="contained" color="primary">
              Primary Button
            </Button>
            <Button variant="outlined" color="primary">
              Outlined Primary
            </Button>
            <Button variant="text" color="primary">
              Text Primary
            </Button>
            <Button variant="contained" color="secondary">
              Secondary Button
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* MUI Inputs with Custom Theme */}
      <Card className="mb-8">
        <CardContent>
          <Typography variant="h5" className="mb-4">
            Input Fields (Focus Should Be GREEN)
          </Typography>
          <Stack spacing={3}>
            <TextField
              label="Email"
              placeholder="Click to see green focus"
              fullWidth
              helperText="Focus border should be primary green"
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
            />
          </Stack>
        </CardContent>
      </Card>

      {/* Checkboxes */}
      <Card className="mb-8">
        <CardContent>
          <Typography variant="h5" className="mb-4">
            Checkboxes (Checked = GREEN)
          </Typography>
          <div className="flex flex-col gap-2">
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Checked (should be green)"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Unchecked"
            />
          </div>
        </CardContent>
      </Card>

      {/* Comparison: Your Existing AddNumbers */}
      <Card>
        <CardContent>
          <Typography variant="h5" className="mb-4">
            Notice: MUI Buttons vs Your Hybrid Input
          </Typography>
          <Typography variant="body2" className="mb-4">
            MUI Button above uses theme (green). Your AddNumbers Input uses Tailwind classes (gray).
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
