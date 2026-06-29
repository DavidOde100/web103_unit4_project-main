import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, info: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    this.setState({ error, info })
    console.error('ErrorBoundary caught error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, color: 'white', background: '#111' }}>
          <h2>Something went wrong</h2>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#fca5a5' }}>{String(this.state.error && this.state.error.toString())}</pre>
          <details style={{ whiteSpace: 'pre-wrap' }}>{this.state.info?.componentStack}</details>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
