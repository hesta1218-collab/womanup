import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ActionButton, BrutalCard, SlashTitle } from '../components.jsx';
import { martialArtsCards } from '../data.js';
import { useI18n } from '../i18n.jsx';

export default function CombatGuidePage() {
  const navigate = useNavigate();
  const { t, get } = useI18n();
  const cards = get('martialArts') || martialArtsCards;

  return (
    <>
      <SlashTitle eyebrow="COMBAT FILE" title={t('guide.combatTitle')} subtitle={t('guide.combatSubtitle')} />

      <div className="grid gap-3 sm:grid-cols-2">
        {cards.map((card) => (
          <BrutalCard key={card.name}>
            <p className="text-xs font-black uppercase text-blood">COMBAT FILE</p>
            <h2 className="font-display text-4xl uppercase leading-none text-void">{card.name}</h2>
            <p className="mt-3 border-l-8 border-blood pl-3 text-lg font-black text-void">{card.line}</p>
            <p className="mt-3 border-t-2 border-void pt-2 text-sm font-bold text-ink">{t('guide.combatApply', { scene: card.scene })}</p>
          </BrutalCard>
        ))}
      </div>

      <ActionButton className="mt-5 w-full" onClick={() => navigate('/survival')}>
        {t('guide.nextSurvival')}
        <ArrowRight size={18} strokeWidth={3} />
      </ActionButton>
    </>
  );
}
