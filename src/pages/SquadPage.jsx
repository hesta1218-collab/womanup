import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bot, Shield, Swords } from 'lucide-react';
import { ActionButton, BrutalCard, SlashTitle, StatPill } from '../components.jsx';
import {
  DUO_CLEAR_BONUS,
  SYSTEM_TEAMMATE,
  TARGET_PUNCHES,
  getAllocation,
  getDuoScore,
  getInvite,
  getProfile,
  getRankInfo,
  getTraining,
  isTeamPassed,
} from '../data.js';
import { useI18n } from '../i18n.jsx';

export default function SquadPage() {
  const navigate = useNavigate();
  const { t, get } = useI18n();
  const allocation = getAllocation();
  const profile = getProfile(allocation);
  const training = getTraining();
  const rankInfo = getRankInfo(allocation, training);
  const passed = isTeamPassed(training);
  const duoScore = getDuoScore(rankInfo.score, training);
  const teammate = {
    ...SYSTEM_TEAMMATE,
    title: get('systemTeammate.title') || SYSTEM_TEAMMATE.title,
    note: get('systemTeammate.note') || SYSTEM_TEAMMATE.note,
  };

  return (
    <>
      <SlashTitle eyebrow={t('squad.eyebrow')} title={t('squad.title')} subtitle={t('squad.subtitle')} />

      <BrutalCard className="mb-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase text-blood">{t('squad.teamNameLabel')}</p>
            <h2 className="font-display text-5xl uppercase text-void">{t('squad.teamName')}</h2>
          </div>
          <Shield size={44} strokeWidth={3} className="text-blood" />
        </div>
        <p className="mt-3 border-l-8 border-blood pl-3 text-lg font-black text-void">
          {t('squad.inviteLine', { invite: getInvite(), teammate: SYSTEM_TEAMMATE.name, rank: profile.key, title: profile.title })}
        </p>
      </BrutalCard>

      <div className="mb-5 grid grid-cols-3 gap-3">
        <StatPill label={t('squad.yourBreath')} value={training.comboComplete ? t('squad.complete') : t('squad.pending')} />
        <StatPill label={t('squad.teammateStatus')} value={training.partnerComplete ? 'PASS' : 'READY'} />
        <StatPill label={t('squad.team')} value={passed ? 'CLEAR' : 'LIVE'} />
      </div>

      <BrutalCard dark className="mb-5">
        <div className="flex items-center gap-3">
          <Swords className="text-blood" size={30} strokeWidth={3} />
          <h2 className="section-title-light">{t('squad.currentStage')}</h2>
        </div>
        <p className="mt-2 font-display text-4xl uppercase leading-none text-paper">{t('squad.stageTitle')}</p>
        <p className="mt-3 text-sm font-bold text-ash">{t('squad.stageBody')}</p>
        <ActionButton className="mt-4 w-full" onClick={() => navigate('/training')}>
          {t('squad.enterStage')}
          <ArrowRight size={18} strokeWidth={3} />
        </ActionButton>
      </BrutalCard>

      <BrutalCard>
        <div className="flex items-center gap-3">
          <Bot className="text-blood" size={30} strokeWidth={3} />
          <h2 className="section-title-dark">{t('squad.teammateTitle')}</h2>
        </div>
        <p className="mt-2 text-sm font-bold text-ink">
          {t('squad.teammateBody', { teammate: SYSTEM_TEAMMATE.name })}
        </p>
        <div className="mt-4 grid gap-3">
          <Progress label={t('squad.you')} value={Math.min(training.punches || 0, TARGET_PUNCHES)} max={TARGET_PUNCHES} />
          <Progress label={SYSTEM_TEAMMATE.name} value={training.partnerComplete ? TARGET_PUNCHES : training.partnerPunches || 3} max={TARGET_PUNCHES} />
          <Progress label={t('squad.passCheck')} value={passed ? 1 : 0} max={1} />
        </div>
        <p className="mt-4 bg-void p-3 font-black text-paper">
          {t('squad.duoScoreLine', { score: passed ? duoScore : t('squad.notCleared'), bonus: DUO_CLEAR_BONUS })}
        </p>
      </BrutalCard>
    </>
  );
}

function Progress({ label, value, max }) {
  const width = `${Math.min((value / max) * 100, 100)}%`;
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm font-black text-void">
        <span>{label}</span>
        <span>{value}/{max}</span>
      </div>
      <div className="h-5 border-4 border-void bg-ash">
        <div className="h-full bg-blood" style={{ width }} />
      </div>
    </div>
  );
}
