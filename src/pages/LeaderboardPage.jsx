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
  fetchSharedLeaderboardRecords,
  syncSharedLeaderboardRecord,
} from '../data.js';
import { useI18n } from '../i18n.jsx';

export default function LeaderboardPage() {
  const { t } = useI18n();
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
            note: passed
              ? t('leaderboard.teammatePass', { name: SYSTEM_TEAMMATE.name, bonus: DUO_CLEAR_BONUS })
              : t('leaderboard.teammateMissing'),
            mine: true,
          }
        : null,
    [duoScore, hasPlayed, passed, playerName, profile.key, profile.powerHours, rankInfo.score, t],
  );

  useEffect(() => {
    let active = true;

    async function syncRecords() {
      const records = currentRecord
        ? await syncSharedLeaderboardRecord(currentRecord)
        : await fetchSharedLeaderboardRecords();
      if (active) setSavedRecords(records);
    }

    syncRecords();

    return () => {
      active = false;
    };
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
      <SlashTitle eyebrow={t('leaderboard.eyebrow')} title={t('leaderboard.title')} />

      <div className="mb-5 grid grid-cols-3 gap-3">
        <StatPill label={t('leaderboard.singleScore')} value={rankInfo.score} />
        <StatPill label={t('leaderboard.elevator')} value={wisdomScore.complete ? wisdomScore.score : '--'} />
        <StatPill label={t('leaderboard.correct')} value={`${wisdomScore.correct}/${wisdomScore.total}`} />
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3">
        <StatPill label={t('leaderboard.duoScore')} value={duoScore} />
        <StatPill label={t('leaderboard.rank')} value={profile.key} />
      </div>

      <BrutalCard dark className="mb-5">
        <h2 className="section-title-light">{t('leaderboard.singleBoard')}</h2>
        <p className="mt-1 text-sm font-bold text-ash">{t('leaderboard.singleBody')}</p>
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
            <p className="leaderboard-empty">{t('leaderboard.singleEmpty')}</p>
          )}
        </div>
      </BrutalCard>

      <BrutalCard className="mb-5">
        <h2 className="section-title-dark">{t('leaderboard.duoBoard')}</h2>
        <p className="mt-1 text-sm font-bold text-ink">{t('leaderboard.duoBody', { bonus: DUO_CLEAR_BONUS })}</p>
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
            <p className="leaderboard-empty leaderboard-empty-light">{t('leaderboard.duoEmpty')}</p>
          )}
        </div>
      </BrutalCard>

      <Link to="/match">
        <ActionButton className="w-full">
          {t('leaderboard.backSquad')}
          <ArrowRight size={18} strokeWidth={3} />
        </ActionButton>
      </Link>
    </>
  );
}
