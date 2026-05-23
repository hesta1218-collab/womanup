import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ActionButton, BrutalCard, SlashTitle, StatPill } from '../components.jsx';
import {
  DUO_CLEAR_BONUS,
  SYSTEM_TEAMMATE,
  getAllocation,
  getDuoScore,
  getLeaderboardRecords,
  getPlayerName,
  getProfile,
  getRankInfo,
  getTraining,
  getWisdomScore,
  hasSavedAllocation,
  isTeamPassed,
  saveLeaderboardRecord,
} from '../data.js';

export default function LeaderboardPage() {
  const allocation = getAllocation();
  const training = getTraining();
  const [savedRecords, setSavedRecords] = useState(() => getLeaderboardRecords());
  const profile = getProfile(allocation);
  const rankInfo = getRankInfo(allocation, training, savedRecords);
  const wisdomScore = getWisdomScore();
  const passed = isTeamPassed(training);
  const duoScore = getDuoScore(rankInfo.score, training);
  const playerName = getPlayerName();
  const hasPlayed = hasSavedAllocation();

  const currentRecord = useMemo(
    () =>
      hasPlayed
        ? {
            name: playerName,
            score: rankInfo.score,
            rank: profile.key,
            hours: `${profile.powerHours}h`,
            duoScore,
            duoComplete: passed,
            note: passed ? `${SYSTEM_TEAMMATE.name} 系统队友通关 · +${DUO_CLEAR_BONUS}` : '第二关未通关',
            mine: true,
          }
        : null,
    [duoScore, hasPlayed, passed, playerName, profile.key, profile.powerHours, rankInfo.score],
  );

  useEffect(() => {
    if (!currentRecord) return;
    setSavedRecords(saveLeaderboardRecord(currentRecord));
  }, [currentRecord]);

  const singles = [...savedRecords]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  const duos = [...savedRecords]
    .filter((record) => record.duoComplete)
    .sort((a, b) => b.duoScore - a.duoScore)
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
        <p className="mt-1 text-sm font-bold text-ash">现场观众完成测试后会进入这里。当前版本不再混入网站自带假数据。</p>
        <div className="mt-4 space-y-2">
          {singles.length ? (
            singles.map((player, index) => (
              <div key={`${player.name}-${index}`} className={`leader-row-dark ${player.name === playerName ? 'leader-row-dark-mine' : ''}`}>
                <span>#{index + 1}</span>
                <strong>{player.name}</strong>
                <em>{player.rank} · {player.hours}</em>
                <b>{player.score}</b>
              </div>
            ))
          ) : (
            <p className="leaderboard-empty">还没有现场成绩。完成 24 小时测试后，第一个名字会出现在这里。</p>
          )}
        </div>
      </BrutalCard>

      <BrutalCard className="mb-5">
        <h2 className="section-title-dark">最强搭档榜</h2>
        <p className="mt-1 text-sm font-bold text-ink">Demo 版使用系统队友：完成第二关即获得双人满分加成 {DUO_CLEAR_BONUS}。</p>
        <div className="mt-4 space-y-2">
          {duos.length ? (
            duos.map((team, index) => (
              <div key={`${team.name}-${index}`} className={`leader-row ${team.name === playerName ? 'leader-row-mine' : ''}`}>
                <span>#{index + 1}</span>
                <strong>{team.name}</strong>
                <em>{team.note}</em>
                <b>{team.duoScore}</b>
              </div>
            ))
          ) : (
            <p className="leaderboard-empty leaderboard-empty-light">还没有通关第二关的队伍。完成“找回呼吸”后会出现在这里。</p>
          )}
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
