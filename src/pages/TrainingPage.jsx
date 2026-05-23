import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Camera, RotateCcw, Wind, Zap } from 'lucide-react';
import { ActionButton, BrutalCard, CameraBadge, SlashTitle, StatPill } from '../components.jsx';
import { SYSTEM_TEAMMATE, TARGET_PUNCHES, defaultTraining, getPlayerName, getTraining, saveTraining } from '../data.js';

const BREATH_SECONDS = 8;
const BREATH_PHASES = [
  { label: '吸气', cue: '鼻吸，肩膀放低，肋骨向外打开', duration: 4 },
  { label: '呼气', cue: '慢慢吐气，下颌放松，把恐惧吐出去', duration: 4 },
];

export default function TrainingPage() {
  const navigate = useNavigate();
  const savedRef = useRef(getTraining());
  const playerName = getPlayerName();
  const [seconds, setSeconds] = useState(BREATH_SECONDS);
  const [running, setRunning] = useState(false);
  const [camera, setCamera] = useState(false);
  const [completed, setCompleted] = useState(savedRef.current.completed || false);
  const [comboComplete, setComboComplete] = useState(savedRef.current.comboComplete || false);
  const [partnerComplete, setPartnerComplete] = useState(savedRef.current.partnerComplete || false);
  const [status, setStatus] = useState('打开摄像头，跟随节奏完成第二关。');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const elapsed = BREATH_SECONDS - seconds;
  const phase = elapsed < 4 ? BREATH_PHASES[0] : BREATH_PHASES[1];
  const breathProgress = Math.min(100, Math.round((elapsed / BREATH_SECONDS) * 100));
  const passed = comboComplete || partnerComplete;

  useEffect(() => {
    if (!running || seconds <= 0 || passed) return undefined;
    const timer = setInterval(() => {
      setSeconds((current) => current - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [running, seconds, passed]);

  useEffect(() => {
    if (seconds === 0 && running && !passed) {
      completeBreath();
    }
  }, [seconds, running, passed]);

  useEffect(() => {
    saveTraining({
      ...defaultTraining,
      punches: comboComplete ? TARGET_PUNCHES : 0,
      partnerPunches: partnerComplete ? TARGET_PUNCHES : 3,
      completed,
      comboComplete,
      partnerComplete,
      passedBy: comboComplete ? playerName : partnerComplete ? SYSTEM_TEAMMATE.name : '',
      camera,
      breathComplete: comboComplete,
    });
  }, [completed, comboComplete, partnerComplete, camera]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  async function enableCamera() {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCamera(false);
      setStatus('当前浏览器不支持摄像头。仍然可以完成呼吸节奏关。');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 480 }, height: { ideal: 360 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCamera(true);
      setStatus('摄像头已开启。画面只做陪伴预览，通关靠呼吸节奏。');
    } catch {
      setCamera(false);
      setStatus('摄像头被拒绝。没关系，跟随呼吸节奏也能通关。');
    }
  }

  function startBreath() {
    setSeconds(BREATH_SECONDS);
    setRunning(true);
    setCompleted(false);
    setComboComplete(false);
    setPartnerComplete(false);
    setStatus('第二关开始。吸气 4 秒，呼气 4 秒。');
  }

  function completeBreath() {
    setRunning(false);
    setCompleted(true);
    setComboComplete(true);
    setStatus('第二关完成。你稳住了，战队通关。');
  }

  function systemPass() {
    setPartnerComplete(true);
    setCompleted(true);
    setRunning(false);
    setStatus(`${SYSTEM_TEAMMATE.name} 已异步完成第二关，战队通关。`);
  }

  function reset() {
    setSeconds(BREATH_SECONDS);
    setRunning(false);
    setCompleted(false);
    setComboComplete(false);
    setPartnerComplete(false);
    setStatus('已重置。打开摄像头，跟随节奏完成第二关。');
  }

  return (
    <>
      <SlashTitle eyebrow="STAGE 02" title="Women Up！双人闯关游戏 —— 找回呼吸" subtitle="完成一次吸气和呼气，任意一方完成即通关。" />

      <div className="mb-5 grid grid-cols-3 gap-3">
        <StatPill label="倒计时" value={`${seconds}s`} />
        <StatPill label="阶段" value={passed ? '完成' : phase.label} />
        <StatPill label="状态" value={passed ? 'PASS' : running ? 'LIVE' : 'READY'} />
      </div>

      <BrutalCard dark className="mb-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <CameraBadge active={camera} />
          <button
            type="button"
            onClick={enableCamera}
            className="icon-cut-button"
            aria-label="开启摄像头"
            title="开启摄像头"
          >
            <Camera size={20} strokeWidth={3} />
          </button>
        </div>

        <div className="breath-layout">
          <div className="mini-camera">
            <video ref={videoRef} autoPlay playsInline muted className={`h-full w-full object-cover ${camera ? 'opacity-100' : 'opacity-0'}`} />
            {!camera ? <span>CAMERA</span> : null}
          </div>

          <div className={`breath-orb ${running ? (phase.label === '吸气' ? 'breath-in' : 'breath-out') : ''} ${passed ? 'breath-clear' : ''}`}>
            <Wind size={42} strokeWidth={3} />
            <strong>{passed ? 'CLEAR' : phase.label}</strong>
            <span>{passed ? '战队通关' : phase.cue}</span>
          </div>
        </div>

        <div className="mt-5 h-6 border-4 border-paper bg-void">
          <div className="h-full bg-blood transition-all duration-500" style={{ width: `${passed ? 100 : breathProgress}%` }} />
        </div>
        <p className="mt-4 border-l-4 border-blood pl-3 text-sm font-black text-ash">{status}</p>
      </BrutalCard>

      <button type="button" onClick={startBreath} disabled={running || passed} className="punch-button breath-button">
        <Wind size={34} strokeWidth={3} />
        <span>{running ? phase.label : 'START / 第二关'}</span>
        <b>{passed ? 'OK' : seconds}</b>
      </button>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <ActionButton variant="black" onClick={reset}>
          <RotateCcw size={18} strokeWidth={3} />
          重来
        </ActionButton>
        <ActionButton onClick={systemPass}>
          系统队友通关
          <Zap size={18} strokeWidth={3} />
        </ActionButton>
      </div>

      <BrutalCard className="mt-5">
        <h2 className="section-title-dark">战队判定</h2>
        <p className="mt-2 text-lg font-black text-void">
          {passed
            ? `${comboComplete ? playerName : SYSTEM_TEAMMATE.name} 完成第二关，战队已通关。`
            : '任意一方完成一次吸气和呼气即可通过第二关。队友不需要同时出现在摄像头前。'}
        </p>
        <p className="mt-2 text-sm font-bold text-ink">这一关是低负担自我照料任务，适合独处、轻症不适、睡前或低能量状态下完成。</p>
      </BrutalCard>

      <ActionButton className="mt-5 w-full" onClick={() => navigate('/leaderboard')} disabled={!passed && !completed}>
        看榜
        <ArrowRight size={18} strokeWidth={3} />
      </ActionButton>
    </>
  );
}
