/**
 * TkenClient - Main SDK client for OpenAI-compatible APIs
 */

import type {
  TkenClientOptions,
  ChatRequestOptions,
  ChatCompletionResponse
} from './types.js';

import {
  TkenConfigurationError,
  TkenRequestError,
  TkenResponseError,
  TkenAPIError
} from './errors.js';

const DEFAULT_BASE_URL = 'https://tken.shop/v1';
const DEFAULT_MODEL = 'gpt-4o-mini';

/**
 * TkenClient provides a simple interface for interacting with OpenAI-compatible APIs.
 *
 * @example
 * ```typescript
 * const client = new TkenClient({
 *   apiKey: 'your-api-key',
 *   baseURL: 'https://tken.shop/v1',
 *   defaultModel: 'gpt-4o-mini'
 * });
 *
 * const response = await client.chat({
 *   messages: [{ role: 'user', content: 'Hello!' }]
 * });
 * ```
 */
export class TkenClient {
  private apiKey: string;
  private baseURL: string;
  private defaultModel: string;
  private timeout: number;

  /**
   * Creates a new TkenClient instance.
   *
   * @param options - Configuration options
   * @param options.apiKey - Your API key (required)
   * @param options.baseURL - Base URL for API (defaults to tken.shop)
   * @param options.defaultModel - Default model to use (defaults to gpt-4o-mini)
   * @param options.timeout - Request timeout in ms (defaults to 60000)
   */
  constructor(options: TkenClientOptions) {
    if (!options.apiKey) {
      throw new TkenConfigurationError('API key is required');
    }

    this.apiKey = options.apiKey;
    this.baseURL = options.baseURL || DEFAULT_BASE_URL;
    this.defaultModel = options.defaultModel || DEFAULT_MODEL;
    this.timeout = options.timeout || 60000;

    // Validate baseURL format
    if (!this.baseURL.endsWith('/v1') && !this.baseURL.endsWith('/v1/')) {
      throw new TkenConfigurationError('Base URL must end with /v1');
    }
  }

  /**
   * Send a chat completion request.
   *
   * @param options - Chat request options
   * @param options.model - Model to use (falls back to defaultModel)
   * @param options.messages - Array of chat messages
   * @param options.temperature - Sampling temperature (0-2)
   * @param options.max_tokens - Maximum tokens to generate
   * @returns Chat completion response
   */
  async chat(options: ChatRequestOptions): Promise<ChatCompletionResponse> {
    const model = options.model || this.defaultModel;

    if (!options.messages || options.messages.length === 0) {
      throw new TkenConfigurationError('At least one message is required');
    }

    const requestBody: Record<string, unknown> = {
      model,
      messages: options.messages
    };

    // Optional parameters
    if (options.temperature !== undefined) {
      requestBody.temperature = options.temperature;
    }
    if (options.max_tokens !== undefined) {
      requestBody.max_tokens = options.max_tokens;
    }
    if (options.stop !== undefined) {
      requestBody.stop = options.stop;
    }

    const url = `${this.baseURL}/chat/completions`;

    let response: Response;

    try {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(requestBody),
        signal: AbortSignal.timeout(this.timeout)
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'TimeoutError') {
          throw new TkenRequestError(`Request timed out after ${this.timeout}ms`);
        }
        throw new TkenRequestError(`Request failed: ${error.message}`);
      }
      throw new TkenRequestError('Request failed with unknown error');
    }

    // Handle non-2xx responses
    if (!response.ok) {
      let errorBody: unknown;
      try {
        errorBody = await response.json();
      } catch {
        errorBody = await response.text();
      }

      const errorMessage = this.extractErrorMessage(errorBody) || `HTTP ${response.status}`;

      throw new TkenAPIError(errorMessage, response.status, errorBody as TkenAPIError['error']);
    }

    // Parse response
    let data: ChatCompletionResponse;
    try {
      data = await response.json() as ChatCompletionResponse;
    } catch {
      throw new TkenResponseError('Failed to parse API response');
    }

    // Validate response structure
    if (!data.choices || data.choices.length === 0) {
      throw new TkenResponseError('Unexpected response: no choices returned');
    }

    if (!data.choices[0].message) {
      throw new TkenResponseError('Unexpected response: no message in choice');
    }

    return data;
  }

  /**
   * Extract error message from API error response.
   */
  private extractErrorMessage(body: unknown): string | null {
    if (typeof body !== 'object' || body === null) {
      return null;
    }

    const obj = body as Record<string, unknown>;

    if (obj.error && typeof obj.error === 'object') {
      const error = obj.error as Record<string, unknown>;
      if (typeof error.message === 'string') {
        return error.message;
      }
    }

    if (typeof obj.message === 'string') {
      return obj.message;
    }

    return null;
  }
}

// Named export for convenience
export { TkenClient as Client };
