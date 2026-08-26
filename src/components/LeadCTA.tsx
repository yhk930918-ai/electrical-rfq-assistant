import { ArrowRight } from 'lucide-react';
import { btnPrimary, Reveal } from './ui';

export function LeadCTA({ onOpen }: { onOpen: () => void }) {
  return (
    <Reveal>
      <div className="rounded-2xl border border-line bg-surface p-8 text-center lg:p-12">
        <h2 className="mx-auto max-w-[540px] text-[24px] font-semibold tracking-tight text-ink sm:text-[28px]">
          想知道它在你们公司能不能用？
        </h2>
        <p className="mx-auto mt-4 max-w-[600px] text-[15px] leading-relaxed text-ink-2">
          提供 <span className="font-medium text-ink">20～50 条历史询价</span> 和{' '}
          <span className="font-medium text-ink">产品目录</span>，可以实际测试：询价识别情况、
          产品匹配情况、哪些步骤可以自动整理、哪些询价仍然需要人工判断。
        </p>
        <div className="mt-8 flex justify-center">
          <button type="button" className={btnPrimary + ' px-6 py-3 text-[15px]'} onClick={onOpen}>
            申请企业测试 <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </Reveal>
  );
}
