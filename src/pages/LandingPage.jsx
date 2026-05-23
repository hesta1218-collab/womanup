import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Badge } from 'lucide-react';
import { ActionButton, BrutalCard, SlashTitle } from '../components.jsx';
import { getPlayerName, savePlayerName } from '../data.js';

export default function LandingPage() {
  const navigate = useNavigate();
  const [name, setName] = useState(getPlayerName() === '你' ? '' : getPlayerName());

  function enter() {
    savePlayerName(name);
    navigate('/test');
  }

  return (
    <>
      <section className="landing-banner mb-5" aria-label="Woman Up banner">
        <img src="/assets/wp-banner.jpg" alt="Woman Up 出拳开始战斗 banner" />
      </section>

      <SlashTitle eyebrow="Fight together！" title="Woman Up！" subtitle="娘们要战斗" />

      <AnonymousLetter />

      <BrutalCard className="mb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase text-blood">PLAYER ID</p>
            <h2 className="section-title-dark">输入昵称</h2>
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
        不行，娘们必须得战斗了
        <ArrowRight size={18} strokeWidth={3} />
      </ActionButton>
    </>
  );
}

function AnonymousLetter() {
  return (
    <section className="phantom-letter-wrap mb-6" aria-label="心之匿名信">
      <article className="phantom-letter">
        <div className="phantom-letter-paper">
          <span className="phantom-tape phantom-tape-left" aria-hidden="true" />
          <span className="phantom-tape phantom-tape-right" aria-hidden="true" />
          <div className="phantom-letter-copy">
            <p className="phantom-letter-line phantom-letter-lead">
              <span className="ransom-chip">独居、异地女性</span>
              {'的困境——'}
              <span className="ransom-hot">孤独</span>
              {'、'}
              <span className="ransom-hot ransom-hot-alt">低能量</span>
              {'、生活节奏滑落、人身安全隐患、自我保护困境'}
            </p>
            <p className="phantom-letter-line">
              重点不是戏剧性崩溃，而是小事如何在危险发生前慢慢堆积
            </p>
          </div>
          <div className="phantom-letter-callout">
            <p className="phantom-letter-motto">「文明其精神 野蛮其体魄」</p>
            <p className="phantom-letter-line phantom-letter-punch">
              战斗力和精神气的恢复，可能只需要你挥出人生<span>第一个直拳</span>
            </p>
          </div>
          <p className="phantom-letter-line phantom-letter-wide">
            不是让你一个人变强，而是让你在重建生活秩序的过程中，找到和你同频的人。
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
