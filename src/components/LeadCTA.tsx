import { ArrowRight } from 'lucide-react';
import { btnPrimary, btnSecondary, Reveal } from './ui';

export function LeadCTA({ onOpen }: { onOpen: () => void }) {
  return (
    <Reveal>
      <div className="rounded-2xl border border-line bg-surface p-8 text-center lg:p-12">
        <h2 className="mx-auto max-w-[540px] text-[24px] font-semibold tracking-tight text-ink sm:text-[28px]">
          想知道它在你们公司能不能用？
        </h2>
        <p className="mx-auto mt-4 max-w-[600px] text-[15px] leading-relaxed text-ink-2">
          提供{' '}
          <span className="font-medium text-ink">20～50 条历史询价</span>、
          <span className="font-medium text-ink">产品目录</span> 与{' '}
          <span className="font-medium text-ink">部分历史报价</span>，即可测试：询价识别情况、
          产品匹配准确度、可辅助报价比例、哪些询价必须人工处理，以及可以减少哪些重复步骤。
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button className={btnPrimary + ' px-6 py-3 text-[15px]'} onClick={onOpen}>
            用我司历史询价测试 <ArrowRight size={16} />
          </button>
          <button className={btnSecondary} onClick={onOpen}>
            预约企业专属 Demo
          </button>
        </div>
      </div>
    </Reveal>
  );
}
