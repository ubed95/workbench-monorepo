import { Button } from '@mui/material'
import { captureException } from '@services/logger.service'
import React from 'react'

interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  remountKey: number;
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, remountKey: 0 }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, remountKey: 0 }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    captureException(error, { errorInfo })
  }

  handleRetry = () => {
    // Force a child subtree remount by bumping a key
    this.setState(prev => ({
      hasError: false,
      error: undefined,
      remountKey: prev.remountKey + 1,
    }))
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) { return <>{this.props.fallback}</> }
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
            padding: '16px',
            textAlign: 'center',
          }}
        >
          <h2>Something went wrong.</h2>
          <p>Try again, or refresh the page.</p>
          <div style={{ marginTop: '12px' }}>
            <Button onClick={this.handleRetry} style={{ padding: '8px 12px' }}>
              Try again
            </Button>
          </div>
        </div>
      )
    }
    // key ensures child subtree remounts after retry
    return (
      <React.Fragment key={this.state.remountKey}>
        {this.props.children}
      </React.Fragment>
    )
  }
}
