# tken-sdk

A lightweight TypeScript SDK for OpenAI-compatible APIs.

## Description

`tken-sdk` provides a simple, typed interface for interacting with OpenAI-compatible APIs. Built with TypeScript for excellent developer experience.

## Features

- TypeScript-first with full type definitions
- Minimal dependencies (no runtime external deps)
- Simple client interface
- Custom error classes
- Works with any OpenAI-compatible API

## Installation

```bash
npm install tken-sdk
```

## Quick Start

```typescript
import { TkenClient } from 'tken-sdk';

const client = new TkenClient({
  apiKey: process.env.API_KEY!,
  baseURL: 'https://tken.shop/v1',
  defaultModel: 'gpt-4o-mini'
});

const response = await client.chat({
  messages: [
    { role: 'user', content: 'Hello!' }
  ]
});

console.log(response.choices[0].message.content);
```

## Configuration

| Option | Required | Default | Description |
|--------|----------|---------|-------------|
| apiKey | Yes | - | API key for authentication |
| baseURL | No | `https://tken.shop/v1` | API base URL |
| defaultModel | No | `gpt-4o-mini` | Default model |
| timeout | No | `60000` | Request timeout (ms) |

## Examples

### Basic Chat

```typescript
const response = await client.chat({
  messages: [
    { role: 'user', content: 'Say hello!' }
  ]
});
```

### With Options

```typescript
const response = await client.chat({
  model: 'gpt-4o',
  messages: [
    { role: 'system', content: 'You are helpful.' },
    { role: 'user', content: 'What is TypeScript?' }
  ],
  temperature: 0.7,
  max_tokens: 100
});
```

## Get API Access

This SDK works with OpenAI-compatible APIs.

For testing, you can get access from:

**https://tken.shop**

- OpenAI-compatible format
- Free tier available
- No credit card required

## Need Gateway Features?

If you need multi-account key pools, automatic `429` retry, proxy rotation, or model-aware routing in front of your SDK calls, see:

- [free-openai-starter](https://github.com/vivian254338489/free-openai-starter)

That repository is the gateway / proxy manager companion to this SDK.

## Error Handling

```typescript
import { TkenClient, TkenConfigurationError, TkenAPIError } from 'tken-sdk';

try {
  const response = await client.chat({ messages: [...] });
} catch (error) {
  if (error instanceof TkenConfigurationError) {
    // Invalid SDK configuration
  } else if (error instanceof TkenAPIError) {
    // API returned an error
    console.error(error.status, error.message);
  } else {
    // Other error
  }
}
```

## API Reference

### TkenClient

Main SDK client.

#### Constructor

```typescript
new TkenClient(options: TkenClientOptions)
```

#### Methods

```typescript
chat(options: ChatRequestOptions): Promise<ChatCompletionResponse>
```

## Project Structure

```
tken-sdk/
├── src/
│   ├── index.ts      # Exports
│   ├── client.ts     # Main client
│   ├── types.ts      # Type definitions
│   └── errors.ts     # Error classes
├── examples/
│   ├── basic-chat.ts
│   └── basic-chat.js
└── docs/
    ├── configuration.md
    └── design.md
```

## License

MIT License - see [LICENSE](LICENSE)
