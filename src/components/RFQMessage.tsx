import { useState } from 'react';
import { ArrowRight, Check, FileText, PenLine } from 'lucide-react';
import { Badge, btnGhost, btnPrimary, btnSecondary } from './ui';

export type RfqMode = 'ready' | 'processing' | 'done';

export function RFQMessage({
  mode,
  message,
  onMessageChange,
  onProcess,
}: {
  mode: RfqMode;
  message: string;
  onMessageChange: (m: string) => void;
  onProcess: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(message);

  const startEdit = () => {
    setDraft(message);
    setEditing(true);
  };
  const saveEdit = () => {
    onMessageChange(draft.trim() || message);
    setEditing(false);
    onProcess();
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_1px_2px_rgba(28,27,25,0.04)]">
      {/* 消息头部 */}
      <div className="flex items-center gap-3 border-b border-line-2 px-5 py-4 sm:px-7">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
          华
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-ink">{message ? '宁波华成电气' : '客户'}</div>
          <div className="text-xs text-ink-3">客户询价 · 09:31</div>
        </div>
        <Badge tone="amber">示例数据</Badge>
      </div>

      {/* 消息正文 */}
      <div className="px-5 py-5 sm:px-7">
        {editing ? (
          <div>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={5}
              className="w-full resize-none rounded-lg border border-line bg-paper/60 px-4 py-3 text-sm leading-relaxed text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/15"
            />
            <div className="mt-3 flex gap-2">
              <button className={btnPrimary} onClick={saveEdit}>
                <Check size={15} /> 保存并重新分析
              </button>
              <button className={btnSecondary} onClick={() => setEditing(false)}>
                取消
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="whitespace-pre-line text-[15px] leading-7 text-ink">{message}</p>
            <div className="mt-4 inline-flex items-center gap-3 rounded-lg border border-line bg-paper px-3.5 py-2.5">
              <FileText size={17} className="shrink-0 text-accent" />
              <div className="text-xs leading-tight">
                <div className="font-medium text-ink">技术要求.pdf</div>
                <div className="mt-0.5 text-ink-3">2 pages</div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 操作区 */}
      <div className="flex flex-wrap items-center gap-3 border-t border-line-2 bg-paper/40 px-5 py-4 sm:px-7">
        {mode === 'ready' && !editing && (
          <>
            <button className={btnPrimary + ' px-6'} onClick={onProcess}>
              让 AI 处理这条询价 <ArrowRight size={15} />
            </button>
            <button className={btnGhost} onClick={startEdit}>
              <PenLine size={14} /> 修改询价
            </button>
          </>
        )}
        {mode === 'processing' && (
          <div className="flex items-center gap-2.5 text-sm text-ink-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            AI 正在处理这条询价…
          </div>
        )}
        {mode === 'done' && !editing && (
          <>
            <div className="flex items-center gap-1.5 text-sm font-medium text-green">
              <Check size={15} /> 已由 AI 解析
            </div>
            <button className={btnGhost} onClick={startEdit}>
              <PenLine size={14} /> 修改询价
            </button>
          </>
        )}
      </div>
    </div>
  );
}
