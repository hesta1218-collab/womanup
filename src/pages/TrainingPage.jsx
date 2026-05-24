import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Camera, RotateCcw, Wind, Zap } from 'lucide-react';
import { ActionButton, BrutalCard, CameraBadge, SlashTitle, StatPill } from '../components.jsx';
import { SYSTEM_TEAMMATE, TARGET_PUNCHES, defaultTraining, getPlayerName, getTraining, saveTraining } from '../data.js';
import { useI18n } from '../i18n.jsx';

const BREATH_SECONDS = 8;

export default function TrainingPage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const savedRef = useRef(getTraining());
  const playerName = getPlayerName();
  const breathPhases = [
    { label: t('training.inhale'), cue: t('training.inhaleCue'), duration: 4, type: 'inhale' },
    { label: t('training.exhale'), cue: t('training.exhaleCue'), duration: 4, type: 'exhale' },
  ];
  const [seconds, setSeconds] = useState(BREATH_SECONDS);
  const [running, setRunning] = useState(false);
  const [camera, setCamera] = useState(false);
  const [completed, setCompleted] = useState(savedRef.current.completed || false);
  const [comboComplete, setComboComplete] = useState(savedRef.current.comboComplete || false);
  const [partnerComplete, setPartnerComplete] = useState(savedRef.current.partnerComplete || false);
  const [statusKey, setStatusKey] = useState('statusInitial');
  const [statusVars, setStatusVars] = useState({});
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const elapsed = BREATH_SECONDS - seconds;
  const phase = elapsed < 4 ? breathPhases[0] : breathPhases[1];
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
      setStatusKey('statusUnsupported');
      setStatusVars({});
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
      setStatusKey('statusCameraOn');
      setStatusVars({});
    } catch {
      setCamera(false);
      setStatusKey('statusDenied');
      setStatusVars({});
    }
  }

  function startBreath() {
    setSeconds(BREATH_SECONDS);
    setRunning(true);
    setCompleted(false);
    setComboComplete(false);
    setPartnerComplete(false);
    setStatusKey('statusStarted');
    setStatusVars({});
  }

  function completeBreath() {
    setRunning(false);
    setCompleted(true);
    setComboComplete(true);
    setStatusKey('statusComplete');
    setStatusVars({});
  }

  function systemPass() {
    setPartnerComplete(true);
    setCompleted(true);
    setRunning(false);
    setStatusKey('statusTeammate');
    setStatusVars({ name: SYSTEM_TEAMMATE.name });
  }

  function reset() {
    setSeconds(BREATH_SECONDS);
    setRunning(false);
    setCompleted(false);
    setComboComplete(false);
    setPartnerComplete(false);
    setStatusKey('statusReset');
    setStatusVars({});
  }

  return (
    <>
      <SlashTitle eyebrow={t('training.eyebrow')} title={t('training.title')} subtitle={t('training.subtitle')} />

      <div className="mb-5 grid grid-cols-3 gap-3">
        <StatPill label={t('training.countdown')} value={`${seconds}s`} />
        <StatPill label={t('training.phase')} value={passed ? t('squad.complete') : phase.label} />
        <StatPill label={t('training.status')} value={passed ? 'PASS' : running ? 'LIVE' : 'READY'} />
      </div>

      <BrutalCard dark className="mb-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <CameraBadge active={camera} />
          <button
            type="button"
            onClick={enableCamera}
            className="icon-cut-button"
            aria-label={t('training.cameraAria')}
            title={t('training.cameraTitle')}
          >
            <Camera size={20} strokeWidth={3} />
          </button>
        </div>

        <div className="breath-layout">
          <div className="mini-camera">
            <video ref={videoRef} autoPlay playsInline muted className={`h-full w-full object-cover ${camera ? 'opacity-100' : 'opacity-0'}`} />
            {!camera ? <span>CAMERA</span> : null}
          </div>

          <div className={`breath-orb ${running ? (phase.type === 'inhale' ? 'breath-in' : 'breath-out') : ''} ${passed ? 'breath-clear' : ''}`}>
            <Wind size={42} strokeWidth={3} />
            <strong>{passed ? 'CLEAR' : phase.label}</strong>
            <span>{passed ? t('training.teamClear') : phase.cue}</span>
          </div>
        </div>

        <div className="mt-5 h-6 border-4 border-paper bg-void">
          <div className="h-full bg-blood transition-all duration-500" style={{ width: `${passed ? 100 : breathProgress}%` }} />
        </div>
        <p className="mt-4 border-l-4 border-blood pl-3 text-sm font-black text-ash">{t(`training.${statusKey}`, statusVars)}</p>
      </BrutalCard>

      <button type="button" onClick={startBreath} disabled={running || passed} className="punch-button breath-button">
        <Wind size={34} strokeWidth={3} />
        <span>{running ? phase.label : t('training.start')}</span>
        <b>{passed ? 'OK' : seconds}</b>
      </button>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <ActionButton variant="black" onClick={reset}>
          <RotateCcw size={18} strokeWidth={3} />
          {t('training.retry')}
        </ActionButton>
        <ActionButton onClick={systemPass}>
          {t('training.teammatePass')}
          <Zap size={18} strokeWidth={3} />
        </ActionButton>
      </div>

      <BrutalCard className="mt-5">
        <h2 className="section-title-dark">{t('training.judgement')}</h2>
        <p className="mt-2 text-lg font-black text-void">
          {passed
            ? t('training.passed', { name: comboComplete ? playerName : SYSTEM_TEAMMATE.name })
            : t('training.open')}
        </p>
        <p className="mt-2 text-sm font-bold text-ink">{t('training.selfCare')}</p>
      </BrutalCard>

      <ActionButton className="mt-5 w-full" onClick={() => navigate('/leaderboard')} disabled={!passed && !completed}>
        {t('training.leaderboard')}
        <ArrowRight size={18} strokeWidth={3} />
      </ActionButton>
    </>
  );
}
