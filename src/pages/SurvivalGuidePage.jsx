import { ArrowRight, CheckCircle2, ClipboardList, Map, Siren } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ActionButton, BrutalCard, SlashTitle } from '../components.jsx';
import { survivalDrills, survivalProtocols, survivalScenarios, survivalSkillCards } from '../data.js';
import { useI18n } from '../i18n.jsx';

export default function SurvivalGuidePage() {
  const navigate = useNavigate();
  const { get, t } = useI18n();
  const principles = get('guide.principles', []);
  const skillCards = get('survivalSkills') || survivalSkillCards;
  const protocols = get('survivalProtocols') || survivalProtocols;
  const scenarios = get('survivalScenarios') || survivalScenarios;
  const drills = get('survivalDrills') || survivalDrills;

  return (
    <>
      <SlashTitle eyebrow="SURVIVAL FILE" title={t('guide.survivalTitle')} subtitle={t('guide.survivalSubtitle')} />

      <BrutalCard dark className="mb-5">
        <p className="text-xs font-black uppercase text-blood">CORE RULE</p>
        <h2 className="section-title-light">{t('guide.coreRule')}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {principles.map((item, index) => (
            <Principle key={item.title} label={String(index + 1)} title={item.title} body={item.body} />
          ))}
        </div>
      </BrutalCard>

      <section className="mb-5">
        <div className="mb-3 flex items-center gap-2 text-paper">
          <ClipboardList className="text-blood" size={24} strokeWidth={3} />
          <h2 className="font-display text-4xl uppercase leading-none">{t('guide.protocols')}</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {protocols.map((item, index) => (
            <BrutalCard key={item.title}>
              <p className="text-xs font-black uppercase text-blood">PROTOCOL 0{index + 1}</p>
              <h3 className="section-title-dark">{item.title}</h3>
              <p className="mt-2 text-sm font-black text-ink">{item.subtitle}</p>
              <div className="mt-3 grid gap-2">
                {item.steps.map((step) => (
                  <div key={step} className="survival-check">
                    <CheckCircle2 size={16} strokeWidth={3} />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </BrutalCard>
          ))}
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        {skillCards.map((card) => (
          <BrutalCard key={card.name}>
            <p className="text-xs font-black uppercase text-blood">SURVIVAL FILE</p>
            <h2 className="font-display text-4xl uppercase leading-none text-void">{card.name}</h2>
            <p className="mt-3 border-l-8 border-blood pl-3 text-lg font-black text-void">{card.line}</p>
            <p className="mt-3 border-t-2 border-void pt-2 text-sm font-bold text-ink">{t('guide.apply', { scene: card.scene })}</p>
            <p className="mt-3 bg-void p-3 text-sm font-black text-paper">{t('guide.focus', { focus: card.focus })}</p>
            <div className="mt-3 grid gap-2">
              {card.actions.map((action) => (
                <div key={action} className="survival-check survival-check-dark">
                  <CheckCircle2 size={16} strokeWidth={3} />
                  <span>{action}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 border-4 border-void bg-blood p-2 text-sm font-black text-paper">{t('guide.avoid', { avoid: card.avoid })}</p>
          </BrutalCard>
        ))}
      </div>

      <section className="my-5">
        <div className="mb-3 flex items-center gap-2 text-paper">
          <Map className="text-blood" size={24} strokeWidth={3} />
          <h2 className="font-display text-4xl uppercase leading-none">{t('guide.scenes')}</h2>
        </div>
        <div className="grid gap-3">
          {scenarios.map((item) => (
            <BrutalCard key={item.scene} dark>
              <p className="text-xs font-black uppercase text-blood">SCENE</p>
              <h3 className="section-title-light">{item.scene}</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <ScenarioBlock title={t('guide.alarm')} body={item.cue} />
                <ScenarioBlock title={t('guide.action')} body={item.move} />
                <ScenarioBlock title={t('guide.script')} body={item.line} hot />
              </div>
            </BrutalCard>
          ))}
        </div>
      </section>

      <BrutalCard className="mb-5">
        <div className="flex items-start gap-3">
            <Siren className="mt-1 shrink-0 text-blood" size={30} strokeWidth={3} />
            <div>
              <p className="text-xs font-black uppercase text-blood">AFTERCARE</p>
            <h2 className="section-title-dark">{t('guide.aftercareTitle')}</h2>
            <p className="mt-2 text-sm font-bold text-ink">
              {t('guide.aftercareBody')}
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {drills.map((item) => (
            <div key={item.day} className="survival-drill">
              <strong>{item.day}</strong>
              <span>{item.task}</span>
            </div>
          ))}
        </div>
      </BrutalCard>

      <ActionButton className="mt-5 w-full" onClick={() => navigate('/elevator-test')}>
        {t('guide.nextElevator')}
        <ArrowRight size={18} strokeWidth={3} />
      </ActionButton>
    </>
  );
}

function Principle({ label, title, body }) {
  return (
    <div className="survival-principle">
      <strong>{label}</strong>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}

function ScenarioBlock({ title, body, hot = false }) {
  return (
    <div className={`scenario-block ${hot ? 'scenario-block-hot' : ''}`}>
      <strong>{title}</strong>
      <p>{body}</p>
    </div>
  );
}
