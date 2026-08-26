import { Badge, Logo } from './ui';

export function Header({ progress, onLeadOpen }: { progress: number; onLeadOpen: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <Logo size={28} />
          <span className="truncate text-[13px] font-semibold tracking-tight text-ink">
            华东电气 · AI 询价助手
          </span>
        </div>
        <div className="ml-3 flex shrink-0 items-center gap-2.5">
          <span className="hidden text-xs text-ink-3 sm:inline">公开 Demo</span>
          <button
            type="button"
            onClick={onLeadOpen}
            className="inline-flex items-center gap-1 whitespace-nowrap rounded-md border border-line bg-surface px-2.5 py-1.5 text-[11px] font-medium text-ink-2 transition-colors hover:border-ink-3/40 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 sm:text-xs"
          >
            用我司询价测试 <span aria-hidden>→</span>
          </button>
          <span className="hidden sm:inline-flex">
            <Badge tone="amber">示例数据</Badge>
          </span>
        </div>
      </div>
      {/* 顶部流程进度线 */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-line-2">
        <div
          className="h-full bg-accent transition-[width] duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  );
}
