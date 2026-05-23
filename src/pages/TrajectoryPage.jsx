import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { ActionButton, BrutalCard, SlashTitle, StatPill } from '../components.jsx';
import { getAllocation, getProfile, trajectoryDetails } from '../data.js';

export default function TrajectoryPage() {
  const navigate = useNavigate();
  const allocation = getAllocation();
  const profile = useMemo(() => getProfile(allocation), [allocation]);
  const scenes = trajectoryDetails[profile.key];
  const [active, setActive] = useState(0);
  const [finished, setFinished] = useState(false);
  const current = scenes[active];
  const done = active === scenes.length - 1;

  useEffect(() => {
    if (done) {
      const finishTimer = setTimeout(() => setFinished(true), 2200);
      return () => clearTimeout(finishTimer);
    }
    const timer = setTimeout(() => {
      setActive((index) => Math.min(index + 1, scenes.length - 1));
    }, 3600);
    return () => clearTimeout(timer);
  }, [active, done, scenes.length]);

  function replay() {
    setFinished(false);
    setActive(0);
  }

  return (
    <>
      <SlashTitle eyebrow="FUTURE CUT" title="未来正在播放" subtitle="最终测试结果揭晓前，先看这一天如何把你推向 1、2、5、10 年之后。" />

      <div className="mb-5 grid grid-cols-2 gap-3">
        <StatPill label="战斗+知识" value={`${profile.powerHours}h`} />
        <StatPill label="播放进度" value={`${active + 1}/4`} />
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
            <div
              key={scene.year}
              className={index === active ? 'future-dot future-dot-active' : 'future-dot'}
            >
              {scene.year.replace('后', '')}
            </div>
          ))}
        </div>
      </section>

      <BrutalCard dark className="mb-5">
        <h2 className="section-title-light">命运快进摘要</h2>
        <div className="mt-4 space-y-3">
          {scenes.map((scene, index) => (
            <div key={scene.year} className={`timeline-row ${index === active ? 'timeline-row-hot' : ''}`}>
              <span>{scene.year.replace('后', '')}</span>
              <p>{scene.headline}</p>
            </div>
          ))}
        </div>
      </BrutalCard>

      <div className="grid gap-3">
        {finished ? (
          <ActionButton onClick={() => navigate('/result')}>
            揭晓最终测试结果
            <ArrowRight size={18} strokeWidth={3} />
          </ActionButton>
        ) : (
          <div className="cinema-hold">正在自动播放未来片段...</div>
        )}
        <ActionButton variant="black" onClick={replay}>
          <RotateCcw size={18} strokeWidth={3} />
          重播动画
        </ActionButton>
      </div>
    </>
  );
}
