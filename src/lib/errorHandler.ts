/**
 * Global Error Handler for Qubitt Technologies
 * Handles uncaught errors and unhandled promise rejections
 */

// Error severity levels
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

/**
 * Log error to console and optionally to error tracking service
 */
export function logError(
  error: Error | string,
  context?: Record<string, unknown>,
  severity: ErrorSeverity = 'medium'
): void {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;

  // Console logging with styling
  const styles: Record<ErrorSeverity, string> = {
    low: 'color: #3b82f6',
    medium: 'color: #f59e0b',
    high: 'color: #ef4444',
    critical: 'color: #dc2626; font-weight: bold',
  };

  console.group(`%c[${severity.toUpperCase()}] Error`, styles[severity]);
  console.error('Message:', errorMessage);
  if (context) console.error('Context:', context);
  if (errorStack) console.error('Stack:', errorStack);
  console.groupEnd();

  // In production, you could send to error tracking service like Sentry
  // Example: Sentry.captureException(error, { extra: context });
}

/**
 * Initialize global error handlers
 */
export function initializeErrorHandlers(): () => void {
  // Handle uncaught errors
  const handleError = (event: ErrorEvent) => {
    logError(event.error || new Error(event.message), {
      type: 'uncaught_error',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    }, 'high');
    
    // Prevent default browser error handling in development
    if (import.meta.env.DEV) {
      event.preventDefault();
    }
  };

  // Handle unhandled promise rejections
  const handleRejection = (event: PromiseRejectionEvent) => {
    logError(event.reason || new Error('Unhandled Promise Rejection'), {
      type: 'unhandled_promise_rejection',
    }, 'high');
    
    // Prevent default browser error handling in development
    if (import.meta.env.DEV) {
      event.preventDefault();
    }
  };

  // Add event listeners
  window.addEventListener('error', handleError);
  window.addEventListener('unhandledrejection', handleRejection);
  
  // Cleanup function
  return () => {
    window.removeEventListener('error', handleError);
    window.removeEventListener('unhandledrejection', handleRejection);
  };
}

/**
 * Create a safe async handler wrapper
 */
export function createSafeHandler<T extends (...args: unknown[]) => Promise<unknown>>(
  handler: T,
  fallbackValue?: unknown,
  errorContext?: Record<string, unknown>
): (...args: Parameters<T>) => Promise<unknown> {
  return async (...args: Parameters<T>) => {
    try {
      return await handler(...args);
    } catch (error) {
      logError(
        error instanceof Error ? error : new Error(String(error)),
        { handler: handler.name, args, ...errorContext },
        'medium'
      );
      return fallbackValue;
    }
  };
}

/**
 * Create a safe event handler wrapper
 */
export function createEventHandler<T extends (...args: unknown[]) => void>(
  handler: T,
  errorContext?: Record<string, unknown>
): (...args: Parameters<T>) => void {
  return (...args: Parameters<T>) => {
    try {
      handler(...args);
    } catch (error) {
      logError(
        error instanceof Error ? error : new Error(String(error)),
        { handler: handler.name, args, ...errorContext },
        'medium'
      );
    }
  };
}

/**
 * Retry a function with exponential backoff
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    delay?: number;
    backoff?: number;
    onRetry?: (attempt: number, error: Error) => void;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    delay = 1000,
    backoff = 2,
    onRetry,
  } = options;

  let lastError: Error;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt < maxRetries - 1) {
        const waitTime = delay * Math.pow(backoff, attempt);
        onRetry?.(attempt + 1, lastError);
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  throw lastError!;
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return true;
  }
  if (error instanceof Error && error.message.includes('NetworkError')) {
    return true;
  }
  return false;
}

/**
 * Check if error is an authentication error
 */
export function isAuthError(error: unknown): boolean {
  if (error instanceof Response) {
    return error.status === 401 || error.status === 403;
  }
  if (error instanceof Error) {
    return error.message.includes('Unauthorized') || error.message.includes('Forbidden');
  }
  return false;
}
