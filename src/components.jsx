import { Camera, Copy, Download, Medal, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useI18n } from './i18n.jsx';

export function SlashTitle({ eyebrow = 'Fight together！', title, subtitle }) {
  return (
    <header className="mb-6">
      <p className="inline-block -skew-x-12 border-2 border-blood bg-blood px-3 py-1 font-display text-sm text-paper shadow-brutalBlack">
        {eyebrow}
      </p>
      <h1 className="persona-title mt-4 origin-left -skew-x-6 font-display text-5xl uppercase leading-[0.9] tracking-normal text-paper sm:text-7xl">
        {title}
      </h1>
      {subtitle ? <p className="mt-3 max-w-xl text-base font-black text-ash">{subtitle}</p> : null}
    </header>
  );
}

export function BrutalCard({ children, className = '', dark = false }) {
  return (
    <section className={`brutal-card ${dark ? 'brutal-card-dark' : ''} ${className}`}>
      {children}
    </section>
  );
}

export function ActionButton({ children, variant = 'red', className = '', ...props }) {
  return (
    <button type="button" className={`action-button action-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function StatPill({ label, value, tone = 'light' }) {
  return (
    <div className={`stat-pill ${tone === 'dark' ? 'stat-pill-dark' : ''}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function RadarChart({ values, score }) {
  const { get } = useI18n();
  const labels = get('components.radar', ['攻击', '防御', '敏捷', '意志', '策略']);
  const center = 130;
  const maxRadius = 70;
  const points = values
    .map((value, index) => {
      const angle = -Math.PI / 2 + (index * Math.PI * 2) / values.length;
      const radius = (value / 100) * maxRadius;
      return `${center + Math.cos(angle) * radius},${center + Math.sin(angle) * radius}`;
    })
    .join(' ');

  const grid = [0.25, 0.5, 0.75, 1].map((ratio) =>
    labels
      .map((_, index) => {
        const angle = -Math.PI / 2 + (index * Math.PI * 2) / labels.length;
        const radius = maxRadius * ratio;
        return `${center + Math.cos(angle) * radius},${center + Math.sin(angle) * radius}`;
      })
      .join(' '),
  );

  return (
    <div className="radar-frame mx-auto aspect-square w-full max-w-[280px] p-2">
      <svg viewBox="0 0 260 260" className="h-full w-full">
        <rect x="10" y="10" width="240" height="240" fill="#F5F5F5" stroke="#1A1A1A" strokeWidth="5" />
        {grid.map((poly, index) => (
          <polygon key={index} points={poly} fill="none" stroke="#1A1A1A" strokeWidth="1.5" opacity="0.35" />
        ))}
        {labels.map((label, index) => {
          const angle = -Math.PI / 2 + (index * Math.PI * 2) / labels.length;
          const x = center + Math.cos(angle) * 100;
          const y = center + Math.sin(angle) * 100;
          return (
            <g key={label}>
              <line
                x1={center}
                y1={center}
                x2={center + Math.cos(angle) * maxRadius}
                y2={center + Math.sin(angle) * maxRadius}
                stroke="#1A1A1A"
                strokeWidth="1"
                opacity="0.35"
              />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#1A1A1A"
                fontSize="12"
                fontWeight="900"
              >
                {label}
              </text>
            </g>
          );
        })}
        <polygon points={points} fill="rgba(230,30,50,0.72)" stroke="#E61E32" strokeWidth="4" />
        {values.map((value, index) => {
          const angle = -Math.PI / 2 + (index * Math.PI * 2) / values.length;
          const radius = (value / 100) * maxRadius;
          return (
            <circle
              key={index}
              cx={center + Math.cos(angle) * radius}
              cy={center + Math.sin(angle) * radius}
              r="4"
              fill="#1A1A1A"
            />
          );
        })}
        {score !== undefined ? (
          <g>
            <circle cx={center} cy={center} r="35" fill="#1A1A1A" stroke="#F5F5F5" strokeWidth="5" />
            <text x={center} y={center - 4} textAnchor="middle" dominantBaseline="middle" fill="#E61E32" fontSize="28" fontWeight="900">
              {score}
            </text>
            <text x={center} y={center + 18} textAnchor="middle" dominantBaseline="middle" fill="#F5F5F5" fontSize="10" fontWeight="900">
              SCORE
            </text>
          </g>
        ) : null}
      </svg>
    </div>
  );
}

export function ShareTools({ targetId }) {
  const { t } = useI18n();

  async function capture() {
    const node = document.getElementById(targetId);
    if (!node) return;
    const canvas = await html2canvas(node, { backgroundColor: '#1A1A1A', scale: 2 });
    const link = document.createElement('a');
    link.download = 'woman-up-result.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  async function copyLink() {
    await navigator.clipboard?.writeText(window.location.href);
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <ActionButton variant="black" onClick={capture}>
        <Download size={18} strokeWidth={3} />
        {t('components.saveImage')}
      </ActionButton>
      <ActionButton variant="red" onClick={copyLink}>
        <Share2 size={18} strokeWidth={3} />
        {t('components.copyLink')}
      </ActionButton>
    </div>
  );
}

export function InviteBox({ code }) {
  const { t } = useI18n();

  async function copy() {
    await navigator.clipboard?.writeText(code);
  }

  return (
    <div className="border-4 border-void bg-paper p-4 text-void shadow-brutal">
      <p className="text-xs font-black uppercase">{t('components.inviteCode')}</p>
      <div className="mt-2 flex items-center justify-between gap-3">
        <strong className="font-display text-3xl tracking-normal">{code}</strong>
        <button
          type="button"
          onClick={copy}
          className="grid h-11 w-11 place-items-center border-4 border-void bg-blood text-paper shadow-[4px_4px_0_#1A1A1A]"
          aria-label={t('components.copyInvite')}
          title={t('components.copyInvite')}
        >
          <Copy size={20} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}

export function CameraBadge({ active }) {
  const { t } = useI18n();

  return (
    <div className={`inline-flex items-center gap-2 border-2 px-3 py-1 text-xs font-black ${active ? 'border-blood bg-blood text-paper' : 'border-void bg-paper text-void'}`}>
      <Camera size={14} strokeWidth={3} />
      {active ? t('components.cameraOn') : t('components.cameraWaiting')}
    </div>
  );
}

export function MedalBadge({ children }) {
  return (
    <div className="inline-flex -skew-x-12 items-center gap-2 border-4 border-void bg-blood px-3 py-2 text-sm font-black text-paper shadow-brutalBlack">
      <Medal size={18} strokeWidth={3} />
      <span className="skew-x-12">{children}</span>
    </div>
  );
}
