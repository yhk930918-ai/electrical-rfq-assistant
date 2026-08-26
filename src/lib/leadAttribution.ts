export interface LeadAttribution {
  targetCompany?: string;
  campaign?: string;
  source?: string;
  medium?: string;
}

export function readLeadAttribution(): LeadAttribution {
  const params = new URLSearchParams(window.location.search);

  const read = (key: string) => {
    const value = params.get(key)?.trim();
    return value || undefined;
  };

  return {
    targetCompany: read('company'),
    campaign: read('campaign'),
    source: read('source'),
    medium: read('medium'),
  };
}
