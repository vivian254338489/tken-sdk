/**
 * Custom error classes for tken-sdk
 */

/**
 * Base error class for all SDK errors.
 */
export class TkenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TkenError';
    Error.captureStackTrace?.(this, this.constructor);
  }
}

/**
 * Error thrown when SDK configuration is invalid.
 * For example: missing API key, invalid base URL.
 */
export class TkenConfigurationError extends TkenError {
  constructor(message: string) {
    super(message);
    this.name = 'TkenConfigurationError';
  }
}

/**
 * Error thrown when HTTP request fails.
 * Includes status code and response details.
 */
export class TkenRequestError extends TkenError {
  status?: number;
  response?: unknown;

  constructor(message: string, status?: number, response?: unknown) {
    super(message);
    this.name = 'TkenRequestError';
    this.status = status;
    this.response = response;
  }
}

/**
 * Error thrown when API response is malformed or unexpected.
 */
export class TkenResponseError extends TkenError {
  constructor(message: string) {
    super(message);
    this.name = 'TkenResponseError';
  }
}

/**
 * Error thrown when API returns an error in the response body.
 */
export class TkenAPIError extends TkenError {
  status?: number;
  error?: {
    message?: string;
    type?: string;
    code?: string;
  };

  constructor(message: string, status?: number, error?: TkenAPIError['error']) {
    super(message);
    this.name = 'TkenAPIError';
    this.status = status;
    this.error = error;
  }
}
