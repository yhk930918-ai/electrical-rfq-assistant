import type { LeadPayload, SubmitLeadResult } from '../types';

const REQUEST_TIMEOUT_MS = 12_000;

export async function submitToFormspree(payload: LeadPayload): Promise<SubmitLeadResult> {
  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim();

  if (!endpoint) {
    return { success: false, error: 'PROVIDER_ERROR' };
  }

  try {
    const url = new URL(endpoint);
    if (!['http:', 'https:'].includes(url.protocol)) {
      return { success: false, error: 'PROVIDER_ERROR' };
    }
  } catch {
    return { success: false, error: 'PROVIDER_ERROR' };
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (response.status === 429) {
      return { success: false, error: 'RATE_LIMITED' };
    }

    return response.ok
      ? { success: true }
      : { success: false, error: 'PROVIDER_ERROR' };
  } catch {
    return { success: false, error: 'NETWORK_ERROR' };
  } finally {
    window.clearTimeout(timeoutId);
  }
}
