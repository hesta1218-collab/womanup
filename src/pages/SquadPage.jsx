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

export default function SquadPage() {
  const navigate = useNavigate();
  const allocation = getAllocation();
  const profile = getProfile(allocation);
  const training = getTraining();
  const rankInfo = getRankInfo(allocation, training);
  const passed = isTeamPassed(training);
  const duoScore = getDuoScore(rankInfo.score, training);

  return (
    <>
      <SlashTitle eyebrow="STAGE 02" title="战队空间" subtitle="Women Up！双人闯关游戏 —— 找回呼吸。你们不必同时在线，任意一方完成本关就过关。" />

      <BrutalCard className="mb-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase text-blood">TEAM NAME</p>
            <h2 className="font-display text-5xl uppercase text-void">红线双刃</h2>
          </div>
          <Shield size={44} strokeWidth={3} className="text-blood" />
        </div>
        <p className="mt-3 border-l-8 border-blood pl-3 text-lg font-black text-void">
          邀请码 {getInvite()} · 队友 {SYSTEM_TEAMMATE.name} · 你是 {profile.key}档 {profile.title}
        </p>
      </BrutalCard>

      <div className="mb-5 grid grid-cols-3 gap-3">
        <StatPill label="你的呼吸" value={training.comboComplete ? '完成' : '待完成'} />
        <StatPill label="队友状态" value={training.partnerComplete ? 'PASS' : 'READY'} />
        <StatPill label="战队" value={passed ? 'CLEAR' : 'LIVE'} />
      </div>

      <BrutalCard dark className="mb-5">
        <div className="flex items-center gap-3">
          <Swords className="text-blood" size={30} strokeWidth={3} />
          <h2 className="section-title-light">当前关卡</h2>
        </div>
        <p className="mt-2 font-display text-4xl uppercase leading-none text-paper">第二关：找回呼吸</p>
        <p className="mt-3 text-sm font-bold text-ash">吸气 4 秒，呼气 4 秒。任意一方完成，就通过 Women Up！双人闯关游戏第二关。</p>
        <ActionButton className="mt-4 w-full" onClick={() => navigate('/training')}>
          进入第二关
          <ArrowRight size={18} strokeWidth={3} />
        </ActionButton>
      </BrutalCard>

      <BrutalCard>
        <div className="flex items-center gap-3">
          <Bot className="text-blood" size={30} strokeWidth={3} />
          <h2 className="section-title-dark">系统队友</h2>
        </div>
        <p className="mt-2 text-sm font-bold text-ink">
          {SYSTEM_TEAMMATE.name} 已进入异步待命。Demo 里可一键触发队友通关，也可由你本人完成第二关。
        </p>
        <div className="mt-4 grid gap-3">
          <Progress label="你" value={Math.min(training.punches || 0, TARGET_PUNCHES)} max={TARGET_PUNCHES} />
          <Progress label={SYSTEM_TEAMMATE.name} value={training.partnerComplete ? TARGET_PUNCHES : training.partnerPunches || 3} max={TARGET_PUNCHES} />
          <Progress label="通关判定" value={passed ? 1 : 0} max={1} />
        </div>
        <p className="mt-4 bg-void p-3 font-black text-paper">
          当前双人分：{passed ? duoScore : '未通关'} · Demo 版完成即 +{DUO_CLEAR_BONUS}
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
