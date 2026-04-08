# Configuration Guide

## Installation

```bash
npm install tken-sdk
```

## Quick Setup

```typescript
import { TkenClient } from 'tken-sdk';

const client = new TkenClient({
  apiKey: 'your-api-key',
  baseURL: 'https://tken.shop/v1',
  defaultModel: 'gpt-4o-mini'
});
```

## Constructor Options

### apiKey (required)

Your API key for authentication.

```typescript
const client = new TkenClient({
  apiKey: 'sk-xxxxx'
});
```

### baseURL (optional)

Base URL for the API endpoint. Must end with `/v1`.

- Default: `https://tken.shop/v1`
- OpenAI: `https://api.openai.com/v1`
- LocalAI: `http://localhost:8080/v1`

```typescript
const client = new TkenClient({
  apiKey: 'your-key',
  baseURL: 'https://your-provider.com/v1'
});
```

### defaultModel (optional)

Default model to use when not specified in `chat()`.

- Default: `gpt-4o-mini`

```typescript
const client = TkenClient({
  apiKey: 'your-key',
  defaultModel: 'gpt-4o'
});
```

### timeout (optional)

Request timeout in milliseconds.

- Default: `60000` (60 seconds)

```typescript
const client = new TkenClient({
  apiKey: 'your-key',
  timeout: 30000  // 30 seconds
});
```

## Using Environment Variables

```typescript
import { TkenClient } from 'tken-sdk';

const client = new TkenClient({
  apiKey: process.env.API_KEY || '',
  baseURL: process.env.BASE_URL || 'https://tken.shop/v1',
  defaultModel: process.env.MODEL || 'gpt-4o-mini'
});
```

## Model Selection

Override the default model per request:

```typescript
const response = await client.chat({
  model: 'gpt-4o',  // Override default
  messages: [{ role: 'user', content: 'Hello' }]
});
```

Or let it use the default:

```typescript
const response = await client.chat({
  messages: [{ role: 'user', content: 'Hello' }]
});
```
