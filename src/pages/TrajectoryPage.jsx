import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { ActionButton, BrutalCard, SlashTitle, StatPill } from '../components.jsx';
import { getAllocation, getProfile, trajectoryDetails } from '../data.js';
import { useI18n } from '../i18n.jsx';

export default function TrajectoryPage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const allocation = getAllocation();
  const { get } = useI18n();
  const profile = useMemo(() => getProfile(allocation), [allocation]);
  const scenes = useMemo(() => get(`trajectories.${profile.key}`) || trajectoryDetails[profile.key], [profile.key, get]);
  const [active, setActive] = useState(0);
  const current = scenes[active];
  const done = active === scenes.length - 1;

  function replay() {
    setActive(0);
  }

  function previousScene() {
    setActive((index) => Math.max(index - 1, 0));
  }

  function nextScene() {
    setActive((index) => Math.min(index + 1, scenes.length - 1));
  }

  return (
    <>
      <SlashTitle eyebrow={t('trajectory.eyebrow')} title={t('trajectory.title')} subtitle={t('trajectory.subtitle')} />

      <div className="mb-5 grid grid-cols-2 gap-3">
        <StatPill label={t('trajectory.power')} value={`${profile.powerHours}h`} />
        <StatPill label={t('trajectory.playback')} value={`${active + 1}/4`} />
      </div>

      <section key={active} className="future-stage future-stage-cinema mb-5">
        <div className="future-scanline" />
        <div className="future-scene-label">SCENE 0{active + 1}</div>
        <div className="future-year">{current.year}</div>
        <div className="future-card future-card-cinema">
          <p className="text-xs font-black uppercase text-warning">LIFE ROUTE / {profile.title}</p>
          <h2>{current.headline}</h2>
          <p>{current.body}</p>
        </div>
        <div className="future-progress">
          <span style={{ width: `${((active + 1) / scenes.length) * 100}%` }} />
        </div>
        <div className="future-track">
          {scenes.map((scene, index) => (
            <button
              type="button"
              key={scene.year}
              onClick={() => setActive(index)}
              className={index === active ? 'future-dot future-dot-active' : 'future-dot'}
            >
              {scene.year.replace('后', '').replace('後', '')}
            </button>
          ))}
        </div>
      </section>

      <BrutalCard dark className="mb-5">
        <h2 className="section-title-light">{t('trajectory.summary')}</h2>
        <div className="mt-4 space-y-3">
          {scenes.map((scene, index) => (
            <div key={scene.year} className={`timeline-row ${index === active ? 'timeline-row-hot' : ''}`}>
              <span>{scene.year.replace('后', '').replace('後', '')}</span>
              <p>{scene.headline}</p>
            </div>
          ))}
        </div>
      </BrutalCard>

      <div className="grid gap-3">
        <div className="grid grid-cols-2 gap-3">
          <ActionButton variant="black" onClick={previousScene} disabled={active === 0}>
            <ArrowLeft size={18} strokeWidth={3} />
            {t('trajectory.previous')}
          </ActionButton>
          <ActionButton onClick={nextScene} disabled={done}>
            {t('trajectory.next')}
            <ArrowRight size={18} strokeWidth={3} />
          </ActionButton>
        </div>
        {done ? (
          <ActionButton onClick={() => navigate('/result')}>
            {t('trajectory.reveal')}
            <ArrowRight size={18} strokeWidth={3} />
          </ActionButton>
        ) : (
          <div className="cinema-hold">{t('trajectory.hold')}</div>
        )}
        <ActionButton variant="black" onClick={replay}>
          <RotateCcw size={18} strokeWidth={3} />
          {t('trajectory.replay')}
        </ActionButton>
      </div>
    </>
  );
}
