import { ArrowRight, Check } from 'lucide-react';
import type { Stage } from '../types';
import { pricingRule } from '../data/mock';
import { btnGhost, btnPrimary, btnSecondary, Reveal, SectionHeader } from './ui';

const reasons = [
  '同数量档近期报价约 ¥18.80',
  '该客户上次成交 ¥18.60',
  '当前库存充足',
  '价格处于 B 级客户销售授权区间内',
];

export function QuoteDecision({
  stage,
  onAdopt,
  onEdit,
  onApprove,
}: {
  stage: Stage;
  onAdopt: () => void;
  onEdit: () => void;
  onApprove: () => void;
}) {
  const showActions = stage === 'decision';
  const suggested = pricingRule.suggestedPrice;

  return (
    <div>
      <Reveal>
        <SectionHeader
          num="04"
          title="建议报价"
          meta={<span>HD47-63 2P C32 · {pricingRule.qty}只</span>}
        />
      </Reveal>

      <Reveal delay={60}>
        <div className="rounded-2xl border border-line bg-surface p-6 sm:p-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-md">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-ink-2">
                <span className="font-medium text-ink">建议报价</span>
                <span className="text-ink-3">
                  报价产品{' '}
                  <span className="font-mono font-medium text-ink">HD47-63 2P C32</span> · 含税含运费
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="tnum text-[44px] font-semibold leading-none tracking-tight text-ink sm:text-[54px]">
                  ¥{suggested.toFixed(2)}
                </span>
                <span className="text-sm text-ink-3">/ pc</span>
              </div>

              <div className="mt-8">
                <div className="text-xs font-medium text-ink-3">建议依据</div>
                <div className="mt-3 space-y-2.5">
                  {reasons.map((r, i) => (
                    <Reveal key={r} delay={80 + i * 70}>
                      <div className="flex items-center gap-3">
                        <span className="tnum flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-soft text-[11px] font-semibold text-green">
                          {i + 1}
                        </span>
                        <span className="text-sm text-ink">{r}</span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>

            {showActions && (
              <div className="flex w-full max-w-xs flex-col gap-2.5">
                <button className={btnPrimary + ' py-3.5 text-[15px]'} onClick={onAdopt}>
                  采用 ¥{suggested.toFixed(2)} <ArrowRight size={16} />
                </button>
                <button className={btnSecondary} onClick={onEdit}>
                  修改价格
                </button>
                <button className={btnGhost + ' justify-center'} onClick={onApprove}>
                  提交经理审批
                </button>
              </div>
            )}
          </div>

          <p className="mt-8 border-t border-line-2 pt-4 text-xs leading-relaxed text-ink-3">
            AI 负责整理报价依据，最终价格受企业 ERP、报价规则及销售权限控制。
          </p>
        </div>
      </Reveal>
    </div>
  );
}
