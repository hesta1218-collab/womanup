import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Brain, RefreshCcw, Swords } from 'lucide-react';
import { ActionButton, BrutalCard, RadarChart, ShareTools, SlashTitle, StatPill } from '../components.jsx';
import {
  getAllocation,
  getDuoScore,
  getLeaderboardRecords,
  getPlayerName,
  getProfile,
  getRankInfo,
  getTraining,
  getWisdomScore,
  historicalWomenQuotes,
  isTeamPassed,
  trajectoryDetails,
  syncSharedLeaderboardRecord,
} from '../data.js';
import { useI18n } from '../i18n.jsx';

export default function ResultPage() {
  const navigate = useNavigate();
  const { get, t } = useI18n();
  const allocation = getAllocation();
  const training = getTraining();
  const [leaderboardRecords, setLeaderboardRecords] = useState(() => getLeaderboardRecords());
  const profile = useMemo(() => getProfile(allocation), [allocation]);
  const rankInfo = getRankInfo(allocation, training, leaderboardRecords);
  const wisdomScore = getWisdomScore();
  const trajectory = trajectoryDetails[profile.key];
  const playerName = getPlayerName();
  const duoComplete = isTeamPassed(training);
  const duoScore = getDuoScore(rankInfo.score, training);
  const quote = useMemo(() => historicalWomenQuotes[Math.floor(Math.random() * historicalWomenQuotes.length)], []);
  const currentRecord = useMemo(
    () => ({
      name: playerName,
      score: rankInfo.score,
      rank: profile.key,
      hours: `${profile.powerHours}h`,
      duoScore,
      duoComplete,
      note: duoComplete ? t('result.duoPassed') : t('result.duoNotPassed'),
    }),
    [duoComplete, duoScore, playerName, profile.key, profile.powerHours, rankInfo.score, t],
  );
  const radarLabels = get('components.radar', ['攻击', '防御', '敏捷', '意志', '策略']);
  const radarStats = radarLabels.map((label, index) => [label, profile.radar[index]]);
  const resultLeaderboard = leaderboardRecords
    .filter((record) => record.name !== playerName)
    .concat(currentRecord)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  useEffect(() => {
    let active = true;

    syncSharedLeaderboardRecord(currentRecord).then((records) => {
      if (active) setLeaderboardRecords(records);
    });

    return () => {
      active = false;
    };
  }, [currentRecord]);

  return (
    <>
      <SlashTitle eyebrow={t('result.eyebrow')} title={`${profile.key} · ${profile.title}`} subtitle={profile.punchline} />

      <section id="result-card" className="fight-card mb-5">
        <div className="ufc-card-shell">
          <div className="ufc-main-card">
            <div className="ufc-grade-row">
              <div>
                <span>WOMAN UP COMBAT CARD</span>
                <strong>{playerName}</strong>
              </div>
              <div>
                <span>{t('result.combatPower')}</span>
                <b>{rankInfo.score}</b>
              </div>
              <div>
                <span>{t('result.rank')}</span>
                <b>{profile.key}</b>
              </div>
            </div>

            <div className="ufc-art-frame">
              <img className="ufc-mini-logo" src="/assets/wp-logo.jpg" alt="Woman Up logo" />
              <div className="ufc-art-bg" />
              <div className="ufc-logo-fighter">
                <img src="/assets/wp-logo.jpg" alt="Woman Up 女性格斗剪影" />
                <span>{profile.art}</span>
              </div>
              <div className="ufc-corner-brand">UFC</div>
              <div className="ufc-name-strip">
                <span>{profile.art}</span>
                <strong>{playerName}</strong>
                <em>{profile.title}</em>
              </div>
            </div>

            <div className="ufc-card-footer">
              <span>RANK #{rankInfo.rank}</span>
              <span>{profile.reason}</span>
              <span>{wisdomScore.complete ? `${wisdomScore.score} ${t('result.elevator')}` : t('result.elevatorPending')}</span>
            </div>
          </div>

          <div className="ufc-side-panel">
            <div className="ufc-side-title">
              <span>FIVE DIMENSIONS</span>
              <strong>{t('result.five')}</strong>
            </div>

            <div className="ufc-radar-box">
              <RadarChart values={profile.radar} score={rankInfo.score} />
            </div>

            <div className="ufc-stat-grid">
              {radarStats.map(([label, value]) => (
                <div key={label} className="ufc-stat-cell">
                  <span>{label}</span>
                  <b>{value}</b>
                </div>
              ))}
            </div>
          </div>

          <div className="ufc-signature">
            <p>「{quote.quote}」</p>
            <strong>{quote.name}</strong>
          </div>
        </div>
      </section>

      <div className="mb-5 grid grid-cols-3 gap-3">
        <StatPill label={t('result.combatKnowledge')} value={`${profile.powerHours}h`} />
        <StatPill label={t('result.elevator')} value={wisdomScore.complete ? wisdomScore.score : '--'} />
        <StatPill label={t('result.energyStone')} value={profile.key} />
      </div>

      <BrutalCard className="match-style-collage mb-5">
        <p className="match-style-label">{t('result.recommended')}</p>
        <h2>{profile.art}</h2>
        <p className="match-style-reason">{profile.reason}</p>
        <p className="match-style-quote">「{profile.quote}」</p>
      </BrutalCard>

      <div>
        <BrutalCard dark className="mb-5">
          <h2 className="section-title-light">{t('result.timeline')}</h2>
          <div className="mt-4 space-y-3">
            {trajectory.map((scene) => (
              <div key={scene.year} className="timeline-row">
                <span>{scene.year.replace('后', '').replace('後', '')}</span>
                <p>
                  <strong className="block text-paper">{scene.headline}</strong>
                  <small className="mt-1 block text-ash">{scene.body}</small>
                </p>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => navigate('/trajectory')} className="mt-4 border-4 border-paper px-4 py-3 font-black text-paper">
            {t('result.replayFuture')}
          </button>
        </BrutalCard>

        <BrutalCard className="mb-5">
          <p className="text-xs font-black uppercase text-blood">{t('result.privateOrder')}</p>
          <h2 className="section-title-dark">{t('result.advice')}</h2>
          <p className="mt-2 text-xl font-black text-void">{profile.advice}</p>
        </BrutalCard>
      </div>

      <BrutalCard className="mb-5">
        <h2 className="section-title-dark">{t('result.rankingTitle')}</h2>
        <p className="mt-1 text-sm font-bold text-ink">{t('result.rankingBody')}</p>
        <div className="mt-4 bg-void p-4 text-paper">
          <p className="font-display text-3xl uppercase text-blood">{rankInfo.line}</p>
          <p className="mt-1 text-sm font-bold text-ash">{t('result.rankingHint')}</p>
        </div>
        <div className="mt-4 space-y-2">
          {resultLeaderboard.map((player, index) => (
              <div key={`${player.name}-${index}`} className={`leader-row ${player.name === playerName ? 'leader-row-mine' : ''}`}>
                <span>#{index + 1}</span>
                <strong>{player.name}</strong>
                <em>{player.rank}</em>
                <b>{player.score}</b>
              </div>
            ))}
        </div>
      </BrutalCard>

      <BrutalCard dark className="mb-5">
        <p className="text-xs font-black uppercase text-blood">WOMEN WHO FOUGHT</p>
        <h2 className="section-title-light">{t('result.quotesTitle')}</h2>
        <div className="mt-4 space-y-3">
          {historicalWomenQuotes.map((item) => (
            <figure key={item.name} className="quote-card">
              <blockquote>「{item.quote}」</blockquote>
              <figcaption>
                <strong>{item.name}</strong>
                <span>{item.role} · {item.source}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </BrutalCard>

      <section className="mb-5 grid gap-3">
        <h2 className="font-display text-4xl uppercase leading-none text-paper">{t('result.continueLearning')}</h2>
        <FeatureLink
          icon={Swords}
          title={t('result.combatGuide')}
          body={t('result.combatGuideBody')}
          onClick={() => navigate('/combat')}
        />
        <FeatureLink
          icon={BookOpen}
          title={t('result.survivalGuide')}
          body={t('result.survivalGuideBody')}
          onClick={() => navigate('/survival')}
        />
        <FeatureLink
          icon={Brain}
          title={t('result.stories')}
          body={t('result.storiesBody')}
          onClick={() => navigate('/women-stories')}
        />
      </section>

      <div className="mt-5 grid gap-3">
        <ShareTools targetId="result-card" />
        <ActionButton onClick={() => navigate('/game')}>
          {t('result.enterGame')}
          <ArrowRight size={18} strokeWidth={3} />
        </ActionButton>
        <Link to="/test" className="inline-flex items-center justify-center gap-2 border-4 border-paper px-4 py-3 font-black text-paper">
          <RefreshCcw size={18} strokeWidth={3} />
          {t('result.restartTest')}
        </Link>
      </div>
    </>
  );
}

function FeatureLink({ icon: Icon, title, body, onClick }) {
  return (
    <BrutalCard>
      <button type="button" onClick={onClick} className="flex w-full items-center justify-between gap-4 text-left">
        <Icon className="shrink-0 text-blood" size={34} strokeWidth={3} />
        <div>
          <h3 className="section-title-dark">{title}</h3>
          <p className="mt-1 text-sm font-bold text-ink">{body}</p>
        </div>
        <ArrowRight className="shrink-0 text-blood" size={24} strokeWidth={3} />
      </button>
    </BrutalCard>
  );
}
