import { useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ActionButton, BrutalCard, SlashTitle, StatPill } from '../components.jsx';
import { getWisdomProgress, getWisdomScore, resetWisdomProgress, saveWisdomProgress, wisdomQuestions } from '../data.js';

export default function ElevatorTestPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(() => wisdomQuestions.map(shuffleQuestionOptions));
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
    setQuestions(wisdomQuestions.map(shuffleQuestionOptions));
    setProgress({});
  }

  return (
    <>
      <SlashTitle eyebrow="STAGE 01" title="第一关：电梯测试" subtitle="如果当时是你，先判断空间、距离、出口和求助路径。" />

      <div className="mb-5 grid grid-cols-3 gap-3">
        <StatPill label="得分" value={scoreInfo.complete ? scoreInfo.score : '--'} />
        <StatPill label="答对" value={scoreInfo.complete ? `${scoreInfo.correct}/${scoreInfo.total}` : '--'} />
        <StatPill label="进度" value={`${scoreInfo.answered}/${scoreInfo.total}`} />
      </div>

      <BrutalCard dark className="mb-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase text-blood">SCENARIO TEST</p>
            <h2 className="section-title-light">如果当时是你</h2>
          </div>
          {allPassed ? <span className="badge-red">街头智慧勋章</span> : null}
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
          <h2 className="section-title-dark">电梯测试得分：{scoreInfo.score}</h2>
          <p className="mt-2 text-sm font-bold text-ink">
            答对 {scoreInfo.correct} / {scoreInfo.total} 题。这部分分数已经计入战斗力排行榜总分。
          </p>
          <div className="mt-4 grid gap-2">
            {questions.map((question, index) => (
              <div key={question.id} className="answer-key-row">
                <span>{index + 1}</span>
                <p>正确答案：{question.options[question.answer]}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 bg-void p-3 text-sm font-black text-paper">{getStageSummary(scoreInfo.correct, scoreInfo.total)}</p>
        </BrutalCard>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <ActionButton className="w-full" onClick={() => navigate('/match')} disabled={!scoreInfo.complete}>
          进入第二关：找回呼吸
          <ArrowRight size={18} strokeWidth={3} />
        </ActionButton>
        <button type="button" onClick={restart} className="inline-flex min-h-14 items-center justify-center gap-2 border-4 border-paper bg-void px-4 py-3 font-black text-paper">
          <RotateCcw size={18} strokeWidth={3} />
          重新挑战
        </button>
      </div>
    </>
  );
}

function getStageSummary(correct, total) {
  if (correct === total) return '总结：你的封闭空间警觉、出口意识和求助链条都很在线。继续保持：先离开风险空间，再处理情绪和证据。';
  if (correct >= Math.ceil(total * 0.6)) return '总结：你已经抓住了大方向：距离、出口、证据、求助。下一步要把“不要僵住”练成身体反应。';
  return '总结：这关提醒你先把安全策略装进身体：不进封闭空间、不退到死角、把风险暴露给外部，并尽快去有人的地方。';
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
