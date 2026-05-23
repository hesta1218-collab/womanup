import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { ActionButton, BrutalCard, SlashTitle, StatPill } from '../components.jsx';
import { getAllocation, getProfile, trajectoryDetails } from '../data.js';

export default function TrajectoryPage() {
  const navigate = useNavigate();
  const allocation = getAllocation();
  const profile = useMemo(() => getProfile(allocation), [allocation]);
  const scenes = trajectoryDetails[profile.key];
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
      <SlashTitle eyebrow="FUTURE CUT" title="未来轨迹" subtitle="用按键切换 1、2、5、10 年后的版本，不必等待自动播放。" />

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
            <button
              type="button"
              key={scene.year}
              onClick={() => setActive(index)}
              className={index === active ? 'future-dot future-dot-active' : 'future-dot'}
            >
              {scene.year.replace('后', '')}
            </button>
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
        <div className="grid grid-cols-2 gap-3">
          <ActionButton variant="black" onClick={previousScene} disabled={active === 0}>
            <ArrowLeft size={18} strokeWidth={3} />
            上一段
          </ActionButton>
          <ActionButton onClick={nextScene} disabled={done}>
            下一段
            <ArrowRight size={18} strokeWidth={3} />
          </ActionButton>
        </div>
        {done ? (
          <ActionButton onClick={() => navigate('/result')}>
            揭晓最终测试结果
            <ArrowRight size={18} strokeWidth={3} />
          </ActionButton>
        ) : (
          <div className="cinema-hold">切到 10 年后，即可揭晓最终测试结果。</div>
        )}
        <ActionButton variant="black" onClick={replay}>
          <RotateCcw size={18} strokeWidth={3} />
          重播动画
        </ActionButton>
      </div>
    </>
  );
}
