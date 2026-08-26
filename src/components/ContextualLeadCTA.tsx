import { ArrowRight } from 'lucide-react';
import { btnGhost, Reveal } from './ui';

export function ContextualLeadCTA({ onOpen }: { onOpen: () => void }) {
  return (
    <Reveal delay={180}>
      <div className="mt-8 flex flex-col items-start justify-between gap-3 border-y border-line-2 py-4 sm:flex-row sm:items-center">
        <p className="text-sm font-medium text-ink">你们也经常遇到这种型号询价？</p>
        <button
          type="button"
          onClick={onOpen}
          className={btnGhost + ' shrink-0 text-accent hover:text-accent-deep'}
        >
          用我司历史询价测试 <ArrowRight size={15} />
        </button>
      </div>
    </Reveal>
  );
}
