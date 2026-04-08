/**
 * Basic chat example using tken-sdk (TypeScript)
 */

import { TkenClient } from '../src/index.js';

// Initialize client with environment variables
const client = new TkenClient({
  apiKey: process.env.API_KEY || '',
  baseURL: process.env.BASE_URL || 'https://tken.shop/v1',
  defaultModel: process.env.MODEL || 'gpt-4o-mini'
});

async function main() {
  console.log('Tken SDK Basic Chat Example');
  console.log('------------------------');

  try {
    const response = await client.chat({
      messages: [
        {
          role: 'user',
          content: 'Say hello in one sentence.'
        }
      ],
      temperature: 0.7,
      max_tokens: 50
    });

    console.log('Success!');
    console.log('------------------------');
    console.log(`Model: ${response.model}`);
    console.log(`Response: ${response.choices[0].message.content}`);
    console.log(`Tokens used: ${response.usage.total_tokens}`);

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
