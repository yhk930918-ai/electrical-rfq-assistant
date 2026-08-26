import { useEffect, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { Check, X } from 'lucide-react';
import { electricalRfqWorkflow } from '../config/workflows';
import { readLeadAttribution } from '../lib/leadAttribution';
import { track } from '../lib/analytics';
import { submitLead } from '../services/lead';
import type { LeadPayload, SubmitLeadError } from '../services/lead';
import { btnPrimary, btnSecondary } from './ui';

const volumeOptions = ['少于10条', '10～30条', '30～100条', '100条以上', '不清楚'];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormField = 'company' | 'name' | 'contact' | 'email' | 'product' | 'consent';
type FieldErrors = Partial<Record<FormField, string>>;
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

function valueLength(value: string) {
  return Array.from(value.trim()).length;
}

function validateForm({
  company,
  name,
  contact,
  email,
  product,
  consent,
}: {
  company: string;
  name: string;
  contact: string;
  email: string;
  product: string;
  consent: boolean;
}): FieldErrors {
  const errors: FieldErrors = {};
  const companyLength = valueLength(company);
  const nameLength = valueLength(name);
  const contactLength = valueLength(contact);
  const productLength = valueLength(product);

  if (companyLength < 2 || companyLength > 100) {
    errors.company = '企业名称请填写 2～100 个字符';
  }
  if (nameLength < 1 || nameLength > 50) {
    errors.name = '请填写您的称呼（1～50 个字符）';
  }
  if (contactLength < 3 || contactLength > 100) {
    errors.contact = '联系方式请填写 3～100 个字符';
  }
  if (email.trim() && !emailPattern.test(email.trim())) {
    errors.email = '请输入正确的邮箱格式';
  }
  if (productLength > 300) {
    errors.product = '主营产品最多 300 个字符';
  }
  if (!consent) {
    errors.consent = '提交前请先同意联系说明';
  }

  return errors;
}

function getSubmitErrorMessage(error: SubmitLeadError) {
  switch (error) {
    case 'RATE_LIMITED':
      return '提交次数较多，请稍后再试。';
    case 'INVALID_INPUT':
      return '请检查表单信息后重新提交。';
    case 'NETWORK_ERROR':
    case 'PROVIDER_ERROR':
    default:
      return '请检查网络后重新尝试。';
  }
}

export function CTAFormModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [product, setProduct] = useState('');
  const [volume, setVolume] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const attemptRef = useRef(0);
  const attribution = useRef(readLeadAttribution()).current;

  useEffect(() => {
    if (!open) return;

    attemptRef.current += 1;
    setStatus('idle');
    setError('');
    setFieldErrors({});
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      attemptRef.current += 1;
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  const inputCls = (field: FormField) =>
    `w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-accent focus:ring-2 focus:ring-accent/15 ${
      fieldErrors[field] ? 'border-red focus:border-red focus:ring-red/15' : 'border-line'
    }`;

  const buildPayload = (): LeadPayload => ({
    workflowId: electricalRfqWorkflow.id,
    workflowName: electricalRfqWorkflow.name,
    companyName: company.trim(),
    contactName: name.trim(),
    contact: contact.trim(),
    email: email.trim() || undefined,
    mainProducts: product.trim() || undefined,
    dailyRfqs: volume || undefined,
    consent,
    ...attribution,
    pageUrl: window.location.href,
    referrer: document.referrer || undefined,
    demoVersion: electricalRfqWorkflow.version,
    submittedAt: new Date().toISOString(),
    website: website.trim() || undefined,
  });

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const errors = validateForm({ company, name, contact, email, product, consent });
    setFieldErrors(errors);
    setError('');

    if (Object.keys(errors).length > 0) return;

    const payload = buildPayload();
    const attempt = ++attemptRef.current;

    // Honeypot is intentionally silent to normal users and never reaches a provider.
    if (payload.website) {
      setStatus('error');
      setError('请检查网络后重新尝试。');
      track('lead_submit_failed', { error: 'INVALID_INPUT' });
      return;
    }

    setStatus('submitting');
    track('lead_submit_started');
    const result = await submitLead(payload);

    if (attempt !== attemptRef.current) return;

    if (result.success) {
      setStatus('success');
      track('lead_submit_success');
    } else {
      setStatus('error');
      setError(getSubmitErrorMessage(result.error));
      track('lead_submit_failed', { error: result.error });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/25 backdrop-blur-[2px]" onClick={onClose} />
      <div
        className="animate-fade-up relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-surface p-6 shadow-2xl sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        aria-describedby="lead-modal-description"
      >
        {status === 'success' ? (
          <div className="py-8 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-soft text-green">
              <Check size={22} />
            </span>
            <h3 id="lead-modal-title" className="mt-4 text-lg font-semibold text-ink">
              ✓ 申请已提交
            </h3>
            <p id="lead-modal-description" className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-2">
              已收到您的企业测试申请，我们会通过您留下的联系方式与您沟通。
            </p>
            <button className={btnSecondary + ' mt-6'} onClick={onClose} type="button">
              关闭
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 id="lead-modal-title" className="text-lg font-semibold text-ink">
                  {status === 'error' ? '提交没有成功' : '用我司历史询价测试'}
                </h3>
                <p id="lead-modal-description" className="mt-1 text-sm text-ink-2">
                  留下信息，我们会尽快安排企业测试。
                </p>
              </div>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="rounded-md p-1 text-ink-3 transition-colors hover:bg-line-2 hover:text-ink"
                aria-label="关闭企业测试申请"
                type="button"
              >
                <X size={16} />
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={submit} noValidate>
              <Field label="企业名称" required error={fieldErrors.company} htmlFor="lead-company">
                <input
                  id="lead-company"
                  name="companyName"
                  className={inputCls('company')}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="例如：浙江乐清某电气有限公司"
                  maxLength={100}
                  autoComplete="organization"
                  aria-invalid={Boolean(fieldErrors.company)}
                  aria-describedby={fieldErrors.company ? 'lead-company-error' : undefined}
                  required
                />
              </Field>
              <Field label="您的称呼" required error={fieldErrors.name} htmlFor="lead-name">
                <input
                  id="lead-name"
                  name="contactName"
                  className={inputCls('name')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="王经理"
                  maxLength={50}
                  autoComplete="name"
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? 'lead-name-error' : undefined}
                  required
                />
              </Field>
              <Field label="联系方式" required error={fieldErrors.contact} htmlFor="lead-contact">
                <input
                  id="lead-contact"
                  name="contact"
                  type="text"
                  className={inputCls('contact')}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="手机 / 微信 / 邮箱"
                  maxLength={100}
                  autoComplete="tel"
                  aria-invalid={Boolean(fieldErrors.contact)}
                  aria-describedby={fieldErrors.contact ? 'lead-contact-error' : undefined}
                  required
                />
              </Field>
              <Field label="联系邮箱" error={fieldErrors.email} htmlFor="lead-email">
                <input
                  id="lead-email"
                  name="email"
                  type="email"
                  className={inputCls('email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="选填，用于接收后续信息"
                  maxLength={254}
                  autoComplete="email"
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? 'lead-email-error' : undefined}
                />
              </Field>
              <Field label="主营产品" error={fieldErrors.product} htmlFor="lead-product">
                <input
                  id="lead-product"
                  name="mainProducts"
                  className={inputCls('product')}
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="例如：小型断路器 / 塑壳断路器"
                  maxLength={300}
                  aria-invalid={Boolean(fieldErrors.product)}
                  aria-describedby={fieldErrors.product ? 'lead-product-error' : undefined}
                />
              </Field>
              <Field label="每天大概多少询价？">
                <div className="flex flex-wrap gap-2">
                  {volumeOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setVolume(option)}
                      aria-pressed={volume === option}
                      className={`rounded-lg border px-3.5 py-2 text-sm transition-colors ${
                        volume === option
                          ? 'border-accent bg-accent-soft font-medium text-accent'
                          : 'border-line bg-surface text-ink-2 hover:border-ink-3/40'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </Field>

              <label className="flex items-start gap-2.5 pt-1 text-sm text-ink-2" htmlFor="lead-consent">
                <input
                  id="lead-consent"
                  name="consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
                  aria-invalid={Boolean(fieldErrors.consent)}
                  aria-describedby={fieldErrors.consent ? 'lead-consent-error' : 'lead-consent-hint'}
                  required
                />
                <span>
                  我同意使用上述联系方式与我沟通企业测试事宜
                  <span className="ml-0.5 text-red">*</span>
                  <span id="lead-consent-hint" className="mt-1 block text-xs text-ink-3">
                    信息仅用于企业测试联系，不会公开展示。
                  </span>
                  {fieldErrors.consent && (
                    <span id="lead-consent-error" className="mt-1 block text-xs text-red" role="alert">
                      {fieldErrors.consent}
                    </span>
                  )}
                </span>
              </label>

              {/* Off-screen honeypot: visible to bots that fill every field, not to normal users. */}
              <label className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" htmlFor="lead-website">
                网站
                <input
                  id="lead-website"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>

              {error && (
                <p className="text-sm text-red" role="alert">
                  {error}
                </p>
              )}

              <div className="mt-6 flex items-center justify-between gap-3">
                <button className={btnSecondary} onClick={onClose} type="button" disabled={status === 'submitting'}>
                  取消
                </button>
                <button className={btnPrimary + ' px-6'} type="submit" disabled={status === 'submitting'}>
                  {status === 'submitting' ? '正在提交…' : status === 'error' ? '重新提交' : '申请企业测试'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  htmlFor,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  const errorId = htmlFor ? `${htmlFor}-error` : undefined;

  return (
    <label className="block" htmlFor={htmlFor}>
      <span className="mb-1.5 block text-[13px] font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-red">*</span>}
      </span>
      {children}
      {error && (
        <span id={errorId} className="mt-1 block text-xs text-red" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
