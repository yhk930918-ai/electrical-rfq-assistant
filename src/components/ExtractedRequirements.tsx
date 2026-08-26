import { ArrowRight, CircleCheck, TriangleAlert } from 'lucide-react';
import type { Stage } from '../types';
import { conditions, parsedProducts } from '../data/mock';
import type { ParsedProduct } from '../data/mock';
import { Badge, btnPrimary, Reveal, SectionHeader } from './ui';

export function ExtractedRequirements({
  stage,
  onNext,
}: {
  stage: Stage;
  onNext: () => void;
}) {
  return (
    <div>
      <Reveal>
        <SectionHeader
          num="01"
          title="理解询价"
          meta={<span>已识别 2 个产品 · 采购条件已提取</span>}
        />
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-2">
        {parsedProducts.map((p, i) => (
          <Reveal key={i} delay={i * 90}>
            <ProductCard index={i} product={p} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={140}>
        <ConditionsCard />
      </Reveal>

      {stage === 'extracted' && (
        <Reveal delay={120}>
          <div className="mt-9 flex justify-center">
            <button className={btnPrimary + ' px-6 py-3 text-[15px]'} onClick={onNext}>
              开始匹配公司产品 <ArrowRight size={16} />
            </button>
          </div>
        </Reveal>
      )}
    </div>
  );
}

function ProductCard({ index, product }: { index: number; product: ParsedProduct }) {
  const complete = product.status === 'complete';
  return (
    <div className="h-full rounded-2xl border border-line bg-surface p-5 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-medium text-ink-3">产品{index + 1}</div>
        <Badge tone={complete ? 'green' : 'amber'}>
          {complete ? (
            <>
              <CircleCheck size={12} /> 信息完整
            </>
          ) : (
            <>
              <TriangleAlert size={12} /> 需要进一步核对
            </>
          )}
        </Badge>
      </div>

      <div className="mt-3 rounded-lg border-l-2 border-accent bg-paper px-4 py-2.5 font-mono text-[13px] text-ink">
        {product.raw}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-8">
        {product.fields.map((f, j) => (
          <Reveal key={f.label} delay={60 + j * 45}>
            <div className="flex items-baseline justify-between border-b border-line-2 py-2">
              <span className="text-xs text-ink-3">{f.label}</span>
              <span className="tnum text-sm font-medium text-ink">{f.value}</span>
            </div>
          </Reveal>
        ))}
      </div>

      {product.note && (
        <div className="mt-4 rounded-lg bg-amber-soft/70 px-3.5 py-2.5 text-[13px] leading-relaxed text-amber-deep">
          附件中的额外技术要求：
          <span className="font-medium">{product.note}</span>
        </div>
      )}
    </div>
  );
}

function ConditionsCard() {
  return (
    <div className="mt-5 rounded-2xl border border-line bg-surface p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-ink">采购条件</h3>
        <span className="text-xs text-ink-3">从询价文字与附件中抽取</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {conditions.map((c, i) => (
          <div
            key={c.label}
            className={`rounded-lg border border-line-2 bg-paper/50 px-4 py-3 ${
              i === conditions.length - 1 ? 'lg:col-span-2' : ''
            }`}
          >
            <div className="text-xs text-ink-3">{c.label}</div>
            <div className="mt-1 text-sm font-medium leading-relaxed text-ink">{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
