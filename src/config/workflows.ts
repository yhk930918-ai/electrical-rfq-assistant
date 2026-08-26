export interface WorkflowConfig {
  id: string;
  name: string;
  version: string;
}

export const workflows = {
  'electrical-rfq': {
    id: 'electrical-rfq',
    name: '电气行业 AI 询价助手',
    version: 'public-demo-v1',
  },
} as const satisfies Record<string, WorkflowConfig>;

export const electricalRfqWorkflow = workflows['electrical-rfq'];
