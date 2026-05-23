import { ArrowRight, CheckCircle2, ClipboardList, Map, Siren } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ActionButton, BrutalCard, SlashTitle } from '../components.jsx';
import { survivalDrills, survivalProtocols, survivalScenarios, survivalSkillCards } from '../data.js';

export default function SurvivalGuidePage() {
  const navigate = useNavigate();

  return (
    <>
      <SlashTitle eyebrow="SURVIVAL FILE" title="生存技能学习" subtitle="先识别风险，再拉开距离，最后补上求助和证据链。" />

      <BrutalCard dark className="mb-5">
        <p className="text-xs font-black uppercase text-blood">CORE RULE</p>
        <h2 className="section-title-light">安全优先级</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Principle label="1" title="先离开" body="离开封闭空间、死角和人少处。能走就走，能进店就进店。" />
          <Principle label="2" title="让人看见" body="声音、通话、录像、店员、保安、摄像头，都是外部支点。" />
          <Principle label="3" title="留下记录" body="时间地点、威胁语言、伤情、证人和聊天记录，事后要能串成线。" />
        </div>
      </BrutalCard>

      <section className="mb-5">
        <div className="mb-3 flex items-center gap-2 text-paper">
          <ClipboardList className="text-blood" size={24} strokeWidth={3} />
          <h2 className="font-display text-4xl uppercase leading-none">四个生存协议</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {survivalProtocols.map((item, index) => (
            <BrutalCard key={item.title}>
              <p className="text-xs font-black uppercase text-blood">PROTOCOL 0{index + 1}</p>
              <h3 className="section-title-dark">{item.title}</h3>
              <p className="mt-2 text-sm font-black text-ink">{item.subtitle}</p>
              <div className="mt-3 grid gap-2">
                {item.steps.map((step) => (
                  <div key={step} className="survival-check">
                    <CheckCircle2 size={16} strokeWidth={3} />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </BrutalCard>
          ))}
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        {survivalSkillCards.map((card) => (
          <BrutalCard key={card.name}>
            <p className="text-xs font-black uppercase text-blood">SURVIVAL FILE</p>
            <h2 className="font-display text-4xl uppercase leading-none text-void">{card.name}</h2>
            <p className="mt-3 border-l-8 border-blood pl-3 text-lg font-black text-void">{card.line}</p>
            <p className="mt-3 border-t-2 border-void pt-2 text-sm font-bold text-ink">适用：{card.scene}</p>
            <p className="mt-3 bg-void p-3 text-sm font-black text-paper">重点：{card.focus}</p>
            <div className="mt-3 grid gap-2">
              {card.actions.map((action) => (
                <div key={action} className="survival-check survival-check-dark">
                  <CheckCircle2 size={16} strokeWidth={3} />
                  <span>{action}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 border-4 border-void bg-blood p-2 text-sm font-black text-paper">避坑：{card.avoid}</p>
          </BrutalCard>
        ))}
      </div>

      <section className="my-5">
        <div className="mb-3 flex items-center gap-2 text-paper">
          <Map className="text-blood" size={24} strokeWidth={3} />
          <h2 className="font-display text-4xl uppercase leading-none">场景拆解</h2>
        </div>
        <div className="grid gap-3">
          {survivalScenarios.map((item) => (
            <BrutalCard key={item.scene} dark>
              <p className="text-xs font-black uppercase text-blood">SCENE</p>
              <h3 className="section-title-light">{item.scene}</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <ScenarioBlock title="警报" body={item.cue} />
                <ScenarioBlock title="动作" body={item.move} />
                <ScenarioBlock title="话术" body={item.line} hot />
              </div>
            </BrutalCard>
          ))}
        </div>
      </section>

      <BrutalCard className="mb-5">
        <div className="flex items-start gap-3">
          <Siren className="mt-1 shrink-0 text-blood" size={30} strokeWidth={3} />
          <div>
            <p className="text-xs font-black uppercase text-blood">AFTERCARE</p>
            <h2 className="section-title-dark">事后不要只靠情绪硬扛</h2>
            <p className="mt-2 text-sm font-bold text-ink">
              两份笔记都强调：安全离开后要补记录、补求助、补身体检查。把“我感觉不对”整理成时间线，才能保护之后的自己。
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {survivalDrills.map((item) => (
            <div key={item.day} className="survival-drill">
              <strong>{item.day}</strong>
              <span>{item.task}</span>
            </div>
          ))}
        </div>
      </BrutalCard>

      <ActionButton className="mt-5 w-full" onClick={() => navigate('/elevator-test')}>
        下一页：电梯测试
        <ArrowRight size={18} strokeWidth={3} />
      </ActionButton>
    </>
  );
}

function Principle({ label, title, body }) {
  return (
    <div className="survival-principle">
      <strong>{label}</strong>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}

function ScenarioBlock({ title, body, hot = false }) {
  return (
    <div className={`scenario-block ${hot ? 'scenario-block-hot' : ''}`}>
      <strong>{title}</strong>
      <p>{body}</p>
    </div>
  );
}
