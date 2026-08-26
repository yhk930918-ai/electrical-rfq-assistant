import type { ReactNode } from 'react';
import { useInView } from '../lib/useInView';

/* 品牌 Logo：断路器开关符号 */
export function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="1.5" y="1.5" width="29" height="29" rx="7" fill="#1E5AA8" />
      <path
        d="M9 16h5l1.8-4.5 2.4 9 1.8-4.5H23"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* 滚动进入视口时出现 */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export type BadgeTone = 'neutral' | 'green' | 'amber' | 'red' | 'accent';

const badgeStyles: Record<BadgeTone, string> = {
  neutral: 'bg-line-2 text-ink-2 border-line',
  green: 'bg-green-soft text-green border-green/20',
  amber: 'bg-amber-soft text-amber border-amber/20',
  red: 'bg-red-soft text-red border-red/20',
  accent: 'bg-accent-soft text-accent border-accent/20',
};

export function Badge({ tone = 'neutral', children }: { tone?: BadgeTone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium ${badgeStyles[tone]}`}
    >
      {children}
    </span>
  );
}

/* 章节标题：编号 + 标题 + 可选 meta */
export function SectionHeader({
  num,
  title,
  meta,
}: {
  num: string;
  title: string;
  meta?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[13px] font-medium tracking-wide text-ink-3">{num}</span>
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-[26px]">{title}</h2>
      </div>
      {meta ? <div className="text-sm text-ink-2">{meta}</div> : null}
    </div>
  );
}

/* 按钮样式 */
export const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:opacity-50';
export const btnSecondary =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink-3/40 hover:bg-line-2/60 focus:outline-none';
export const btnGhost =
  'inline-flex items-center justify-center gap-1.5 text-sm font-medium text-ink-2 transition-colors hover:text-ink';
