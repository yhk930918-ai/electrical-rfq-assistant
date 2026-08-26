import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

const steps = [
  { title: '正在识别产品型号', sub: 'DZ47-63 · 4P C63' },
  { title: '正在提取技术参数', sub: '极数、曲线、电流、分断、认证' },
  { title: '正在匹配公司产品', sub: '对照 HD47 系列产品目录' },
  { title: '正在检查技术条件', sub: '核对 10kA 分断与 CCC' },
];

export function AnalyzeProgress({ onDone }: { onDone: () => void }) {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    setActive(-1);
    const timers: number[] = [];
    steps.forEach((_, i) => timers.push(window.setTimeout(() => setActive(i), i * 480)));
    timers.push(window.setTimeout(() => setActive(steps.length), steps.length * 480));
    timers.push(window.setTimeout(onDone, steps.length * 480 + 380));
    return () => timers.forEach((t) => clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="animate-fade-up mt-5 rounded-2xl border border-line bg-surface p-5 sm:p-7">
      <div className="flex items-center gap-2.5 text-sm font-semibold text-ink">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        AI 正在处理询价
      </div>

      <div className="mt-5 space-y-0.5">
        {steps.map((s, i) => {
          const done = i < active;
          const current = i === active;
          return (
            <div
              key={s.title}
              className="flex items-center gap-3.5 rounded-lg px-3 py-2.5 transition-colors"
            >
              <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                {done ? (
                  <span className="animate-check flex h-5 w-5 items-center justify-center rounded-full bg-green-soft text-green">
                    <Check size={12} strokeWidth={2.5} />
                  </span>
                ) : current ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-line" />
                )}
              </div>
              <div
                className={`flex-1 text-sm transition-colors ${
                  done || current ? 'text-ink' : 'text-ink-3'
                }`}
              >
                {s.title}
              </div>
              {current && (
                <div className="text-xs text-ink-3">
                  {s.sub}
                  <span className="ml-1 inline-block animate-pulse">…</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-line-2">
        <div
          className="animate-bar h-full rounded-full bg-accent"
          style={{ animationDuration: `${steps.length * 480}ms` }}
        />
      </div>
    </div>
  );
}
