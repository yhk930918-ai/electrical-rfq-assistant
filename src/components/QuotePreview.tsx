import { useState } from 'react';
import { ArrowRight, Check, Copy, Download } from 'lucide-react';
import type { Stage } from '../types';
import { quoteItems, replyText } from '../data/mock';
import { Badge, btnPrimary, btnSecondary, Logo, Reveal, SectionHeader } from './ui';

export function QuotePreview({
  stage,
  unitPrice,
  replacementUnitPrice,
  notify,
  onNext,
}: {
  stage: Stage;
  unitPrice: number;
  replacementUnitPrice: number;
  notify: (m: string) => void;
  onNext: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

  const p1 = { ...quoteItems.primary, unitPrice };
  const item2 = { ...quoteItems.replacement, unitPrice: replacementUnitPrice };
  const total = p1.qty * unitPrice + item2.qty * item2.unitPrice;

  const copy = async () => {
    let ok = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(replyText);
        ok = true;
      }
    } catch {
      ok = false;
    }
    if (!ok) {
      // 降级：临时 textarea + execCommand
      try {
        const ta = document.createElement('textarea');
        ta.value = replyText;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand('copy');
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } else {
      notify('复制失败，请手动复制');
    }
  };

  const doExport = () => {
    setExporting(true);
    window.setTimeout(() => {
      setExporting(false);
      notify('报价单已导出（Demo 模拟，未生成真实 PDF）');
    }, 900);
  };

  const fmt = (n: number) => `¥${n.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div>
      <Reveal>
        <SectionHeader
          num="05"
          title="报价草稿已生成"
          meta={<Badge tone="amber">示例报价 · 非真实商业报价</Badge>}
        />
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-[1.12fr_1fr]">
        <Reveal delay={60}>
          <QuoteDocument p1={p1} item2={item2} total={total} fmt={fmt} />
        </Reveal>
        <Reveal delay={140}>
          <CustomerReply copied={copied} exporting={exporting} onCopy={copy} onExport={doExport} />
        </Reveal>
      </div>

      {stage === 'quote' && (
        <Reveal delay={80}>
          <div className="mt-9 flex justify-center">
            <button className={btnPrimary + ' px-6 py-3 text-[15px]'} onClick={onNext}>
              查看价值总结 <ArrowRight size={16} />
            </button>
          </div>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- 报价单文档预览 ---------- */
function QuoteDocument({
  p1,
  item2,
  total,
  fmt,
}: {
  p1: { name: string; sku: string; qty: number; family: string; unitPrice: number };
  item2: { name: string; sku: string; qty: number; family: string; unitPrice: number };
  total: number;
  fmt: (n: number) => string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5 sm:p-8">
      {/* 抬头 */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
        <div className="flex items-center gap-3">
          <Logo size={36} />
          <div>
            <div className="text-sm font-semibold text-ink">华东电气有限公司</div>
            <div className="text-[11px] uppercase tracking-wide text-ink-3">
              HUADONG ELECTRIC CO., LTD.
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-base font-semibold text-ink">报价单</div>
          <div className="text-[11px] uppercase tracking-wide text-ink-3">Quote draft</div>
        </div>
      </div>

      {/* 单据信息 */}
      <div className="mt-5 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
        <Meta label="客户" value="宁波华成电气有限公司" />
        <Meta label="日期" value="2026/08/26" />
        <Meta label="报价编号" value="HD-20260826-018" />
      </div>

      {/* 明细 */}
      <table className="mt-6 w-full text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs text-ink-3">
            <th className="pb-2.5 pr-3 font-medium">产品</th>
            <th className="pb-2.5 pr-3 font-medium">型号</th>
            <th className="pb-2.5 pr-3 text-right font-medium">数量</th>
            <th className="pb-2.5 pr-3 text-right font-medium">单价</th>
            <th className="pb-2.5 text-right font-medium">金额</th>
          </tr>
        </thead>
        <tbody>
          <Row item={p1} fmt={fmt} />
          <Row item={item2} fmt={fmt} />
        </tbody>
      </table>

      {/* 总计 */}
      <div className="mt-5 flex items-center justify-between rounded-lg bg-paper px-4 py-3.5">
        <span className="text-sm font-medium text-ink">总计</span>
        <span className="tnum text-2xl font-semibold text-ink">{fmt(total)}</span>
      </div>

      {/* 条款 */}
      <div className="mt-5">
        <div className="text-xs font-medium text-ink-3">条款与条件</div>
        <div className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
          {['含13%增值税', '含宁波地区配送', '预计9月5日前到货', '报价有效期7天'].map((t) => (
            <div key={t} className="flex items-center gap-2 text-[13px] text-ink-2">
              <Check size={13} className="shrink-0 text-green" />
              {t}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center border-t border-line-2 pt-5">
        <Badge tone="amber">示例报价 · 非真实商业报价</Badge>
      </div>
    </div>
  );
}

function Row({
  item,
  fmt,
}: {
  item: { name: string; sku: string; qty: number; family: string; unitPrice: number };
  fmt: (n: number) => string;
}) {
  return (
    <tr className="border-b border-line-2">
      <td className="py-3.5 pr-3">
        <div className="font-medium text-ink">{item.name}</div>
        <div className="text-[11px] text-ink-3">{item.family}</div>
      </td>
      <td className="py-3.5 pr-3 font-mono text-[13px] text-ink">{item.sku}</td>
      <td className="tnum py-3.5 pr-3 text-right">{item.qty}</td>
      <td className="tnum py-3.5 pr-3 text-right">{fmt(item.unitPrice)}</td>
      <td className="tnum py-3.5 text-right font-medium text-ink">
        {fmt(item.qty * item.unitPrice)}
      </td>
    </tr>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-ink-3">{label}</div>
      <div className="tnum mt-1 text-[13px] font-medium text-ink">{value}</div>
    </div>
  );
}

/* ---------- 客户回复 ---------- */
function CustomerReply({
  copied,
  exporting,
  onCopy,
  onExport,
}: {
  copied: boolean;
  exporting: boolean;
  onCopy: () => void;
  onExport: () => void;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-5 sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-ink">客户回复</div>
          <div className="text-[11px] uppercase tracking-wide text-ink-3">Customer reply</div>
        </div>
        <Badge tone="neutral">AI 起草</Badge>
      </div>

      <div className="mt-5 flex-1 whitespace-pre-line rounded-xl border border-line-2 bg-paper/60 p-5 text-[14px] leading-7 text-ink">
        {replyText}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button className={btnSecondary} onClick={onCopy}>
          {copied ? <Check size={15} className="text-green" /> : <Copy size={15} />}
          {copied ? '已复制' : '复制回复'}
        </button>
        <button className={btnPrimary} onClick={onExport}>
          <Download size={15} />
          {exporting ? '导出中…' : '导出报价单'}
        </button>
      </div>
    </div>
  );
}
