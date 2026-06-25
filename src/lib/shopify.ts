import { createStorefrontClient } from '@shopify/hydrogen-react';
import { env } from './env';

const storeDomain = env.SHOPIFY_STORE_DOMAIN;
const privateStorefrontToken = env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export const shopifyClient = createStorefrontClient({
  storeDomain,
  privateStorefrontToken,
  storefrontApiVersion: '2024-07',
});

export async function shopifyQuery<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const url = shopifyClient.getStorefrontApiUrl();
  const headers = shopifyClient.getPrivateTokenHeaders();

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(`Shopify query error: ${JSON.stringify(json.errors)}`);
  }

  return json.data as T;
}
