import GlobalStyles from '@mui/material/GlobalStyles'
import { StyledEngineProvider } from '@mui/material/styles'
import { store } from '@redux/store'
import initializeServices from '@services/initialization.service'
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

initializeServices()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <StyledEngineProvider enableCssLayer>
        <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </StyledEngineProvider>
    </ErrorBoundary>
  </StrictMode>,
)
