import { useEffect, useState } from 'react';
import { Check, TriangleAlert, X } from 'lucide-react';

export function PriceEditModal({
  open,
  suggested,
  min,
  max,
  onClose,
  onApply,
  onApprove,
}: {
  open: boolean;
  suggested: number;
  min: number;
  max: number;
  onClose: () => void;
  onApply: (price: number) => void;
  onApprove: () => void;
}) {
  const [val, setVal] = useState('18.80');

  useEffect(() => {
    if (open) setVal(suggested.toFixed(2));
  }, [open, suggested]);

  if (!open) return null;

  const num = parseFloat(val);
  const valid = !isNaN(num) && num > 0;
  const needsApproval = valid && num < min;
  const inRange = valid && num >= min && num <= max;
  const above = valid && num > max;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/25 backdrop-blur-[2px]" onClick={onClose} />
      <div className="animate-fade-up relative w-full max-w-md rounded-2xl border border-line bg-surface p-6 shadow-2xl sm:p-7">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-ink">修改价格</h3>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-ink-3 transition-colors hover:bg-line-2 hover:text-ink"
          >
            <X size={16} />
          </button>
        </div>
        <p className="mt-1 text-xs text-ink-3">HD47-63 2P C32 · 500只 · 含税含运费</p>

        <div className="mt-6 flex items-center gap-2 rounded-xl border border-line bg-paper/60 px-4 py-4 transition-colors focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/15">
          <span className="text-lg font-medium text-ink-3">¥</span>
          <input
            type="number"
            step="0.01"
            min="0"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="tnum w-full bg-transparent text-3xl font-semibold text-ink outline-none"
            autoFocus
          />
        </div>
        <div className="mt-3 text-xs text-ink-3">
          建议价 <span className="tnum font-medium text-ink">¥{suggested.toFixed(2)}</span> · 授权区间{' '}
          <span className="tnum font-medium text-ink">
            ¥{min.toFixed(2)} – ¥{max.toFixed(2)}
          </span>
        </div>

        {needsApproval && (
          <div className="animate-fade-up mt-5 rounded-xl border border-amber/25 bg-amber-soft/60 p-4">
            <div className="flex items-center gap-2">
              <TriangleAlert size={15} className="text-amber" />
              <span className="text-sm font-semibold text-ink">需要审批</span>
              <span className="text-[11px] uppercase tracking-wide text-ink-3">
                Approval required
              </span>
            </div>
            <div className="mt-3 space-y-1.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-ink-3">你输入</span>
                <span className="tnum font-semibold text-amber">¥{num.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-3">销售最低权限</span>
                <span className="tnum font-semibold text-ink">¥{min.toFixed(2)}</span>
              </div>
            </div>
            <p className="mt-3 text-[13px] text-ink-2">该价格需要销售经理审批。</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                className="inline-flex items-center gap-1.5 rounded-lg bg-amber px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-deep"
                onClick={onApprove}
              >
                提交审批
              </button>
              <button
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink-2 transition-colors hover:bg-amber-soft hover:text-ink"
                onClick={() => setVal(suggested.toFixed(2))}
              >
                恢复建议价 ¥{suggested.toFixed(2)}
              </button>
            </div>
          </div>
        )}

        {inRange && (
          <div className="animate-fade-up mt-5 rounded-xl border border-green/20 bg-green-soft/50 p-4">
            <div className="flex items-center gap-2 text-sm">
              <Check size={15} className="shrink-0 text-green" />
              <span className="font-medium text-ink">价格在销售授权区间内</span>
            </div>
            <button
              className="mt-3 w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-deep"
              onClick={() => onApply(num)}
            >
              采用 ¥{num.toFixed(2)}
            </button>
          </div>
        )}

        {above && (
          <div className="animate-fade-up mt-5 rounded-xl border border-line bg-paper p-4">
            <p className="text-sm text-ink-2">
              高于标准价 ¥{max.toFixed(2)}，将以标准价计。
            </p>
            <button
              className="mt-3 w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-deep"
              onClick={() => onApply(max)}
            >
              采用标准价 ¥{max.toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
