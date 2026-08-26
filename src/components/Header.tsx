import { Badge, Logo } from './ui';

export function Header({ progress }: { progress: number }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-5">
        <div className="flex items-center gap-2.5">
          <Logo size={28} />
          <span className="text-[13px] font-semibold tracking-tight text-ink">
            华东电气 · AI 询价助手
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="hidden text-xs text-ink-3 sm:inline">公开 Demo</span>
          <Badge tone="amber">示例数据</Badge>
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
