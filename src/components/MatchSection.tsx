import type { RefObject } from 'react';
import { ArrowRight, Check, TriangleAlert } from 'lucide-react';
import type { Stage } from '../types';
import { Badge, btnPrimary, btnSecondary, Reveal, SectionHeader } from './ui';

type DivRef = RefObject<HTMLDivElement>;

const customerSpec = ['2P', 'C32', '6kA', 'CCC'];
const compareRows = [
  { label: '极数', customer: '2P', company: '2P' },
  { label: '额定电流', customer: '32A', company: '32A' },
  { label: '曲线', customer: 'C', company: 'C' },
  { label: '分断能力', customer: '6kA', company: '6kA' },
  { label: '认证', customer: 'CCC', company: 'CCC' },
];

export function MatchSection({
  stage,
  conflictRef,
  onAlternative,
  notify,
}: {
  stage: Stage;
  conflictRef: DivRef;
  onAlternative: () => void;
  notify: (m: string) => void;
}) {
  const animate = stage === 'matching';

  return (
    <div>
      <Reveal>
        <SectionHeader
          num="02"
          title="匹配公司产品"
          meta={
            stage === 'conflict' || stage === 'pricing' ? (
              <span className="font-medium text-amber">1 项需人工确认</span>
            ) : (
              <span>客户型号 → 公司对应产品</span>
            )
          }
        />
      </Reveal>

      <Reveal delay={60}>
        <MatchCard animate={animate} />
      </Reveal>

      {!animate && (
        <div ref={conflictRef} className="scroll-mt-20">
          <Reveal delay={80}>
            <ConflictCard />
          </Reveal>
          <Reveal delay={150}>
            <AlternativeCard
              selected={stage !== 'conflict'}
              onSelect={onAlternative}
              onTech={() => notify('已转技术确认（Demo 演示）')}
            />
          </Reveal>
          {stage !== 'conflict' && (
            <Reveal delay={120}>
              <div className="mt-6 flex justify-center">
                <div className="inline-flex flex-col items-center gap-1 rounded-xl border border-line bg-surface px-6 py-3.5">
                  <div className="flex items-center gap-2 text-sm font-medium text-green">
                    <Check size={15} strokeWidth={2.5} /> 已确认 2 个报价产品
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 font-mono text-xs text-ink-2">
                    <span>HD47-63 2P C32</span>
                    <span>HD47H-63 4P C63</span>
                  </div>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- 产品匹配（Wow Moment） ---------- */
function MatchCard({ animate }: { animate: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="grid lg:grid-cols-[1fr_150px_1fr]">
        {/* 客户要求 */}
        <div className="p-5">
          <div className="text-xs font-medium uppercase tracking-wider text-ink-3">客户要求</div>
          <div className="mt-2 font-mono text-base font-medium text-ink sm:text-lg">DZ47-63</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {customerSpec.map((t) => (
              <span
                key={t}
                className="tnum rounded-md border border-line bg-paper px-2.5 py-0.5 text-[13px] text-ink-2"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* 连接动画 */}
        <div className="flex items-center justify-center gap-2 border-t border-line-2 px-3 py-4 lg:border-l lg:border-t-0">
          <div className="relative h-px w-10 shrink-0 bg-line sm:w-12">
            {animate && (
              <>
                <span className="dot-flow" style={{ animationDelay: '0s' }} />
                <span className="dot-flow" style={{ animationDelay: '0.65s' }} />
                <span className="dot-flow" style={{ animationDelay: '1.3s' }} />
              </>
            )}
          </div>
          <span className="whitespace-nowrap text-xs font-medium tracking-wide text-ink-3">
            {animate ? '正在匹配' : '匹配完成'}
          </span>
        </div>

        {/* 公司推荐 */}
        <div className="border-t border-line-2 p-5 lg:border-l lg:border-t-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs font-medium uppercase tracking-wider text-ink-3">公司推荐</div>
            <Badge tone="green">推荐匹配</Badge>
          </div>
          <div className="mt-2 font-mono text-xl font-semibold tracking-tight text-accent sm:text-2xl">
            HD47-63 2P C32
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-md bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
              小型断路器
            </span>
            <span className="rounded-md bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
              HD47-63 系列
            </span>
          </div>
        </div>
      </div>

      {/* 参数对比 */}
      <div className="border-t border-line-2 px-5 py-0.5 sm:px-6">
        {compareRows.map((r, i) => (
          <Reveal key={r.label} delay={60 + i * 50}>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-line-2 py-1 last:border-0 sm:gap-5">
              <div className="tnum text-right text-sm text-ink">{r.customer}</div>
              <div className="flex w-24 flex-col items-center gap-0.5 sm:w-28">
                <div className="text-[11px] text-ink-3">{r.label}</div>
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-soft text-green">
                  <Check size={10} strokeWidth={2.5} />
                </span>
              </div>
              <div className="tnum text-sm font-medium text-ink">{r.company}</div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* 匹配结论 */}
      <div className="flex flex-wrap items-center gap-x-7 gap-y-2 border-t border-line bg-paper/60 px-5 py-2.5 sm:px-6">
        <div className="text-sm font-medium text-ink">
          <span className="tnum font-semibold text-accent">5 / 5</span> 技术参数符合
        </div>
        <div className="text-sm text-ink-2">
          匹配可信度 <span className="tnum font-semibold text-ink">98%</span>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2 text-xs text-ink-3">
          <span>匹配依据：</span>
          {['公司产品目录', '竞品型号映射', '技术参数'].map((t) => (
            <span
              key={t}
              className="rounded-md border border-line bg-surface px-2 py-0.5 font-medium text-ink-2"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- 参数风险（琥珀色，非红色 Error） ---------- */
function ConflictCard() {
  return (
    <div className="mt-4 rounded-2xl border border-amber/25 bg-amber-soft/50 p-5">
      <div className="flex items-start gap-4">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber/10 text-amber">
          <TriangleAlert size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="text-base font-semibold text-ink">参数冲突</h3>
            <span className="text-[11px] uppercase tracking-wide text-ink-3">
              Technical mismatch
            </span>
            <Badge tone="amber">需要确认</Badge>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-2">
            AI 在客户技术附件中识别到额外要求：分断能力 ≥10kA，普通型号不满足。
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <SpecCell label="参数" value="分断能力" sub="Breaking capacity" />
            <SpecCell label="客户要求" value="≥10 kA" strong />
            <SpecCell label="当前型号" value="6 kA" sub="HD47-63 4P C63" />
          </div>

          <p className="mt-4 rounded-lg border border-amber/15 bg-surface/70 px-4 py-3 text-[13px] leading-relaxed text-ink-2">
            当前型号不满足技术文件中的分断能力要求，系统已停止直接推荐，并自动查找替代方案。
          </p>
        </div>
      </div>
    </div>
  );
}

function SpecCell({
  label,
  value,
  sub,
  strong,
}: {
  label: string;
  value: string;
  sub?: string;
  strong?: boolean;
}) {
  return (
    <div className="rounded-lg border border-amber/20 bg-surface/60 px-4 py-2.5">
      <div className="text-xs text-ink-3">{label}</div>
      <div
        className={`tnum mt-0.5 ${
          strong ? 'text-xl font-semibold text-amber' : 'text-lg font-semibold text-ink'
        }`}
      >
        {value}
      </div>
      {sub && <div className="mt-0.5 text-[11px] text-ink-3">{sub}</div>}
    </div>
  );
}

/* ---------- 替代型号 ---------- */
function AlternativeCard({
  selected,
  onSelect,
  onTech,
}: {
  selected: boolean;
  onSelect: () => void;
  onTech: () => void;
}) {
  return (
    <div className="mt-3.5 rounded-2xl border border-line bg-surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-sm font-semibold text-green">找到替代型号</span>
            <span className="text-[11px] uppercase tracking-wide text-ink-3">
              Alternative found
            </span>
            <Badge tone="green">已核对参数</Badge>
          </div>
          <div className="mt-2 font-mono text-xl font-semibold text-ink">HD47H-63 4P C63</div>
          <p className="mt-0.5 text-sm text-ink-2">高分断小型断路器 · 10kA · CCC</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { k: '4P', ok: true },
            { k: '63A', ok: true },
            { k: 'C曲线', ok: true },
            { k: '10kA', ok: true },
            { k: 'CCC', ok: true },
          ].map((it) => (
            <span
              key={it.k}
              className="tnum inline-flex items-center gap-1.5 rounded-md bg-green-soft px-2.5 py-1 text-[13px] font-medium text-green"
            >
              <Check size={12} strokeWidth={2.5} /> {it.k}
            </span>
          ))}
        </div>
      </div>

      {selected ? (
        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-line-2 pt-4">
          <span className="inline-flex items-center gap-2 rounded-lg bg-green-soft px-4 py-2 text-sm font-medium text-green">
            <Check size={15} strokeWidth={2.5} /> 已采用 HD47H-63 4P C63
          </span>
          <span className="text-xs text-ink-3">该型号已加入本次报价</span>
        </div>
      ) : (
        <div className="mt-5 flex flex-wrap gap-3 border-t border-line-2 pt-4">
          <button className={btnPrimary + ' px-6'} onClick={onSelect}>
            采用替代型号 <ArrowRight size={15} />
          </button>
          <button className={btnSecondary} onClick={onTech}>
            转技术确认
          </button>
        </div>
      )}
    </div>
  );
}
