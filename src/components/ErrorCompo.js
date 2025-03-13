import React, { Component } from 'react';
import Erreur from '../utils/erreur.js'; 

class ErrorCompo extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    
    const customError = new Erreur(error.message, 500);  

    
    customError.logError();

    
    this.setState({ error: customError, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      
      return (
        <div>
          <h1>Something went wrong.</h1>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.message}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    
    return this.props.children;
  }
}

export default ErrorCompo;
