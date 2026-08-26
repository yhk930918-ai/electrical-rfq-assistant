import { electricalRfqWorkflow } from '../config/workflows';

export type WorkflowEvent =
  | 'demo_started'
  | 'rfq_analyzed'
  | 'product_match_viewed'
  | 'pricing_viewed'
  | 'quotation_generated'
  | 'lead_form_opened'
  | 'lead_submit_started'
  | 'lead_submit_success'
  | 'lead_submit_failed';

export function track(event: WorkflowEvent, data: Record<string, unknown> = {}) {
  console.log(`[workflow] ${event}`, {
    workflowId: electricalRfqWorkflow.id,
    ...data,
  });
}
