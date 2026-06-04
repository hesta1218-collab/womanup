import { useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ActionButton, BrutalCard, SlashTitle, StatPill } from '../components.jsx';
import { getWisdomProgress, getWisdomScore, resetWisdomProgress, saveWisdomProgress, wisdomQuestions } from '../data.js';
import { useI18n } from '../i18n.jsx';

export default function ElevatorTestPage() {
  const navigate = useNavigate();
  const { t, get } = useI18n();
  const baseQuestions = get('wisdom.questions') || wisdomQuestions;
  const [questions, setQuestions] = useState(() => baseQuestions.map(shuffleQuestionOptions));
  const [progress, setProgress] = useState(getWisdomProgress());
  const scoreInfo = getWisdomScore(progress);
  const allPassed = scoreInfo.complete && scoreInfo.correct === scoreInfo.total;

  function answer(question, index) {
    if (progress[question.id]?.selected !== undefined) return;

    const next = {
      ...progress,
      [question.id]: {
        selected: index,
        correct: index === question.answer,
      },
    };
    setProgress(next);
    saveWisdomProgress(next);
  }

  function restart() {
    resetWisdomProgress();
    const fresh = (get('wisdom.questions') || wisdomQuestions).map(shuffleQuestionOptions);
    setQuestions(fresh);
    setProgress({});
  }

  return (
    <>
      <SlashTitle eyebrow={t('elevator.eyebrow')} title={t('elevator.title')} subtitle={t('elevator.subtitle')} />

      <div className="mb-5 grid grid-cols-3 gap-3">
        <StatPill label={t('common.score')} value={scoreInfo.complete ? scoreInfo.score : '--'} />
        <StatPill label={t('common.correct')} value={scoreInfo.complete ? `${scoreInfo.correct}/${scoreInfo.total}` : '--'} />
        <StatPill label={t('common.progress')} value={`${scoreInfo.answered}/${scoreInfo.total}`} />
      </div>

      <BrutalCard dark className="mb-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase text-blood">SCENARIO TEST</p>
            <h2 className="section-title-light">{t('elevator.scenario')}</h2>
          </div>
          {allPassed ? <span className="badge-red">{t('elevator.medal')}</span> : null}
        </div>

        <div className="mt-4 space-y-4">
          {questions.map((question, questionIndex) => {
            const state = progress[question.id];
            return (
              <div key={question.id} className="border-4 border-paper bg-void p-3">
                <h3 className="font-black text-paper">
                  {questionIndex + 1}. {question.title}
                </h3>
                <div className="mt-3 grid gap-2">
                  {question.options.map((option, index) => (
                    <button
                      key={option}
                      type="button"
                      disabled={state?.selected !== undefined}
                      onClick={() => answer(question, index)}
                      className={`choice-button ${state?.selected === index ? 'choice-selected' : ''}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </BrutalCard>

      {scoreInfo.complete ? (
        <BrutalCard className="mb-5">
          <p className="text-xs font-black uppercase text-blood">STAGE SCORE</p>
          <h2 className="section-title-dark">{t('elevator.stageScore', { score: scoreInfo.score })}</h2>
          <p className="mt-2 text-sm font-bold text-ink">
            {t('elevator.summaryScore', { correct: scoreInfo.correct, total: scoreInfo.total })}
          </p>
          <div className="mt-4 grid gap-2">
            {questions.map((question, index) => (
              <div key={question.id} className="answer-key-row">
                <span>{index + 1}</span>
                <p>{t('elevator.correctAnswer', { answer: question.options[question.answer] })}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 bg-void p-3 text-sm font-black text-paper">{getStageSummary(scoreInfo.correct, scoreInfo.total, t)}</p>
        </BrutalCard>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <ActionButton className="w-full" onClick={() => navigate('/match')} disabled={!scoreInfo.complete}>
          {t('elevator.nextStage')}
          <ArrowRight size={18} strokeWidth={3} />
        </ActionButton>
        <button type="button" onClick={restart} className="inline-flex min-h-14 items-center justify-center gap-2 border-4 border-paper bg-void px-4 py-3 font-black text-paper">
          <RotateCcw size={18} strokeWidth={3} />
          {t('elevator.restart')}
        </button>
      </div>
    </>
  );
}

function getStageSummary(correct, total, t) {
  if (correct === total) return t('elevator.summaries.full');
  if (correct >= Math.ceil(total * 0.6)) return t('elevator.summaries.pass');
  return t('elevator.summaries.low');
}

function shuffleQuestionOptions(question) {
  const options = question.options.map((text, index) => ({ text, originalIndex: index }));

  for (let index = options.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [options[index], options[swapIndex]] = [options[swapIndex], options[index]];
  }

  return {
    ...question,
    options: options.map((option) => option.text),
    answer: options.findIndex((option) => option.originalIndex === question.answer),
  };
}
