export interface LeadPayload {
  workflowId: string;
  workflowName: string;

  companyName: string;
  contactName: string;
  contact: string;
  email?: string;
  mainProducts?: string;
  dailyRfqs?: string;

  consent: boolean;

  targetCompany?: string;
  campaign?: string;
  source?: string;
  medium?: string;

  pageUrl: string;
  referrer?: string;

  demoVersion: string;
  submittedAt: string;

  website?: string;
}

export type SubmitLeadError =
  | 'INVALID_INPUT'
  | 'NETWORK_ERROR'
  | 'PROVIDER_ERROR'
  | 'RATE_LIMITED';

export type SubmitLeadResult =
  | { success: true }
  | { success: false; error: SubmitLeadError };
