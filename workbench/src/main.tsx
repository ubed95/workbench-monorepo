import GlobalStyles from '@mui/material/GlobalStyles'
import { StyledEngineProvider } from '@mui/material/styles'
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
        <StyledEngineProvider enableCssLayer>
          <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StyledEngineProvider>
      </QueryProvider>
    </ErrorBoundary>
  </StrictMode>,
)
