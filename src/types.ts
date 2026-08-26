// 全局业务流程状态
export type Stage =
  | 'rfq' // 客户询价
  | 'analyzing' // AI 处理中
  | 'extracted' // 01 理解询价
  | 'matching' // 02 匹配公司产品（动画）
  | 'conflict' // 02 发现参数风险
  | 'pricing' // 03 整理报价依据
  | 'decision' // 04 建议报价
  | 'quote' // 05 报价草稿
  | 'summary'; // 价值总结 + CTA
