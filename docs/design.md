# SDK Design

## Design Philosophy

tken-sdk is intentionally small and focused. It provides a minimal wrapper around OpenAI-compatible APIs without adding unnecessary complexity.

### Why Small?

- **Minimal dependencies**: No external runtime dependencies
- **Easy to understand**: Clear, readable code
- **Easy to debug**: Straightforward request/response handling
- **Easy to extend**: Simple structure for customization

### Compatibility Goals

The SDK is designed to work with any OpenAI-compatible API:

- Same request/response format as OpenAI
- Standard HTTP methods
- JSON content types
- Bearer token authentication

### Future Extensibility

The current design allows for easy addition of:

- **Streaming**: `chatStream()` method returning async iterator
- **Embeddings**: `embed()` method
- **Images**: `images.generate()` method
- **Audio**: `audio.transcribe()` method
- **Fine-tuning**: Management methods

### Architecture

```
src/
├── index.ts      # Main exports
├── client.ts     # TkenClient class
├── types.ts      # TypeScript interfaces
└── errors.ts     # Custom error classes
```

### Error Handling

The SDK provides specific error types for different failure modes:

- `TkenConfigurationError`: Invalid SDK setup
- `TkenRequestError`: Network/HTTP failures
- `TkenResponseError`: Malformed responses
- `TkenAPIError`: API-returned errors

This allows granular error handling in your application.

### TypeScript First

The SDK is written in TypeScript with full type definitions:

- Helpful IDE autocompletion
- Catch errors at compile time
- Self-documenting code

### No Dependencies

The SDK uses only standard APIs:

- `fetch` for HTTP requests
- Native TypeScript types
- No external packages at runtime
