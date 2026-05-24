import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ActionButton, BrutalCard, SlashTitle } from '../components.jsx';
import { historicalWomenStories } from '../data.js';
import { useI18n } from '../i18n.jsx';

export default function WomenStoriesPage() {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <>
      <SlashTitle eyebrow="WOMEN WHO FOUGHT" title={t('guide.storiesTitle')} subtitle={t('guide.storiesSubtitle')} />

      <div className="grid gap-3">
        {historicalWomenStories.map((person) => (
          <BrutalCard key={person.name} dark>
            <p className="text-xs font-black uppercase text-blood">{person.era}</p>
            <h2 className="font-display text-4xl uppercase leading-none text-paper">{person.name}</h2>
            <p className="mt-2 border-l-8 border-blood pl-3 text-xl font-black text-paper">{person.title}</p>
            <p className="mt-3 text-sm font-bold text-ash">{person.story}</p>
            <p className="mt-3 bg-paper p-3 text-sm font-black text-void">{t('guide.lesson', { lesson: person.lesson })}</p>
          </BrutalCard>
        ))}
      </div>

      <ActionButton className="mt-5 w-full" onClick={() => navigate('/elevator-test')}>
        {t('guide.enterElevator')}
        <ArrowRight size={18} strokeWidth={3} />
      </ActionButton>
    </>
  );
}
