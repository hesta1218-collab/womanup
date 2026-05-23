import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ActionButton, BrutalCard, SlashTitle, StatPill } from '../components.jsx';
import {
  SYSTEM_TEAMMATE,
  TARGET_PUNCHES,
  getAllocation,
  getPlayerName,
  getProfile,
  getRankInfo,
  getTraining,
  getWisdomScore,
  isTeamPassed,
  mockDuos,
  mockSingles,
} from '../data.js';

export default function LeaderboardPage() {
  const allocation = getAllocation();
  const training = getTraining();
  const profile = getProfile(allocation);
  const rankInfo = getRankInfo(allocation, training);
  const wisdomScore = getWisdomScore();
  const passed = isTeamPassed(training);
  const duoScore = rankInfo.score + (passed ? 520 : Math.round((training.partnerPunches || 3) * 70));
  const playerName = getPlayerName();

  const singles = [{ name: playerName, score: rankInfo.score, rank: profile.key, hours: `${profile.powerHours}h`, mine: true }, ...mockSingles]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  const duos = [
    {
      name: '红线双刃',
      score: duoScore,
      note: passed
        ? `${training.comboComplete ? playerName : SYSTEM_TEAMMATE.name} 呼吸通关`
        : `${playerName} ${training.punches || 0}/${TARGET_PUNCHES} · 队友待命`,
      mine: true,
    },
    ...mockDuos,
  ]
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  return (
    <>
      <SlashTitle eyebrow="RANK" title="战斗力排行榜" />

      <div className="mb-5 grid grid-cols-3 gap-3">
        <StatPill label="单人分" value={rankInfo.score} />
        <StatPill label="电梯测试" value={wisdomScore.complete ? wisdomScore.score : '--'} />
        <StatPill label="答对" value={`${wisdomScore.correct}/${wisdomScore.total}`} />
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3">
        <StatPill label="双人分" value={duoScore} />
        <StatPill label="档位" value={profile.key} />
      </div>

      <BrutalCard dark className="mb-5">
        <h2 className="section-title-light">单人战斗力榜</h2>
        <p className="mt-1 text-sm font-bold text-ash">基于24小时分配、已完成的电梯测试得分与双人 Women UP！闯关游戏进度生成。</p>
        <div className="mt-4 space-y-2">
          {singles.map((player, index) => (
            <div key={`${player.name}-${index}`} className={`leader-row-dark ${player.mine ? 'leader-row-dark-mine' : ''}`}>
              <span>#{index + 1}</span>
              <strong>{player.name}</strong>
              <em>{player.rank} · {player.hours}</em>
              <b>{player.score}</b>
            </div>
          ))}
        </div>
      </BrutalCard>

      <BrutalCard className="mb-5">
        <h2 className="section-title-dark">最强搭档榜</h2>
        <div className="mt-4 space-y-2">
          {duos.map((team, index) => (
            <div key={team.name} className={`leader-row ${team.mine ? 'leader-row-mine' : ''}`}>
              <span>#{index + 1}</span>
              <strong>{team.name}</strong>
              <em>{team.note}</em>
              <b>{team.score}</b>
            </div>
          ))}
        </div>
      </BrutalCard>

      <Link to="/match">
        <ActionButton className="w-full">
          回到战队
          <ArrowRight size={18} strokeWidth={3} />
        </ActionButton>
      </Link>
    </>
  );
}
