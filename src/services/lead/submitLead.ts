import { submitToFormspree } from './providers/formspree';
import { isValidLeadPayload } from './validateLead';
import type { LeadPayload, SubmitLeadResult } from './types';

export async function submitLead(payload: LeadPayload): Promise<SubmitLeadResult> {
  if (!isValidLeadPayload(payload) || Boolean(payload.website?.trim())) {
    return { success: false, error: 'INVALID_INPUT' };
  }

  const provider = (import.meta.env.VITE_LEAD_PROVIDER ?? 'formspree').trim().toLowerCase();

  if (provider === 'formspree') {
    return submitToFormspree(payload);
  }

  // Future providers (for example providers/api.ts) can be selected here
  // without changing LeadPayload or the form UI.
  return { success: false, error: 'PROVIDER_ERROR' };
}
