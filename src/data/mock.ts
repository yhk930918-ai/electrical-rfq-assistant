// ============================================================
// 本地 Mock 数据 —— 第一版仅覆盖 小型断路器 / MCB 产品线
// 所有数据仅用于公开演示，不连接任何真实 ERP / CRM / 数据库。
// ============================================================

export interface Product {
  id: string;
  sku: string;
  name: string;
  series: string;
  poles: number;
  curve: 'C' | 'D';
  current: number; // A
  breaking: number; // kA
  cert: string[];
  stock: number;
  price: number; // 标准价
  cost: number; // 成本参考
  leadTimeDays: number;
}

export const products: Product[] = [
  // ---- HD47-63 系列（6kA · 小型断路器）----
  { id: 'hd-1p-c16', sku: 'HD47-63 1P C16', name: '小型断路器', series: 'HD47-63', poles: 1, curve: 'C', current: 16, breaking: 6, cert: ['CCC'], stock: 4200, price: 12.4, cost: 9.3, leadTimeDays: 1 },
  { id: 'hd-1p-c20', sku: 'HD47-63 1P C20', name: '小型断路器', series: 'HD47-63', poles: 1, curve: 'C', current: 20, breaking: 6, cert: ['CCC'], stock: 3800, price: 12.8, cost: 9.6, leadTimeDays: 1 },
  { id: 'hd-1p-c25', sku: 'HD47-63 1P C25', name: '小型断路器', series: 'HD47-63', poles: 1, curve: 'C', current: 25, breaking: 6, cert: ['CCC'], stock: 3600, price: 13.2, cost: 9.9, leadTimeDays: 1 },
  { id: 'hd-1p-c32', sku: 'HD47-63 1P C32', name: '小型断路器', series: 'HD47-63', poles: 1, curve: 'C', current: 32, breaking: 6, cert: ['CCC'], stock: 4100, price: 13.9, cost: 10.4, leadTimeDays: 1 },
  { id: 'hd-1p-c40', sku: 'HD47-63 1P C40', name: '小型断路器', series: 'HD47-63', poles: 1, curve: 'C', current: 40, breaking: 6, cert: ['CCC'], stock: 2200, price: 14.6, cost: 11.0, leadTimeDays: 1 },
  { id: 'hd-1p-c50', sku: 'HD47-63 1P C50', name: '小型断路器', series: 'HD47-63', poles: 1, curve: 'C', current: 50, breaking: 6, cert: ['CCC'], stock: 1800, price: 15.8, cost: 11.9, leadTimeDays: 1 },
  { id: 'hd-1p-c63', sku: 'HD47-63 1P C63', name: '小型断路器', series: 'HD47-63', poles: 1, curve: 'C', current: 63, breaking: 6, cert: ['CCC'], stock: 1600, price: 16.9, cost: 12.7, leadTimeDays: 1 },
  { id: 'hd-2p-c16', sku: 'HD47-63 2P C16', name: '小型断路器', series: 'HD47-63', poles: 2, curve: 'C', current: 16, breaking: 6, cert: ['CCC'], stock: 2500, price: 17.2, cost: 12.9, leadTimeDays: 1 },
  { id: 'hd-2p-c32', sku: 'HD47-63 2P C32', name: '小型断路器', series: 'HD47-63', poles: 2, curve: 'C', current: 32, breaking: 6, cert: ['CCC'], stock: 3680, price: 19.2, cost: 14.9, leadTimeDays: 1 },
  { id: 'hd-2p-c40', sku: 'HD47-63 2P C40', name: '小型断路器', series: 'HD47-63', poles: 2, curve: 'C', current: 40, breaking: 6, cert: ['CCC'], stock: 1400, price: 20.5, cost: 15.6, leadTimeDays: 1 },
  { id: 'hd-2p-c63', sku: 'HD47-63 2P C63', name: '小型断路器', series: 'HD47-63', poles: 2, curve: 'C', current: 63, breaking: 6, cert: ['CCC'], stock: 900, price: 22.8, cost: 17.1, leadTimeDays: 1 },
  { id: 'hd-3p-c32', sku: 'HD47-63 3P C32', name: '小型断路器', series: 'HD47-63', poles: 3, curve: 'C', current: 32, breaking: 6, cert: ['CCC'], stock: 2100, price: 27.5, cost: 20.6, leadTimeDays: 2 },
  { id: 'hd-3p-c63', sku: 'HD47-63 3P C63', name: '小型断路器', series: 'HD47-63', poles: 3, curve: 'C', current: 63, breaking: 6, cert: ['CCC'], stock: 800, price: 31.8, cost: 23.8, leadTimeDays: 2 },
  { id: 'hd-4p-c32', sku: 'HD47-63 4P C32', name: '小型断路器', series: 'HD47-63', poles: 4, curve: 'C', current: 32, breaking: 6, cert: ['CCC'], stock: 1200, price: 35.2, cost: 26.4, leadTimeDays: 2 },
  { id: 'hd-4p-c63', sku: 'HD47-63 4P C63', name: '小型断路器', series: 'HD47-63', poles: 4, curve: 'C', current: 63, breaking: 6, cert: ['CCC'], stock: 600, price: 38.5, cost: 28.9, leadTimeDays: 2 },
  // ---- HD47H-63 高分断系列（10kA）----
  { id: 'hdh-1p-c16', sku: 'HD47H-63 1P C16', name: '高分断小型断路器', series: 'HD47H-63', poles: 1, curve: 'C', current: 16, breaking: 10, cert: ['CCC'], stock: 1500, price: 16.8, cost: 12.6, leadTimeDays: 2 },
  { id: 'hdh-1p-c32', sku: 'HD47H-63 1P C32', name: '高分断小型断路器', series: 'HD47H-63', poles: 1, curve: 'C', current: 32, breaking: 10, cert: ['CCC'], stock: 1200, price: 18.5, cost: 13.9, leadTimeDays: 2 },
  { id: 'hdh-2p-c32', sku: 'HD47H-63 2P C32', name: '高分断小型断路器', series: 'HD47H-63', poles: 2, curve: 'C', current: 32, breaking: 10, cert: ['CCC'], stock: 900, price: 24.6, cost: 18.5, leadTimeDays: 2 },
  { id: 'hdh-2p-c63', sku: 'HD47H-63 2P C63', name: '高分断小型断路器', series: 'HD47H-63', poles: 2, curve: 'C', current: 63, breaking: 10, cert: ['CCC'], stock: 700, price: 28.9, cost: 21.7, leadTimeDays: 2 },
  { id: 'hdh-3p-c32', sku: 'HD47H-63 3P C32', name: '高分断小型断路器', series: 'HD47H-63', poles: 3, curve: 'C', current: 32, breaking: 10, cert: ['CCC'], stock: 800, price: 34.2, cost: 25.7, leadTimeDays: 2 },
  { id: 'hdh-3p-c63', sku: 'HD47H-63 3P C63', name: '高分断小型断路器', series: 'HD47H-63', poles: 3, curve: 'C', current: 63, breaking: 10, cert: ['CCC'], stock: 500, price: 38.6, cost: 29.0, leadTimeDays: 2 },
  { id: 'hdh-4p-c32', sku: 'HD47H-63 4P C32', name: '高分断小型断路器', series: 'HD47H-63', poles: 4, curve: 'C', current: 32, breaking: 10, cert: ['CCC'], stock: 400, price: 42.5, cost: 31.9, leadTimeDays: 3 },
  { id: 'hdh-4p-c63', sku: 'HD47H-63 4P C63', name: '高分断小型断路器', series: 'HD47H-63', poles: 4, curve: 'C', current: 63, breaking: 10, cert: ['CCC'], stock: 350, price: 46.8, cost: 35.1, leadTimeDays: 3 },
];

// ---------------- 客户 ----------------
export interface Customer {
  id: string;
  name: string;
  shortName: string;
  tier: string;
  tierLabel: string;
  status: string;
  lastPurchase?: { date: string; sku: string; qty: number; price: number };
}

export const customers: Customer[] = [
  {
    id: 'c-nb-hc',
    name: '宁波华成电气有限公司',
    shortName: '宁波华成电气',
    tier: 'B',
    tierLabel: 'B级经销商',
    status: '老客户',
    lastPurchase: { date: '2026/05/16', sku: 'HD47-63 2P C32', qty: 500, price: 18.6 },
  },
];

// ---------------- 历史报价 ----------------
export interface HistoricalQuote {
  date: string;
  buyer: string;
  qty: number;
  price: number;
  sku: string;
}

export const historicalQuotes: HistoricalQuote[] = [
  { date: '2026/07/20', buyer: '杭州某设备', qty: 1000, price: 18.5, sku: 'HD47-63 2P C32' },
  { date: '2026/06/08', buyer: '宁波某贸易', qty: 500, price: 18.8, sku: 'HD47-63 2P C32' },
  { date: '2026/05/12', buyer: '台州某电气', qty: 300, price: 19.1, sku: 'HD47-63 2P C32' },
];

// ---------------- 企业价格规则 ----------------
export interface PricingRule {
  tier: string;
  tierLabel: string;
  qty: number;
  standardPrice: number;
  minAuthorized: number;
  maxAuthorized: number;
  approvalThreshold: number;
  suggestedPrice: number;
}

export const pricingRule: PricingRule = {
  tier: 'B',
  tierLabel: 'B级经销商',
  qty: 500,
  standardPrice: 19.2,
  minAuthorized: 18.3,
  maxAuthorized: 19.2,
  approvalThreshold: 18.3,
  suggestedPrice: 18.8,
};

// ---------------- 客户询价 ----------------
export interface Rfq {
  customer: string;
  time: string;
  message: string;
  attachment: { name: string; pages: number };
}

export const defaultRfq: Rfq = {
  customer: '宁波华成电气',
  time: '09:31',
  message:
    '王经理，DZ47-63 2P C32 6kA 500只，\n4P C63 200只。\n要CCC，含税送宁波，9月10号之前要。\n另外帮我看下有没有价格合适一点的替代型号。',
  attachment: { name: '技术要求.pdf', pages: 2 },
};

// ---------------- AI 解析结果 ----------------
export interface ParsedProduct {
  raw: string;
  fields: { label: string; value: string }[];
  status: 'complete' | 'review';
  note?: string;
}

export const parsedProducts: ParsedProduct[] = [
  {
    raw: 'DZ47-63 2P C32 6kA × 500',
    fields: [
      { label: '产品', value: '小型断路器' },
      { label: '系列', value: 'DZ47-63' },
      { label: '极数', value: '2P' },
      { label: '曲线', value: 'C' },
      { label: '额定电流', value: '32A' },
      { label: '分断能力', value: '6kA' },
      { label: '数量', value: '500' },
      { label: '认证', value: 'CCC' },
    ],
    status: 'complete',
  },
  {
    raw: 'DZ47-63 4P C63 × 200',
    fields: [
      { label: '产品', value: '小型断路器' },
      { label: '系列', value: 'DZ47-63' },
      { label: '极数', value: '4P' },
      { label: '曲线', value: 'C' },
      { label: '额定电流', value: '63A' },
      { label: '数量', value: '200' },
      { label: '认证', value: 'CCC' },
    ],
    status: 'review',
    note: '分断能力 ≥10kA',
  },
];

// ---------------- 采购条件 ----------------
export interface Condition {
  label: string;
  value: string;
}

export const conditions: Condition[] = [
  { label: '配送地', value: '宁波' },
  { label: '税', value: '含13%增值税' },
  { label: '要求到货', value: '2026/09/10' },
  { label: '认证', value: 'CCC' },
  { label: '特殊要求', value: '希望寻找更具价格竞争力的替代型号' },
];

// ---------------- 客户回复草稿 ----------------
export const replyText = `张总您好，您询的两款产品已经核对。

2P C32 可对应我司 HD47-63 系列；

4P C63 根据技术文件中的 10kA 分断要求，建议使用 HD47H 高分断系列。

目前库存和交期可以满足 9月10日前到货。

正式报价已经整理好，请查收。`;

// ---------------- 价值对比 ----------------
export const traditionalSteps = [
  '整理客户参数',
  '查产品目录',
  '找对应型号',
  '核对技术要求',
  '查历史报价',
  '打开 ERP',
  '确认库存',
  '判断价格',
  '制作 Excel',
  '写客户回复',
];

export const aiSteps = ['AI 整理报价依据', '销售检查型号', '确认价格', '生成报价'];
