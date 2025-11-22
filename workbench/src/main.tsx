import { theme } from '@mono/ui' // ← ADD THIS
import GlobalStyles from '@mui/material/GlobalStyles'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles' // ← ADD THIS
import initializeServices from '@services/initialization.service'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary'
import QueryProvider from './components/QueryProvider'
import './index.css'

initializeServices()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryProvider>
        <ThemeProvider theme={theme}>
          <StyledEngineProvider enableCssLayer>
            <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </StyledEngineProvider>
        </ThemeProvider>
      </QueryProvider>
    </ErrorBoundary>
  </StrictMode>,
)
