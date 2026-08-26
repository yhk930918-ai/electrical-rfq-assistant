import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { Check } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RFQMessage } from './components/RFQMessage';
import { AnalyzeProgress } from './components/AnalyzeProgress';
import { ExtractedRequirements } from './components/ExtractedRequirements';
import { MatchSection } from './components/MatchSection';
import { PricingContext } from './components/PricingContext';
import { QuoteDecision } from './components/QuoteDecision';
import { PriceEditModal } from './components/PriceEditModal';
import { QuotePreview } from './components/QuotePreview';
import { ValueComparison } from './components/ValueComparison';
import { LeadCTA } from './components/LeadCTA';
import { CTAFormModal } from './components/CTAFormModal';
import { ContextualLeadCTA } from './components/ContextualLeadCTA';
import { defaultRfq, pricingRule } from './data/mock';
import { electricalRfqWorkflow } from './config/workflows';
import { track } from './lib/analytics';
import type { LeadFormPlacement } from './services/lead';
import type { Stage } from './types';

const STAGES: Stage[] = [
  'rfq',
  'analyzing',
  'extracted',
  'matching',
  'conflict',
  'pricing',
  'decision',
  'quote',
  'summary',
];

const PROGRESS: Record<Stage, number> = {
  rfq: 0,
  analyzing: 10,
  extracted: 24,
  matching: 38,
  conflict: 52,
  pricing: 66,
  decision: 80,
  quote: 100,
  summary: 100,
};

export default function App() {
  const [stage, setStage] = useState<Stage>('rfq');
  const [message, setMessage] = useState(defaultRfq.message);
  const [unitPrice, setUnitPrice] = useState(pricingRule.suggestedPrice);
  const [toast, setToast] = useState<string | null>(null);
  const [priceModal, setPriceModal] = useState(false);
  const [leadModal, setLeadModal] = useState(false);
  const [leadFormPlacement, setLeadFormPlacement] = useState<LeadFormPlacement>('final_cta');

  const extractedRef = useRef<HTMLDivElement>(null);
  const matchRef = useRef<HTMLDivElement>(null);
  const conflictRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const decisionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    track('demo_started');
  }, []);

  const notify = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2800);
  };

  const scrollTo = (ref: RefObject<HTMLDivElement | null>) => {
    window.setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 90);
  };

  const handleProcess = () => {
    setStage('analyzing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalyzeDone = () => {
    setStage('extracted');
    track('rfq_analyzed');
    scrollTo(extractedRef);
  };

  const openLeadForm = (placement: LeadFormPlacement) => {
    setLeadFormPlacement(placement);
    track('lead_form_opened', { placement });
    setLeadModal(true);
  };

  const handleMatchStart = () => {
    setStage('matching');
    track('product_match_viewed');
    scrollTo(matchRef);
    window.setTimeout(() => {
      setStage('conflict');
      scrollTo(conflictRef);
    }, 1900);
  };

  const handleAlternative = () => {
    setStage('pricing');
    track('pricing_viewed');
    scrollTo(pricingRef);
    notify('已采用替代型号 HD47H-63 4P C63');
  };

  const handlePricingNext = () => {
    setStage('decision');
    scrollTo(decisionRef);
  };

  const handleAdopt = () => {
    setStage('quote');
    track('quotation_generated');
    scrollTo(quoteRef);
  };

  const handleSummary = () => {
    setStage('summary');
    scrollTo(summaryRef);
  };

  const idx = STAGES.indexOf(stage);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header progress={PROGRESS[stage]} onLeadOpen={() => openLeadForm('header')} />

      <main>
        <Hero />

        {/* 第一幕：客户询价 */}
        <div className="mx-auto max-w-[1200px] px-5">
          <RFQMessage
            mode={stage === 'rfq' ? 'ready' : stage === 'analyzing' ? 'processing' : 'done'}
            message={message}
            onMessageChange={setMessage}
            onProcess={handleProcess}
          />
          {stage === 'analyzing' && <AnalyzeProgress onDone={handleAnalyzeDone} />}
        </div>

        {/* 01 理解询价 */}
        {idx >= 2 && (
          <section
            ref={extractedRef}
            className="mx-auto max-w-[1200px] scroll-mt-20 px-5 pb-2 pt-16"
          >
            <ExtractedRequirements stage={stage} onNext={handleMatchStart} />
          </section>
        )}

        {/* 02 匹配公司产品 + 参数风险 + 替代型号 */}
        {idx >= 3 && (
          <section ref={matchRef} className="mx-auto max-w-[1200px] scroll-mt-20 px-5 pb-2 pt-16">
            <MatchSection
              stage={stage}
              conflictRef={conflictRef}
              onAlternative={handleAlternative}
              notify={notify}
            />
            {stage !== 'matching' && (
              <ContextualLeadCTA onOpen={() => openLeadForm('after_product_match')} />
            )}
          </section>
        )}

        {/* 03 整理报价依据 */}
        {idx >= 5 && (
          <section ref={pricingRef} className="mx-auto max-w-[1200px] scroll-mt-20 px-5 pb-2 pt-16">
            <PricingContext stage={stage} onNext={handlePricingNext} />
          </section>
        )}

        {/* 04 建议报价 */}
        {idx >= 6 && (
          <section ref={decisionRef} className="mx-auto max-w-[1200px] scroll-mt-20 px-5 pb-2 pt-16">
            <QuoteDecision
              stage={stage}
              onAdopt={handleAdopt}
              onEdit={() => setPriceModal(true)}
              onApprove={() => notify('已提交经理审批（Demo 演示）')}
            />
          </section>
        )}

        {/* 05 报价草稿 + 客户回复 */}
        {idx >= 7 && (
          <section ref={quoteRef} className="mx-auto max-w-[1200px] scroll-mt-20 px-5 pb-2 pt-16">
            <QuotePreview stage={stage} unitPrice={unitPrice} notify={notify} onNext={handleSummary} />
          </section>
        )}

        {/* 价值总结 + CTA */}
        {idx >= 8 && (
          <section ref={summaryRef} className="mx-auto max-w-[1200px] scroll-mt-20 px-5 pb-24 pt-16">
            <div className="space-y-24">
              <ValueComparison />
              <LeadCTA onOpen={() => openLeadForm('final_cta')} />
            </div>
          </section>
        )}

        <footer className="border-t border-line bg-surface/60">
          <div className="mx-auto max-w-[1200px] px-5 py-8">
            <p className="mb-2 text-center text-xs font-medium text-ink-2">
              CoreSelf Lab Demo · {electricalRfqWorkflow.name}
            </p>
            <p className="mx-auto max-w-[780px] text-center text-xs leading-relaxed text-ink-3">
              本页面用于展示 AI 询价与报价辅助流程。企业名称、客户、库存、价格及交易数据均为模拟数据，不构成真实商业报价。
            </p>
          </div>
        </footer>
      </main>

      {/* 修改价格弹窗 */}
      <PriceEditModal
        open={priceModal}
        suggested={pricingRule.suggestedPrice}
        min={pricingRule.minAuthorized}
        max={pricingRule.maxAuthorized}
        onClose={() => setPriceModal(false)}
        onApply={(p) => {
          setUnitPrice(p);
          setPriceModal(false);
          setStage('quote');
          track('quotation_generated');
          scrollTo(quoteRef);
          notify(`已采用 ¥${p.toFixed(2)}`);
        }}
        onApprove={() => {
          setPriceModal(false);
          notify('已提交经理审批（Demo 演示）');
        }}
      />

      {/* 企业测试申请弹窗 */}
      <CTAFormModal
        open={leadModal}
        onClose={() => setLeadModal(false)}
        leadFormPlacement={leadFormPlacement}
      />

      {/* Toast */}
      {toast && (
        <div className="animate-fade-up fixed bottom-6 left-1/2 z-[60] -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm text-paper shadow-lg">
            <Check size={15} className="shrink-0 text-green-soft" />
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
