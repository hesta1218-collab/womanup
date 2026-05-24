import { ArrowRight, DoorOpen, LockKeyhole, Wind } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ActionButton, BrutalCard, SlashTitle } from '../components.jsx';
import { useI18n } from '../i18n.jsx';

export default function GameHubPage() {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <>
      <SlashTitle eyebrow={t('game.eyebrow')} title={t('game.title')} subtitle={t('game.subtitle')} />

      <div className="grid gap-4">
        <BrutalCard>
          <div className="flex items-start gap-4">
            <DoorOpen className="shrink-0 text-blood" size={42} strokeWidth={3} />
            <div>
              <p className="text-xs font-black uppercase text-blood">STAGE 01</p>
              <h2 className="section-title-dark">{t('game.stageOne')}</h2>
              <p className="mt-2 text-sm font-bold text-ink">{t('game.stageOneBody')}</p>
            </div>
          </div>
          <ActionButton className="mt-4 w-full" onClick={() => navigate('/elevator-test')}>
            {t('game.enterStageOne')}
            <ArrowRight size={18} strokeWidth={3} />
          </ActionButton>
        </BrutalCard>

        <BrutalCard dark>
          <div className="flex items-start gap-4">
            <Wind className="shrink-0 text-blood" size={42} strokeWidth={3} />
            <div>
              <p className="text-xs font-black uppercase text-blood">STAGE 02</p>
              <h2 className="section-title-light">{t('game.stageTwo')}</h2>
              <p className="mt-2 text-sm font-bold text-ash">{t('game.stageTwoBody')}</p>
            </div>
          </div>
          <ActionButton className="mt-4 w-full" onClick={() => navigate('/match')}>
            {t('game.enterStageTwo')}
            <ArrowRight size={18} strokeWidth={3} />
          </ActionButton>
        </BrutalCard>

        <BrutalCard>
          <div className="flex items-center gap-4">
            <LockKeyhole className="shrink-0 text-blood" size={42} strokeWidth={3} />
            <div>
              <p className="text-xs font-black uppercase text-blood">NEXT STAGE</p>
              <h2 className="section-title-dark">{t('game.nextStage')}</h2>
            </div>
          </div>
        </BrutalCard>
      </div>
    </>
  );
}
