import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bot, Radio, Users } from 'lucide-react';
import { ActionButton, BrutalCard, InviteBox, SlashTitle } from '../components.jsx';
import { getInvite, SYSTEM_TEAMMATE } from '../data.js';

export default function MatchPage() {
  const navigate = useNavigate();
  const inviteCode = getInvite();

  return (
    <>
      <SlashTitle eyebrow="STAGE 02" title="Women Up！双人闯关游戏 —— 找回呼吸" subtitle="系统队友已接入。任意一方完成吸气和呼气，即可通过第二关。" />

      <BrutalCard className="mb-5">
        <h2 className="section-title-dark">你的邀请码</h2>
        <p className="mb-4 mt-1 text-sm font-bold text-ink">发给朋友。不是求陪伴，是组队升级。</p>
        <InviteBox code={inviteCode} />
      </BrutalCard>

      <BrutalCard dark className="mb-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase text-blood">AUTO MATCHED</p>
            <h2 className="section-title-light">{SYSTEM_TEAMMATE.name}</h2>
            <p className="mt-2 text-sm font-bold text-ash">{SYSTEM_TEAMMATE.note}</p>
          </div>
          <Bot className="text-blood" size={42} strokeWidth={3} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="demo-chip">
            <Radio size={16} strokeWidth={3} />
            异步待命
          </div>
          <div className="demo-chip">
            <Users size={16} strokeWidth={3} />
            任一方通关
          </div>
        </div>
        <ActionButton className="mt-4 w-full" onClick={() => navigate('/squad')}>
          进入战队空间
          <ArrowRight size={18} strokeWidth={3} />
        </ActionButton>
      </BrutalCard>

      <BrutalCard>
        <p className="text-xs font-black uppercase text-blood">ASYNC DUO</p>
        <h2 className="section-title-dark">双人规则</h2>
        <div className="mt-3 grid gap-2 text-sm font-bold text-ink">
          <p>1. 第二关：找回呼吸，跟随节奏完成一次吸气和呼气。</p>
          <p>2. 队友不需要同时出现在摄像头前。</p>
          <p>3. 只要任何一方完成本关，战队直接通关。</p>
        </div>
      </BrutalCard>
    </>
  );
}
