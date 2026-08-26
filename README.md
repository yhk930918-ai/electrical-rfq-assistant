# 电气行业 AI 询价助手 · CoreSelf Lab Demo

面向低压电器 / 小型断路器生产企业的「AI 询价 → 报价辅助」销售演示。当前公开地址为：

```text
https://electrical-rfq-assistant.vercel.app/electrical-rfq
```

当前页面保留「华东电气」作为 Demo 中的模拟企业，不代表 CoreSelf Lab 就是该企业。企业名称、客户、库存、价格及交易数据均为模拟数据，不构成真实商业报价。

## 本地运行

安装依赖：

```bash
npm install
```

开发：

```bash
npm run dev
```

打开 http://localhost:5173/electrical-rfq。访问根路径 `/` 时会自动跳转到 `/electrical-rfq`。

Build：

```bash
npm run build
```

预览生产构建：

```bash
npm run preview
```

## 环境变量

复制 `.env.example` 为 `.env.local`，将 Formspree endpoint 替换为自己 Form 的 endpoint：

```text
VITE_LEAD_PROVIDER=formspree
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
VITE_DEMO_BASE_URL=https://electrical-rfq-assistant.vercel.app
```

不要把真实个人密钥或其他云平台凭证提交到代码仓库。Formspree endpoint 属于前端公开配置，但仍应通过 Formspree 的域名限制和服务端能力控制滥用。

## Formspree 配置

1. 注册 Formspree 免费账户。
2. 创建一个 Form。
3. 配置个人通知邮箱。
4. 获取 Formspree endpoint。
5. 在 Vercel 项目环境变量中设置 `VITE_FORMSPREE_ENDPOINT`，并设置 `VITE_LEAD_PROVIDER=formspree`。
6. 重新部署。
7. 使用下面的验收链接测试真实提交。
8. 检查 Formspree Dashboard 和个人邮箱是否收到通知。

如果当前 Formspree 套餐支持 Domain Restriction，部署完成后可将来源限制为当前实际使用的 Vercel 域名：

```text
electrical-rfq-assistant.vercel.app
```

## Vercel 部署

1. 将项目导入 Vercel。
2. 构建命令使用 `npm run build`，输出目录使用 `dist`。
3. 在 Vercel 项目的 Production Environment Variables 中配置 `.env.example` 中的变量。
4. 部署完成后直接使用 Vercel 提供的 Production 域名访问 `/electrical-rfq`。

仓库中的 `vercel.json` 将所有深层路径回退到 SPA 的 `index.html`，因此直接打开或刷新 `/electrical-rfq` 不会出现 404。根路径会由前端自动跳转到当前唯一 Demo，未来可再升级为 Workflow Gallery。

## Lead 数据与 Workflow

线索提交统一经过：

```text
Lead Form UI → submitLead(payload) → Formspree Provider
```

当前 Workflow 配置位于 `src/config/workflows.ts`：

```text
workflowId: electrical-rfq
workflowName: 电气行业 AI 询价助手
demoVersion: public-demo-v1
```

页面顶部、核心产品匹配与参数冲突之后、Demo 最终 CTA 都通过 `openLeadForm(placement)` 打开同一个 Lead Modal，不会创建第二套表单。表单会提交企业名称、称呼、联系方式、可选邮箱、主营产品、每日询价量、同意状态、`leadFormPlacement`、页面 URL、来源参数、referrer、提交时间和 honeypot 字段。URL 中的 `company` 会映射为 `targetCompany`，不会公开显示在页面上：

```text
https://electrical-rfq-assistant.vercel.app/electrical-rfq?company=浙江XX电气&campaign=breaker-01&source=email&medium=cold-outreach
```

来源参数在表单打开后不会展示给用户，只会随 LeadPayload 提交。

## 邮件 CTA

HTML 邮件模板位于 `email/demo-invite.html`。邮件只保留一个主按钮「体验 AI 询价 Demo →」，按钮上方明确标注「完整流程大约 2 分钟」。邮件中的企业测试申请发生在 Demo 内部，直接回复邮件只作为文字备用方式。

## 演示流程

客户询价 → AI 处理（约 2 秒）→ 01 理解询价 → 02 匹配公司产品（含参数风险与替代型号）→
03 整理报价依据（客户历史 / 历史报价 / ERP / 价格区间）→ 04 建议报价（含价格越权体验）→
05 报价草稿 + 客户回复 → 价值总结 → 企业测试 CTA。用户也可以在顶部或看到匹配价值与参数风险后，主动打开同一个企业测试表单。

当前 Analytics 仅通过 `console.log` 预留，所有事件自动带有 `workflowId`，不接入付费 Analytics。

## 目录

```text
src/
  config/workflows.ts              # Workflow ID、名称、版本
  data/mock.ts                     # 产品目录 / 客户 / 报价等 Mock 数据
  services/lead/                   # LeadPayload、统一提交服务、Formspree provider
  lib/analytics.ts                 # workflow analytics 预留
  lib/leadAttribution.ts           # URL 营销参数读取
  components/                      # 按业务场景拆分的 UI 组件
  App.tsx                          # 单页连续业务流程状态机
vercel.json                        # SPA 深层路径回退
.env.example                       # 公开环境变量示例
```

## 验收测试

部署后访问：

```text
https://electrical-rfq-assistant.vercel.app/electrical-rfq?company=浙江测试电气&campaign=test01&source=email&medium=cold-outreach
```

从顶部、匹配结果后的入口或最终 CTA 任意打开统一企业测试表单，填写：

```text
企业名称：浙江测试电气有限公司
联系人：王经理
联系方式：138xxxxxxxx
主营产品：小型断路器
询价：30～100条
```

勾选同意后提交。页面应显示「✓ 申请已提交」，Formspree Submission 和通知邮箱中应包含：

```text
workflowId = electrical-rfq
workflowName = 电气行业 AI 询价助手
targetCompany = 浙江测试电气
campaign = test01
source = email
medium = cold-outreach
```

同时应检查 `leadFormPlacement` 是否分别记录为 `header`、`after_product_match` 或 `final_cta`。

也应检查：空字段、超长字段、错误邮箱、未勾选同意、断网、重复点击和直接刷新深层路径。

## Future: Migrating from Formspree to Resend

未来切换到 Resend 时，保持当前表单和 `LeadPayload` 不变：

1. 保持 `LeadPayload` 不变。
2. 增加 Vercel Serverless 的 `/api/lead`。
3. 在后端重新校验和清洗 `LeadPayload`。
4. 后端使用 Resend 发送到个人邮箱。
5. 增加 `src/services/lead/providers/api.ts`，让它实现相同的 `SubmitLeadResult`。
6. 将 `VITE_LEAD_PROVIDER=formspree` 改为 `VITE_LEAD_PROVIDER=api`。
7. UI 不需要修改。

当前不实现 Resend、数据库、CRM、登录或后台。新增其他 Workflow 时，只需扩充 Workflow 配置并复用 Lead、来源追踪和 Analytics 公共层。
