import { ArrowDown } from 'lucide-react';
import { aiSteps, traditionalSteps } from '../data/mock';
import { Reveal } from './ui';

export function ValueComparison() {
  return (
    <div>
      <Reveal>
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[26px] font-semibold tracking-tight text-ink sm:text-[30px]">
            从「找资料」变成「做判断」
          </h2>
          <p className="mt-3 text-[15px] text-ink-2">同一条询价，处理过程的变化</p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {/* 传统处理 */}
        <Reveal delay={60}>
          <div className="h-full rounded-2xl border border-line bg-surface/60 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-ink">传统处理</h3>
              <span className="rounded-md bg-line-2 px-2.5 py-1 text-xs font-medium text-ink-2">
                演示假设 <span className="tnum">≈ 25 min</span>
              </span>
            </div>
            <ol className="mt-5">
              {traditionalSteps.map((s, i) => (
                <li key={s} className="flex items-center gap-3 py-1.5">
                  <span className="tnum w-5 shrink-0 text-right text-xs text-ink-3">{i + 1}.</span>
                  <span className="text-sm text-ink-2">{s}</span>
                  {i < traditionalSteps.length - 1 && (
                    <ArrowDown size={13} className="ml-1 shrink-0 text-ink-3/70" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* AI 辅助 */}
        <Reveal delay={120}>
          <div className="h-full rounded-2xl border border-accent/20 bg-accent-soft/40 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-ink">AI 辅助</h3>
              <span className="rounded-md bg-accent px-2.5 py-1 text-xs font-medium text-white">
                演示目标 <span className="tnum">≈ 5–10 min</span>
              </span>
            </div>
            <ol className="mt-5">
              {aiSteps.map((s, i) => (
                <li key={s} className="flex items-center gap-3 py-2">
                  <span className="tnum flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-white">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-ink">{s}</span>
                </li>
              ))}
            </ol>
            <div className="mt-4 rounded-lg border border-accent/15 bg-surface/70 px-4 py-3 text-[13px] leading-relaxed text-ink-2">
              AI 负责整理重复信息，销售主要负责型号、价格及商务判断。
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={80}>
        <p className="mt-6 text-center text-xs leading-relaxed text-ink-3">
          时间仅用于演示业务逻辑，实际效率改善需要通过企业真实数据测试。
        </p>
      </Reveal>
    </div>
  );
}
