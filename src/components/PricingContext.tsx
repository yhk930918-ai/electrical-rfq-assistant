import type { ReactNode } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import type { Stage } from '../types';
import { customers, historicalQuotes, pricingRule } from '../data/mock';
import { Badge, btnPrimary, Reveal, SectionHeader } from './ui';

export function PricingContext({ stage, onNext }: { stage: Stage; onNext: () => void }) {
  return (
    <div>
      <Reveal>
        <SectionHeader
          num="03"
          title="整理报价依据"
          meta={<span>价格有来源，不是 AI 随口报的</span>}
        />
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal delay={0}>
          <CustomerHistoryCard />
        </Reveal>
        <Reveal delay={80}>
          <ErpCard />
        </Reveal>
        <Reveal delay={0}>
          <RecentQuotesCard />
        </Reveal>
        <Reveal delay={80}>
          <PricingRulesCard />
        </Reveal>
      </div>

      <Reveal delay={60}>
        <PriceRangeCard />
      </Reveal>

      {stage === 'pricing' && (
        <Reveal delay={60}>
          <div className="mt-9 flex justify-center">
            <button className={btnPrimary + ' px-6 py-3 text-[15px]'} onClick={onNext}>
              查看建议报价 <ArrowRight size={16} />
            </button>
          </div>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- 通用卡片壳 ---------- */
function CardShell({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="h-full rounded-2xl border border-line bg-surface p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        {badge}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  muted,
}: {
  label: string;
  value: ReactNode;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line-2 py-2.5 last:border-0">
      <span className="text-sm text-ink-3">{label}</span>
      <span
        className={`tnum text-sm ${muted ? 'text-ink-2' : 'font-medium text-ink'}`}
      >
        {value}
      </span>
    </div>
  );
}

/* ---------- 客户历史 ---------- */
function CustomerHistoryCard() {
  const c = customers[0];
  return (
    <CardShell title="客户历史" badge={<Badge tone="accent">CRM 模拟数据</Badge>}>
      <InfoRow label="客户" value={c.shortName} />
      <InfoRow label="等级 / 状态" value={`${c.tierLabel} · ${c.status}`} />
      <div className="mt-3 rounded-lg bg-paper/60 px-4 py-3">
        <div className="text-xs text-ink-3">最近一次同产品采购 · {c.lastPurchase?.sku}</div>
        <div className="tnum mt-1 text-xs text-ink-3">{c.lastPurchase?.date} · 数量 {c.lastPurchase?.qty}只</div>
        <div className="mt-1.5 flex items-baseline justify-between">
          <span className="text-sm font-medium text-ink">成交价格</span>
          <span className="tnum text-2xl font-semibold text-ink">¥{(c.lastPurchase?.price ?? 0).toFixed(2)}</span>
        </div>
      </div>
    </CardShell>
  );
}

/* ---------- ERP 信息 ---------- */
function ErpCard() {
  return (
    <CardShell title="ERP 信息" badge={<Badge tone="accent">ERP 模拟数据</Badge>}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs text-ink-3">当前库存（HD47-63 2P C32）</div>
          <div className="tnum mt-1 text-2xl font-semibold text-ink">
            3,680<span className="ml-1 text-sm font-normal text-ink-3">只</span>
          </div>
        </div>
        <Badge tone="green">
          <Check size={12} /> 库存充足
        </Badge>
      </div>
      <div className="mt-3">
        <InfoRow label="标准价格" value={`¥${pricingRule.standardPrice.toFixed(2)}`} />
        <InfoRow label="成本参考" value={`¥14.90`} muted />
        <InfoRow label="预计发货" value="1 day" />
      </div>
    </CardShell>
  );
}

/* ---------- 近期相似报价 ---------- */
function RecentQuotesCard() {
  return (
    <CardShell title="近期相似报价" badge={<Badge tone="accent">历史报价模拟数据</Badge>}>
      <div className="space-y-0.5">
        {historicalQuotes.map((q) => (
          <div
            key={q.date}
            className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-paper/60"
          >
            <div className="flex min-w-0 items-baseline gap-3">
              <span className="tnum shrink-0 text-xs text-ink-3">{q.date}</span>
              <span className="truncate text-sm text-ink">{q.buyer}</span>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <span className="tnum text-xs text-ink-3">{q.qty}只</span>
              <span className="tnum w-[64px] text-right text-sm font-semibold text-ink">
                ¥{q.price.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 text-xs text-ink-3">同规格 HD47-63 2P C32 · 近期成交</div>
    </CardShell>
  );
}

/* ---------- 企业价格规则 ---------- */
function PricingRulesCard() {
  return (
    <CardShell title="企业价格规则" badge={<Badge tone="neutral">价格规则</Badge>}>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3">
        <MiniStat label="客户等级" value={pricingRule.tier} />
        <MiniStat label="数量" value={String(pricingRule.qty)} />
        <MiniStat label="标准价" value={`¥${pricingRule.standardPrice.toFixed(2)}`} />
        <MiniStat
          label="销售授权区间"
          value={`¥${pricingRule.minAuthorized.toFixed(2)} – ¥${pricingRule.maxAuthorized.toFixed(2)}`}
          span
        />
        <MiniStat label={`低于 ¥${pricingRule.approvalThreshold.toFixed(2)}`} value="经理审批" accent />
      </div>
      <div className="mt-3 rounded-lg bg-amber-soft/60 px-4 py-2.5 text-xs leading-relaxed text-amber-deep">
        低于 ¥{pricingRule.approvalThreshold.toFixed(2)} 的报价需提交销售经理审批。
      </div>
    </CardShell>
  );
}

function MiniStat({
  label,
  value,
  span,
  accent,
}: {
  label: string;
  value: string;
  span?: boolean;
  accent?: boolean;
}) {
  return (
    <div className={`border-b border-line-2 py-2.5 ${span ? 'col-span-2 sm:col-span-2' : ''}`}>
      <div className="text-xs text-ink-3">{label}</div>
      <div className={`tnum mt-1 text-base font-semibold ${accent ? 'text-amber' : 'text-ink'}`}>
        {value}
      </div>
    </div>
  );
}

/* ---------- 价格区间可视化 ---------- */
function PriceRangeCard() {
  const min = pricingRule.minAuthorized;
  const max = pricingRule.maxAuthorized;
  const pos = pricingRule.suggestedPrice;
  const pct = ((pos - min) / (max - min)) * 100;

  return (
    <div className="mt-5 rounded-2xl border border-line bg-surface p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-ink">价格区间</h3>
        <span className="text-xs text-ink-3">销售授权区间 · {pricingRule.qty}只 · {pricingRule.tierLabel}</span>
      </div>

      <div className="relative mb-10 mt-12">
        {/* 当前位置标签 */}
        <div
          className="absolute -top-9 z-10 -translate-x-1/2 whitespace-nowrap"
          style={{ left: `${pct}%` }}
        >
          <span className="rounded-md bg-ink px-2.5 py-1 text-xs font-medium text-paper">
            建议价 <span className="tnum">¥{pos.toFixed(2)}</span>
          </span>
        </div>

        {/* 轨道 */}
        <div className="relative h-1.5 rounded-full bg-line">
          <div
            className="animate-bar absolute inset-y-0 left-0 rounded-full bg-accent"
            style={{ width: `${pct}%` }}
          />
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pct}%` }}
          >
            <span className="relative block h-5 w-5">
              <span
                className="absolute inset-0 rounded-full bg-accent/40"
                style={{ animation: 'pulseRing 2.4s ease-out infinite' }}
              />
              <span className="absolute inset-0 m-auto h-3.5 w-3.5 rounded-full border-2 border-surface bg-accent" />
            </span>
          </div>
        </div>

        {/* 两端刻度 */}
        <div className="absolute left-0 top-5 text-xs text-ink-3">
          最低授权 <span className="tnum font-medium text-ink">¥{min.toFixed(2)}</span>
        </div>
        <div className="absolute right-0 top-5 text-right text-xs text-ink-3">
          标准价 <span className="tnum font-medium text-ink">¥{max.toFixed(2)}</span>
        </div>
      </div>

      <p className="text-xs text-ink-3">低于 ¥{pricingRule.approvalThreshold.toFixed(2)} 需提交销售经理审批。</p>
    </div>
  );
}
