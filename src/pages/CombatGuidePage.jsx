import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ActionButton, BrutalCard, SlashTitle } from '../components.jsx';
import { martialArtsCards } from '../data.js';

export default function CombatGuidePage() {
  const navigate = useNavigate();

  return (
    <>
      <SlashTitle eyebrow="COMBAT FILE" title="格斗科普" subtitle="认识不同格斗术的使用场景，把身体训练变成可理解的路线图。" />

      <div className="grid gap-3 sm:grid-cols-2">
        {martialArtsCards.map((card) => (
          <BrutalCard key={card.name}>
            <p className="text-xs font-black uppercase text-blood">COMBAT FILE</p>
            <h2 className="font-display text-4xl uppercase leading-none text-void">{card.name}</h2>
            <p className="mt-3 border-l-8 border-blood pl-3 text-lg font-black text-void">{card.line}</p>
            <p className="mt-3 border-t-2 border-void pt-2 text-sm font-bold text-ink">适用：{card.scene}</p>
          </BrutalCard>
        ))}
      </div>

      <ActionButton className="mt-5 w-full" onClick={() => navigate('/survival')}>
        下一页：生存知识科普
        <ArrowRight size={18} strokeWidth={3} />
      </ActionButton>
    </>
  );
}
