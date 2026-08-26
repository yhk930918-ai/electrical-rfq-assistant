import { ArrowRight } from 'lucide-react';
import type { Stage } from '../types';
import { pricingRule, replacementPricingRule } from '../data/mock';
import { btnGhost, btnPrimary, btnSecondary, Reveal, SectionHeader } from './ui';

const primaryReasons = [
  '同数量档近期报价约 ¥18.80',
  '该客户上次成交 ¥18.60',
  '当前库存充足',
  '价格处于 B 级客户销售授权区间内',
];

const replacementReasons = [
  '客户要求 ≥10kA，采用 HD47H-63 高分断系列',
  '当前库存 350只，满足本次 200只需求',
  '目录标准价 ¥46.80，建议价在授权区间内',
  '未套用普通 6kA 型号价格，避免技术要求与报价不一致',
];

export function QuoteDecision({
  stage,
  onAdopt,
  onEditPrimary,
  onEditReplacement,
  onApprove,
}: {
  stage: Stage;
  onAdopt: () => void;
  onEditPrimary: () => void;
  onEditReplacement: () => void;
  onApprove: () => void;
}) {
  const showActions = stage === 'decision';

  return (
    <div>
      <Reveal>
        <SectionHeader
          num="04"
          title="建议报价"
          meta={<span>两项产品 · 含税含运费</span>}
        />
      </Reveal>

      <Reveal delay={60}>
        <div className="rounded-2xl border border-line bg-surface p-5 sm:p-8">
          <div className="grid gap-5 lg:grid-cols-2">
            <SuggestionCard
              sku="HD47-63 2P C32"
              quantity={pricingRule.qty}
              suggested={pricingRule.suggestedPrice}
              reasons={primaryReasons}
            />
            <SuggestionCard
              sku="HD47H-63 4P C63"
              quantity={replacementPricingRule.qty}
              suggested={replacementPricingRule.suggestedPrice}
              reasons={replacementReasons}
              replacement
            />
          </div>

          {showActions && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 border-t border-line-2 pt-6">
              <button className={btnPrimary + ' py-3.5 text-[15px]'} onClick={onAdopt}>
                采用两项建议价 <ArrowRight size={16} />
              </button>
              <button className={btnSecondary} onClick={onEditPrimary}>
                修改第一项价格
              </button>
              <button className={btnSecondary} onClick={onEditReplacement}>
                修改第二项价格
              </button>
              <button className={btnGhost + ' justify-center'} onClick={onApprove}>
                提交经理审批
              </button>
            </div>
          )}

          <p className="mt-6 border-t border-line-2 pt-4 text-xs leading-relaxed text-ink-3">
            AI 负责整理每一项报价依据，最终价格受企业 ERP、报价规则及销售权限控制。第二项因要求 10kA，使用高分断型号的独立价格规则。
          </p>
        </div>
      </Reveal>
    </div>
  );
}

function SuggestionCard({
  sku,
  quantity,
  suggested,
  reasons,
  replacement = false,
}: {
  sku: string;
  quantity: number;
  suggested: number;
  reasons: string[];
  replacement?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        replacement ? 'border-amber/30 bg-amber-soft/20' : 'border-line-2 bg-paper/35'
      }`}
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-ink-2">
        <span className="font-medium text-ink">建议报价</span>
        <span className="text-ink-3">
          {replacement ? '技术替代型号' : '客户原询型号'} · {quantity}只
        </span>
      </div>
      <div className="mt-2 font-mono text-[13px] font-medium text-ink">{sku}</div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="tnum text-[38px] font-semibold leading-none tracking-tight text-ink sm:text-[44px]">
          ¥{suggested.toFixed(2)}
        </span>
        <span className="text-sm text-ink-3">/ pc</span>
      </div>

      <div className="mt-6">
        <div className="text-xs font-medium text-ink-3">建议依据</div>
        <div className="mt-3 space-y-2.5">
          {reasons.map((reason, index) => (
            <div key={reason} className="flex items-start gap-3">
              <span className="tnum flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-soft text-[11px] font-semibold text-green">
                {index + 1}
              </span>
              <span className="text-sm leading-5 text-ink">{reason}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
