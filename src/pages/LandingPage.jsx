import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Badge } from 'lucide-react';
import { ActionButton, BrutalCard, SlashTitle } from '../components.jsx';
import { getPlayerName, savePlayerName } from '../data.js';
import { useI18n } from '../i18n.jsx';

export default function LandingPage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [name, setName] = useState(getPlayerName() === '你' ? '' : getPlayerName());

  function enter() {
    savePlayerName(name);
    navigate('/test');
  }

  return (
    <>
      <section className="landing-banner mb-5" aria-label="Woman Up banner">
        <img src="/assets/wp-banner.jpg" alt={t('landing.bannerAlt')} />
      </section>

      <SlashTitle eyebrow={t('landing.eyebrow')} title={t('landing.title')} subtitle={t('landing.subtitle')} />

      <AnonymousLetter />

      <BrutalCard className="mb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase text-blood">{t('landing.playerId')}</p>
            <h2 className="section-title-dark">{t('landing.nickname')}</h2>
          </div>
          <Badge className="text-blood" size={40} strokeWidth={3} />
        </div>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={18}
          className="mt-5 w-full border-4 border-void bg-paper px-4 py-4 font-display text-3xl uppercase text-void outline-none focus:border-blood"
        />
      </BrutalCard>

      <ActionButton className="w-full" onClick={enter}>
        {t('landing.enter')}
        <ArrowRight size={18} strokeWidth={3} />
      </ActionButton>
    </>
  );
}

function AnonymousLetter() {
  const { t } = useI18n();

  return (
    <section className="phantom-letter-wrap mb-6" aria-label={t('landing.letterAria')}>
      <article className="phantom-letter">
        <div className="phantom-letter-paper">
          <span className="phantom-tape phantom-tape-left" aria-hidden="true" />
          <span className="phantom-tape phantom-tape-right" aria-hidden="true" />
          <div className="phantom-letter-copy">
            <p className="phantom-letter-line phantom-letter-lead">
              <span className="ransom-chip">{t('landing.letter.group')}</span>
              {t('landing.letter.dilemma')}
              <span className="ransom-hot">{t('landing.letter.loneliness')}</span>
              {t('landing.letter.separator')}
              <span className="ransom-hot ransom-hot-alt">{t('landing.letter.lowEnergy')}</span>
              {t('landing.letter.risks')}
            </p>
            <p className="phantom-letter-line">
              {t('landing.letter.buildup')}
            </p>
          </div>
          <div className="phantom-letter-callout">
            <p className="phantom-letter-motto">{t('landing.letter.motto')}</p>
            <p className="phantom-letter-line phantom-letter-punch">
              {t('landing.letter.punchBefore')}<span>{t('landing.letter.firstPunch')}</span>
            </p>
          </div>
          <p className="phantom-letter-line phantom-letter-wide">
            {t('landing.letter.final')}
          </p>
        </div>
        <div className="phantom-dagger" aria-hidden="true">
          <span className="dagger-blade" />
          <span className="dagger-guard" />
          <span className="dagger-handle" />
        </div>
      </article>
      <div className="phantom-divider" aria-hidden="true" />
    </section>
  );
}
