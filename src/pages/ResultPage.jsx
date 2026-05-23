import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Brain, RefreshCcw, Swords } from 'lucide-react';
import { ActionButton, BrutalCard, RadarChart, ShareTools, SlashTitle, StatPill } from '../components.jsx';
import {
  getAllocation,
  getPlayerName,
  getProfile,
  getRankInfo,
  getWisdomScore,
  historicalWomenQuotes,
  trajectoryDetails,
  mockSingles,
} from '../data.js';

export default function ResultPage() {
  const navigate = useNavigate();
  const allocation = getAllocation();
  const profile = useMemo(() => getProfile(allocation), [allocation]);
  const rankInfo = getRankInfo(allocation);
  const wisdomScore = getWisdomScore();
  const trajectory = trajectoryDetails[profile.key];
  const playerName = getPlayerName();
  const quote = useMemo(() => historicalWomenQuotes[Math.floor(Math.random() * historicalWomenQuotes.length)], []);
  const radarStats = [
    ['攻击', profile.radar[0]],
    ['防御', profile.radar[1]],
    ['敏捷', profile.radar[2]],
    ['意志', profile.radar[3]],
    ['策略', profile.radar[4]],
  ];

  return (
    <>
      <SlashTitle eyebrow="RESULT" title={`${profile.key}档 · ${profile.title}`} subtitle={profile.punchline} />

      <section id="result-card" className="fight-card mb-5">
        <div className="fight-card-collage">
          <div className="fight-card-logo-stack">
            <img src="/assets/wp-logo.jpg" alt="Woman Up logo" />
            <span>WOMAN UP!</span>
          </div>
          <div className="fight-card-nameplate">
            <p>FIGHTER CARD</p>
            <h2>{playerName}</h2>
            <strong>OFFICIAL COMBAT FLASH CARD</strong>
          </div>
          <span>{profile.key}档</span>
        </div>

        <div className="fight-card-main">
          <div className="fighter-stage" aria-hidden="true">
            <FighterSilhouette />
            <div className="fighter-shadow fighter-shadow-one" />
            <div className="fighter-shadow fighter-shadow-two" />
          </div>

          <div className="fight-card-info">
            <p className="fight-card-kicker">TOTAL POWER</p>
            <div className="fight-card-score">
              <span>COMBAT SCORE</span>
              <strong>{rankInfo.score}</strong>
              <em>第 {rankInfo.rank} 位 · {profile.title}</em>
            </div>
            <div className="fight-card-tags">
              <span>{profile.art}</span>
              <span>{profile.powerHours}h 战斗+知识</span>
              <span>{wisdomScore.complete ? `${wisdomScore.score} 电梯测试` : '电梯测试待完成'}</span>
            </div>
          </div>
        </div>

        <div className="fight-card-board">
          <RadarChart values={profile.radar} score={rankInfo.score} />
          <div className="fight-card-side">
            <div className="fight-card-stats">
              {radarStats.map(([label, value]) => (
                <div key={label} className="fight-stat-row">
                  <span>{label}</span>
                  <b>{value}</b>
                  <i style={{ width: `${value}%` }} />
                </div>
              ))}
            </div>
            <div className="fight-card-quote">
              <p>「{quote.quote}」</p>
              <strong>{quote.name}</strong>
              <span>{quote.role}</span>
            </div>
          </div>
        </div>

        <div className="fight-card-footer">
          <span>RANK #{rankInfo.rank}</span>
          <span>{profile.reason}</span>
          <span>SHARE READY</span>
        </div>
      </section>

      <div className="mb-5 grid grid-cols-3 gap-3">
        <StatPill label="战斗+知识" value={`${profile.powerHours}h`} />
        <StatPill label="电梯测试" value={wisdomScore.complete ? wisdomScore.score : '--'} />
        <StatPill label="能量原石" value={profile.key} />
      </div>

      <BrutalCard className="mb-5">
        <div>
          <p className="text-sm font-black text-blood">推荐的格斗术</p>
          <h2 className="font-display text-6xl uppercase leading-none text-void sm:text-7xl">{profile.art}</h2>
          <p className="mt-3 border-l-8 border-blood pl-3 text-lg font-black text-void">{profile.reason}</p>
          <p className="mt-4 bg-void p-3 font-black text-paper">「{profile.quote}」</p>
        </div>
      </BrutalCard>

      <div>
        <BrutalCard dark className="mb-5">
          <h2 className="section-title-light">1 / 2 / 5 / 10 年轨迹</h2>
          <div className="mt-4 space-y-3">
            {trajectory.map((scene) => (
              <div key={scene.year} className="timeline-row">
                <span>{scene.year.replace('后', '')}</span>
                <p>
                  <strong className="block text-paper">{scene.headline}</strong>
                  <small className="mt-1 block text-ash">{scene.body}</small>
                </p>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => navigate('/trajectory')} className="mt-4 border-4 border-paper px-4 py-3 font-black text-paper">
            重播未来动画
          </button>
        </BrutalCard>

        <BrutalCard className="mb-5">
          <p className="text-xs font-black uppercase text-blood">PRIVATE ORDER</p>
          <h2 className="section-title-dark">专属建议</h2>
          <p className="mt-2 text-xl font-black text-void">{profile.advice}</p>
        </BrutalCard>
      </div>

      <BrutalCard className="mb-5">
        <h2 className="section-title-dark">女性综合战斗力排名榜</h2>
        <p className="mt-1 text-sm font-bold text-ink">这是根据你的 24 小时时间分配和已完成关卡生成的当前排名。昵称会与入口页保持一致。</p>
        <div className="mt-4 bg-void p-4 text-paper">
          <p className="font-display text-3xl uppercase text-blood">{rankInfo.line}</p>
          <p className="mt-1 text-sm font-bold text-ash">前方一人差距 {rankInfo.gap} 分。你可以重新分配 24 小时，看看排名如何变化。</p>
        </div>
        <div className="mt-4 space-y-2">
          {[{ name: playerName, score: rankInfo.score, rank: profile.key, hours: `${profile.powerHours}h`, mine: true }, ...mockSingles]
            .sort((a, b) => b.score - a.score)
            .slice(0, 10)
            .map((player, index) => (
              <div key={`${player.name}-${index}`} className={`leader-row ${player.mine ? 'leader-row-mine' : ''}`}>
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
        <h2 className="section-title-light">战斗力女性历史名人语录</h2>
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
        <h2 className="font-display text-4xl uppercase leading-none text-paper">继续学习</h2>
        <FeatureLink
          icon={Swords}
          title="格斗技学习"
          body="认识不同格斗术的训练目标和适用场景。"
          onClick={() => navigate('/combat')}
        />
        <FeatureLink
          icon={BookOpen}
          title="生存技能学习"
          body="学习情境感知、边界表达、撤离和数字求援。"
          onClick={() => navigate('/survival')}
        />
        <FeatureLink
          icon={Brain}
          title="强女的故事"
          body="从历史人物里提取判断力、行动力和边界感。"
          onClick={() => navigate('/women-stories')}
        />
      </section>

      <div className="mt-5 grid gap-3">
        <ShareTools targetId="result-card" />
        <ActionButton onClick={() => navigate('/game')}>
          进入闯关游戏
          <ArrowRight size={18} strokeWidth={3} />
        </ActionButton>
        <Link to="/test" className="inline-flex items-center justify-center gap-2 border-4 border-paper px-4 py-3 font-black text-paper">
          <RefreshCcw size={18} strokeWidth={3} />
          重新分配 24 小时
        </Link>
      </div>
    </>
  );
}

function FighterSilhouette() {
  return (
    <svg className="fighter-silhouette" viewBox="0 0 260 360" role="img" aria-label="女性战斗者剪影">
      <path d="M126 16c26 0 43 18 43 42 0 27-17 45-43 45-25 0-42-18-42-45 0-24 17-42 42-42Z" />
      <path d="M77 120c18-18 80-21 102 0 11 11 14 34 7 58l-12 44 44 79-36 24-50-72-45 86-43-14 37-101-14-49c-6-22-3-43 10-55Z" />
      <path d="M72 131 23 78 7 111l55 75 34-22-24-33ZM185 131l54-43 13 38-61 61-31-25 25-31Z" />
      <path d="M111 248 80 349H31l48-126 32 25ZM151 248l72 83-34 30-76-87 38-26Z" />
      <path d="M92 107c16 13 56 13 72 0l-14 37h-44l-14-37Z" className="fighter-cut" />
    </svg>
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
