import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ActionButton, BrutalCard, SlashTitle } from '../components.jsx';
import { survivalSkillCards } from '../data.js';

export default function SurvivalGuidePage() {
  const navigate = useNavigate();

  return (
    <>
      <SlashTitle eyebrow="SURVIVAL FILE" title="生存知识科普" subtitle="把小场景里的判断、撤离、求助和自我照料拆成可练习的知识卡。" />

      <div className="grid gap-3 sm:grid-cols-2">
        {survivalSkillCards.map((card) => (
          <BrutalCard key={card.name}>
            <p className="text-xs font-black uppercase text-blood">SURVIVAL FILE</p>
            <h2 className="font-display text-4xl uppercase leading-none text-void">{card.name}</h2>
            <p className="mt-3 border-l-8 border-blood pl-3 text-lg font-black text-void">{card.line}</p>
            <p className="mt-3 border-t-2 border-void pt-2 text-sm font-bold text-ink">适用：{card.scene}</p>
          </BrutalCard>
        ))}
      </div>

      <ActionButton className="mt-5 w-full" onClick={() => navigate('/elevator-test')}>
        下一页：电梯测试
        <ArrowRight size={18} strokeWidth={3} />
      </ActionButton>
    </>
  );
}
