import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ActionButton, BrutalCard, SlashTitle } from '../components.jsx';
import { historicalWomenStories } from '../data.js';

export default function WomenStoriesPage() {
  const navigate = useNavigate();

  return (
    <>
      <SlashTitle eyebrow="WOMEN WHO FOUGHT" title="强女的故事" subtitle="从历史人物里提取判断力、行动力、边界感和身体主权。" />

      <div className="grid gap-3">
        {historicalWomenStories.map((person) => (
          <BrutalCard key={person.name} dark>
            <p className="text-xs font-black uppercase text-blood">{person.era}</p>
            <h2 className="font-display text-4xl uppercase leading-none text-paper">{person.name}</h2>
            <p className="mt-2 border-l-8 border-blood pl-3 text-xl font-black text-paper">{person.title}</p>
            <p className="mt-3 text-sm font-bold text-ash">{person.story}</p>
            <p className="mt-3 bg-paper p-3 text-sm font-black text-void">训练启发：{person.lesson}</p>
          </BrutalCard>
        ))}
      </div>

      <ActionButton className="mt-5 w-full" onClick={() => navigate('/elevator-test')}>
        进入电梯测试
        <ArrowRight size={18} strokeWidth={3} />
      </ActionButton>
    </>
  );
}
