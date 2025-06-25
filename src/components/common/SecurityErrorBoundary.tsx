
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  errorId: string;
}

export class SecurityErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorId: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    // Generate a unique error ID for tracking
    const errorId = `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return { hasError: true, errorId };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error securely without exposing sensitive information
    console.group('🔒 Security Error Boundary');
    console.error('Error ID:', this.state.errorId);
    console.error('Component Stack:', errorInfo.componentStack);
    console.error('Error:', error.name);
    console.groupEnd();
    
    // In production, you would send this to your error tracking service
    // with proper sanitization to avoid leaking sensitive data
  }

  handleReset = () => {
    this.setState({ hasError: false, errorId: '' });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <Card className="max-w-md w-full bg-red-900/20 border-red-500/30">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <CardTitle className="text-red-200">Something went wrong</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-red-300 text-sm">
                We encountered an unexpected error. Your data is safe.
              </p>
              <p className="text-red-400 text-xs font-mono">
                Error ID: {this.state.errorId}
              </p>
              <Button 
                onClick={this.handleReset}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
