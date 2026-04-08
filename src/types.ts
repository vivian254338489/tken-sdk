/**
 * TypeScript types for tken-sdk
 */

/**
 * Represents a chat message in the conversation.
 */
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * Options for chat completion request.
 */
export interface ChatRequestOptions {
  /**
   * The model to use for chat completion.
   * Falls back to defaultModel set in client constructor.
   */
  model?: string;

  /**
   * Array of chat messages.
   */
  messages: ChatMessage[];

  /**
   * Sampling temperature (0-2).
   * Higher values make output more random, lower values more deterministic.
   */
  temperature?: number;

  /**
   * Maximum tokens to generate.
   */
  max_tokens?: number;

  /**
   * Stop sequences (optional).
   */
  stop?: string | string[];
}

/**
 * Configuration options for TkenClient constructor.
 */
export interface TkenClientOptions {
  /**
   * API key for authentication.
   */
  apiKey: string;

  /**
   * Base URL for the API endpoint.
   * Defaults to https://tken.shop/v1
   */
  baseURL?: string;

  /**
   * Default model to use if not specified in chat() call.
   */
  defaultModel?: string;

  /**
   * Optional request timeout in milliseconds.
   */
  timeout?: number;
}

/**
 * Usage statistics from API response.
 */
export interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

/**
 * Chat completion choice from API response.
 */
export interface Choice {
  message: ChatMessage;
  finish_reason: string;
  index: number;
}

/**
 * Chat completion response from API.
 */
export interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: Usage;
}
