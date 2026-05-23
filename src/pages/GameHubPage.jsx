import { ArrowRight, DoorOpen, LockKeyhole, Wind } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ActionButton, BrutalCard, SlashTitle } from '../components.jsx';

export default function GameHubPage() {
  const navigate = useNavigate();

  return (
    <>
      <SlashTitle eyebrow="WOMAN UP GAME" title="闯关游戏" subtitle="两关制：先判断危险，再找回呼吸。" />

      <div className="grid gap-4">
        <BrutalCard>
          <div className="flex items-start gap-4">
            <DoorOpen className="shrink-0 text-blood" size={42} strokeWidth={3} />
            <div>
              <p className="text-xs font-black uppercase text-blood">STAGE 01</p>
              <h2 className="section-title-dark">第一关：电梯测试</h2>
              <p className="mt-2 text-sm font-bold text-ink">在封闭空间里判断出口、距离和求助路径，训练第一反应。</p>
            </div>
          </div>
          <ActionButton className="mt-4 w-full" onClick={() => navigate('/elevator-test')}>
            进入第一关
            <ArrowRight size={18} strokeWidth={3} />
          </ActionButton>
        </BrutalCard>

        <BrutalCard dark>
          <div className="flex items-start gap-4">
            <Wind className="shrink-0 text-blood" size={42} strokeWidth={3} />
            <div>
              <p className="text-xs font-black uppercase text-blood">STAGE 02</p>
              <h2 className="section-title-light">Women Up！双人闯关游戏 —— 找回呼吸</h2>
              <p className="mt-2 text-sm font-bold text-ash">系统队友异步待命。任意一方完成吸气和呼气，即可通过第二关。</p>
            </div>
          </div>
          <ActionButton className="mt-4 w-full" onClick={() => navigate('/match')}>
            进入第二关
            <ArrowRight size={18} strokeWidth={3} />
          </ActionButton>
        </BrutalCard>

        <BrutalCard>
          <div className="flex items-center gap-4">
            <LockKeyhole className="shrink-0 text-blood" size={42} strokeWidth={3} />
            <div>
              <p className="text-xs font-black uppercase text-blood">NEXT STAGE</p>
              <h2 className="section-title-dark">更多关卡敬请期待</h2>
            </div>
          </div>
        </BrutalCard>
      </div>
    </>
  );
}
