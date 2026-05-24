import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, RotateCcw, ShieldCheck } from 'lucide-react';
import { ActionButton, BrutalCard, SlashTitle, StatPill } from '../components.jsx';
import { getPlayerName, getTotal, initialAllocation, saveAllocation, sliders } from '../data.js';
import { useI18n } from '../i18n.jsx';

const HOURS_IN_DAY = 24;
const fillTarget = 'sleep';

export default function HomePage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [allocation, setAllocation] = useState(initialAllocation);
  const total = getTotal(allocation);
  const remaining = HOURS_IN_DAY - total;
  const valid = total <= HOURS_IN_DAY;
  const overBudget = total > HOURS_IN_DAY;
  const playerName = getPlayerName();
  const budgetProgress = Math.min((total / HOURS_IN_DAY) * 100, 100);

  function updateSlider(key, value) {
    setAllocation((current) => ({ ...current, [key]: Number(value) }));
  }

  function fillRemaining() {
    if (remaining <= 0) return;
    setAllocation((current) => ({
      ...current,
      [fillTarget]: Number((Number(current[fillTarget] || 0) + remaining).toFixed(1)),
    }));
  }

  function resetAllocation() {
    setAllocation(initialAllocation);
  }

  function submit() {
    if (!valid) return;
    const confirmed = window.confirm(t('home.confirm', { name: playerName }));
    if (!confirmed) return;
    saveAllocation(allocation);
    navigate('/trajectory');
  }

  return (
    <>
      <SlashTitle title={t('home.title')} subtitle={t('home.subtitle', { name: playerName })} />

      <div className="mb-4 grid grid-cols-3 gap-3">
        <StatPill label={t('home.allocated')} value={`${total}h`} />
        <StatPill label={overBudget ? t('home.over') : t('home.remaining')} value={`${Math.abs(remaining)}h`} tone={valid ? 'light' : 'dark'} />
        <StatPill label={t('common.player')} value={playerName} tone="dark" />
      </div>

      <BrutalCard dark className="mb-5">
        <div className="flex items-start gap-3">
          {valid ? (
            <CheckCircle2 className="mt-1 shrink-0 text-blood" size={24} strokeWidth={3} />
          ) : (
            <AlertTriangle className="mt-1 shrink-0 text-blood" size={24} strokeWidth={3} />
          )}
          <div>
            <h2 className="font-display text-2xl uppercase">{t('home.budgetTitle')}</h2>
            <p className="mt-1 text-sm font-bold text-ash">
              {valid
                ? t('home.validBudget', { hours: remaining })
                : t('home.invalidBudget', { hours: Math.abs(remaining) })}
            </p>
          </div>
        </div>
        <div className="budget-bar mt-4" aria-label={t('home.budgetAria')}>
          <span style={{ width: `${budgetProgress}%` }} />
        </div>
      </BrutalCard>

      <div className="mb-5 grid grid-cols-2 gap-2">
        <button type="button" className="quick-action" onClick={fillRemaining} disabled={remaining <= 0}>
          <ShieldCheck size={16} strokeWidth={3} />
          {t('home.fillSleep')}
        </button>
        <button type="button" className="quick-action" onClick={resetAllocation}>
          <RotateCcw size={16} strokeWidth={3} />
          {t('home.reset')}
        </button>
      </div>

      <div className="space-y-4">
        {sliders.map((item) => {
          return (
            <BrutalCard key={item.key}>
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl uppercase text-void">
                    <span className="mr-2">{item.icon}</span>
                    {t(`sliders.${item.key}`)}
                  </h3>
                </div>
                <strong className="time-chip">{allocation[item.key]}h</strong>
              </div>
              <input
                className="rage-slider"
                type="range"
                min="0"
                max="24"
                step="0.5"
                value={allocation[item.key]}
                onChange={(event) => updateSlider(item.key, event.target.value)}
                aria-label={t(`sliders.${item.key}`)}
              />
            </BrutalCard>
          );
        })}
      </div>

      <div className="sticky bottom-24 z-20 mt-6">
        <ActionButton className="w-full" onClick={submit} disabled={!valid}>
          {t('home.submit')}
        </ActionButton>
      </div>
    </>
  );
}
