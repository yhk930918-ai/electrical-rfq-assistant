import type { LeadPayload } from './types';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function lengthOf(value: string) {
  return Array.from(value.trim()).length;
}

export function isValidLeadPayload(payload: LeadPayload) {
  const companyLength = lengthOf(payload.companyName);
  const contactNameLength = lengthOf(payload.contactName);
  const contactLength = lengthOf(payload.contact);
  const mainProductsLength = lengthOf(payload.mainProducts ?? '');

  return (
    companyLength >= 2 &&
    companyLength <= 100 &&
    contactNameLength >= 1 &&
    contactNameLength <= 50 &&
    contactLength >= 3 &&
    contactLength <= 100 &&
    mainProductsLength <= 300 &&
    (!payload.email || emailPattern.test(payload.email.trim())) &&
    payload.consent === true &&
    Boolean(payload.workflowId.trim()) &&
    Boolean(payload.workflowName.trim()) &&
    Boolean(payload.pageUrl.trim()) &&
    Boolean(payload.demoVersion.trim()) &&
    Boolean(payload.submittedAt.trim())
  );
}
