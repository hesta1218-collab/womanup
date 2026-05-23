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
