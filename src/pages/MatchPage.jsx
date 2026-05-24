import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bot, Radio, Users } from 'lucide-react';
import { ActionButton, BrutalCard, InviteBox, SlashTitle } from '../components.jsx';
import { getInvite, SYSTEM_TEAMMATE } from '../data.js';
import { useI18n } from '../i18n.jsx';

export default function MatchPage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const inviteCode = getInvite();

  return (
    <>
      <SlashTitle eyebrow={t('match.eyebrow')} title={t('match.title')} subtitle={t('match.subtitle')} />

      <BrutalCard className="mb-5">
        <h2 className="section-title-dark">{t('match.invite')}</h2>
        <p className="mb-4 mt-1 text-sm font-bold text-ink">{t('match.inviteBody')}</p>
        <InviteBox code={inviteCode} />
      </BrutalCard>

      <BrutalCard dark className="mb-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase text-blood">AUTO MATCHED</p>
            <h2 className="section-title-light">{SYSTEM_TEAMMATE.name}</h2>
            <p className="mt-2 text-sm font-bold text-ash">{t('match.teammateNote')}</p>
          </div>
          <Bot className="text-blood" size={42} strokeWidth={3} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="demo-chip">
            <Radio size={16} strokeWidth={3} />
            {t('match.asyncReady')}
          </div>
          <div className="demo-chip">
            <Users size={16} strokeWidth={3} />
            {t('match.anyPass')}
          </div>
        </div>
        <ActionButton className="mt-4 w-full" onClick={() => navigate('/squad')}>
          {t('match.enterSquad')}
          <ArrowRight size={18} strokeWidth={3} />
        </ActionButton>
      </BrutalCard>

      <BrutalCard>
        <p className="text-xs font-black uppercase text-blood">ASYNC DUO</p>
        <h2 className="section-title-dark">{t('match.rules')}</h2>
        <div className="mt-3 grid gap-2 text-sm font-bold text-ink">
          <p>{t('match.rule1')}</p>
          <p>{t('match.rule2')}</p>
          <p>{t('match.rule3')}</p>
        </div>
      </BrutalCard>
    </>
  );
}
