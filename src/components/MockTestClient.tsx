'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle, XCircle, Volume2, ChevronRight, ChevronLeft, Phone } from 'lucide-react';

type QuestionType = 'mcq' | 'typing' | 'audio';

interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[];
  answer: string;
  audioUrl?: string;
}

// Demo questions — in production these come from the database
const DEMO_QUESTIONS: Record<string, Question[]> = {
  vi: [
    {
      id: 1,
      type: 'mcq',
      question: 'She ___ to school every day.',
      options: ['go', 'goes', 'going', 'gone'],
      answer: 'goes',
    },
    {
      id: 2,
      type: 'typing',
      question: 'Viết thì của động từ "to be" ở ngôi thứ ba số ít (hiện tại đơn):',
      answer: 'is',
    },
    {
      id: 3,
      type: 'mcq',
      question: 'Which sentence is correct?',
      options: [
        'I have been to Paris last year.',
        'I went to Paris last year.',
        'I go to Paris last year.',
        'I was go to Paris last year.',
      ],
      answer: 'I went to Paris last year.',
    },
    {
      id: 4,
      type: 'audio',
      question: 'Nghe đoạn audio và chọn đáp án đúng: Người nói đang nói về điều gì?',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      options: ['Thời tiết', 'Du lịch', 'Ẩm thực', 'Thể thao'],
      answer: 'Du lịch',
    },
    {
      id: 5,
      type: 'mcq',
      question: 'Choose the correct preposition: "I am interested ___ music."',
      options: ['in', 'on', 'at', 'for'],
      answer: 'in',
    },
  ],
  en: [
    {
      id: 1,
      type: 'mcq',
      question: 'She ___ to school every day.',
      options: ['go', 'goes', 'going', 'gone'],
      answer: 'goes',
    },
    {
      id: 2,
      type: 'typing',
      question: 'Write the present tense of "to be" for the third person singular:',
      answer: 'is',
    },
    {
      id: 3,
      type: 'mcq',
      question: 'Which sentence is correct?',
      options: [
        'I have been to Paris last year.',
        'I went to Paris last year.',
        'I go to Paris last year.',
        'I was go to Paris last year.',
      ],
      answer: 'I went to Paris last year.',
    },
    {
      id: 4,
      type: 'audio',
      question: 'Listen to the audio and choose the correct answer: What is the speaker talking about?',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      options: ['Weather', 'Travel', 'Food', 'Sports'],
      answer: 'Travel',
    },
    {
      id: 5,
      type: 'mcq',
      question: 'Choose the correct preposition: "I am interested ___ music."',
      options: ['in', 'on', 'at', 'for'],
      answer: 'in',
    },
  ],
};

function loadTest(locale: string): { questions: Question[]; timeLimit: number } {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('ez_mock_test');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // New format: { questions: [...], timeLimit: number }
        const rawQuestions = Array.isArray(parsed) ? parsed : parsed.questions;
        const timeLimit = Array.isArray(parsed) ? 5 : (parsed.timeLimit ?? 5);
        const letterToIndex: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };
        const questions = rawQuestions.map((q: { number: string; question: string; a: string; b: string; c: string; d: string; correct: string }, i: number) => {
          const options = [q.a, q.b, q.c, q.d].filter(Boolean);
          const answerIndex = letterToIndex[q.correct] ?? 0;
          return {
            id: i + 1,
            type: 'mcq' as const,
            question: q.question,
            options,
            answer: options[answerIndex] ?? '',
          };
        });
        return { questions, timeLimit };
      } catch { /* fall through */ }
    }
  }
  return { questions: DEMO_QUESTIONS[locale] ?? DEMO_QUESTIONS.vi, timeLimit: 5 };
}

export default function MockTestClient({ locale }: { locale: string }) {
  const t = useTranslations('test');
  const [{ questions, timeLimit }] = useState(() => loadTest(locale));
  const total = questions.length;

  const [step, setStep] = useState<'name' | 'test' | 'result'>('name');
  const [name, setName] = useState('');
  const [timeLimitInput, setTimeLimitInput] = useState(timeLimit);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Countdown timer (seconds)
  const [secondsLeft, setSecondsLeft] = useState(timeLimit * 60);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const question = questions[current];

  // Start/stop timer based on step
  useEffect(() => {
    if (step === 'test') {
      setSecondsLeft(timeLimitInput * 60);
      timerRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(timerRef.current!);
            // Auto-submit
            let sc = 0;
            questions.forEach((q) => {
              const userAnswer = (answers[q.id] ?? '').trim().toLowerCase();
              if (userAnswer === q.answer.trim().toLowerCase()) sc++;
            });
            setScore(sc);
            setSubmitted(true);
            setStep('result');
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (name.trim()) {
      setSecondsLeft(timeLimitInput * 60);
      setStep('test');
    }
  };

  const handleAnswer = (qId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    let s = 0;
    questions.forEach((q) => {
      const userAnswer = (answers[q.id] ?? '').trim().toLowerCase();
      const correct = q.answer.trim().toLowerCase();
      if (userAnswer === correct) s++;
    });
    setScore(s);
    setSubmitted(true);
    setStep('result');
  };

  if (step === 'name') {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-8 text-center">
        <div className="text-5xl mb-4">📝</div>
        <h2 className="text-xl font-bold text-gray-800 mb-6">{t('enterName')}</h2>
        <div className="flex flex-col items-center gap-4 mb-6">
          <input
            type="text"
            placeholder={t('namePlaceholder')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            className="w-full max-w-sm border border-gray-200 rounded-xl px-4 py-3 text-center text-lg focus:outline-none focus:border-orange-400"
          />
          <div className="text-sm text-gray-500">
              ⏱ {locale === 'vi' ? `Thời gian làm bài: ${timeLimitInput} phút` : `Time limit: ${timeLimitInput} minutes`}
            </div>
        </div>
        <button
          onClick={handleStart}
          disabled={!name.trim()}
          className="px-8 py-3 rounded-full text-white font-semibold text-base transition-all hover:opacity-90 disabled:opacity-40"
          style={{ backgroundColor: 'var(--ez-primary)' }}
        >
          {t('start')}
        </button>
      </div>
    );
  }

  if (step === 'result') {
    const answered = Object.keys(answers).filter((k) => (answers[Number(k)] ?? '').trim() !== '').length;
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
        {/* Result header */}
        <div className="p-8 text-center text-white"
          style={{ background: 'linear-gradient(135deg, var(--ez-primary), var(--ez-primary-dark))' }}>
          <div className="text-5xl mb-2">🎉</div>
          <h2 className="text-2xl font-bold mb-1">{name}</h2>
          <p className="text-white/80">{t('result')}</p>
        </div>

        <div className="p-4 sm:p-8">
          {/* Score */}
          <div className="flex justify-center gap-6 sm:gap-8 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold" style={{ color: 'var(--ez-secondary)' }}>{Math.round((answered / total) * 100)}%</div>
              <div className="text-sm text-gray-500 mt-1">{locale === 'vi' ? 'Tỉ lệ hoàn thành' : 'Completion'}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold" style={{ color: 'var(--ez-primary)' }}>
                {score}/{total}
              </div>
              <div className="text-sm text-gray-500 mt-1">{t('score')}</div>
            </div>
          </div>

          {/* Answer review */}
          <div className="space-y-3 mb-8">
            {questions.map((q) => {
              const userAns = (answers[q.id] ?? '').trim().toLowerCase();
              const isCorrect = userAns === q.answer.trim().toLowerCase();
              return (
                <div key={q.id} className={`flex items-start gap-3 p-3 rounded-xl text-sm ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                  {isCorrect
                    ? <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    : <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />}
                  <div>
                    <p className="text-gray-700 font-medium">{q.question}</p>
                    {!isCorrect && (
                      <p className="text-gray-500 mt-0.5">
                        {locale === 'vi' ? 'Đáp án đúng: ' : 'Correct answer: '}
                        <span className="font-medium text-green-600">{q.answer}</span>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Retake */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => {
                setAnswers({});
                setCurrent(0);
                setSubmitted(false);
                setStep('name');
              }}
              className="px-6 py-2.5 rounded-full font-semibold text-sm border-2 transition-all hover:opacity-90"
              style={{ borderColor: 'var(--ez-primary)', color: 'var(--ez-primary)' }}
            >
              {locale === 'vi' ? '🔄 Làm lại bài thi' : '🔄 Retake Test'}
            </button>
          </div>

          {/* CTA */}
          <div className="text-center p-5 rounded-2xl" style={{ backgroundColor: 'var(--ez-cream)' }}>
            <p className="font-medium text-gray-700 mb-3">{t('callToAction')}</p>
            <a href="tel:0943906204"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--ez-primary)' }}>
              <Phone className="w-4 h-4" />
              0943.906.204
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
      {/* Progress bar */}
      <div className="h-2 bg-gray-100">
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${((current + 1) / total) * 100}%`, backgroundColor: 'var(--ez-primary)' }}
        />
      </div>

      <div className="p-4 sm:p-8">
        {/* Question counter + timer */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-gray-400">
            {locale === 'vi' ? `Câu ${current + 1} / ${total}` : `Question ${current + 1} / ${total}`}
          </span>
          <div className="flex items-center gap-3">
            {/* Countdown clock */}
            <span
              className="text-sm font-bold tabular-nums px-3 py-0.5 rounded-full"
              style={{
                backgroundColor: secondsLeft < 60 ? '#fee2e2' : 'var(--ez-cream)',
                color: secondsLeft < 60 ? '#dc2626' : 'var(--ez-primary)',
              }}
            >
              ⏱ {formatTime(secondsLeft)}
            </span>
            {question.type !== 'mcq' && (
              <span className="text-sm font-medium text-white px-2 py-0.5 rounded-full"
                style={{ backgroundColor: question.type === 'audio' ? '#4CAF50' : 'var(--ez-secondary)' }}>
                {question.type === 'audio' ? '🎧 Audio' : '✍️ Typing'}
              </span>
            )}
          </div>
        </div>

        {/* Question */}
        <h2 className="text-lg font-semibold text-gray-800 mb-6">{question.question}</h2>

        {/* Audio player */}
        {question.type === 'audio' && question.audioUrl && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <audio controls className="flex-1" src={question.audioUrl}>
              {t('listen')}
            </audio>
          </div>
        )}

        {/* MCQ options */}
        {(question.type === 'mcq' || question.type === 'audio') && question.options && (
          <div className="space-y-3">
            {question.options.map((opt) => {
              const selected = answers[question.id] === opt;
              return (
                <button
                  key={opt}
                  onClick={() => handleAnswer(question.id, opt)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                    selected
                      ? 'border-orange-400 bg-orange-50 font-medium'
                      : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50/50'
                  }`}
                  style={selected ? { borderColor: 'var(--ez-primary)', color: 'var(--ez-primary)' } : {}}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {/* Typing input */}
        {question.type === 'typing' && (
          <input
            type="text"
            placeholder={t('typeAnswer')}
            value={answers[question.id] ?? ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 text-lg"
          />
        )}

        {/* Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-8">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            {t('prev')}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all"
            >
              {locale === 'vi' ? 'Dừng bài' : 'Stop'}
            </button>

            {current < total - 1 ? (
              <button
                onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}
                className="flex items-center gap-1 px-5 py-2 rounded-xl text-white font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: 'var(--ez-primary)' }}
              >
                {t('next')}
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-xl text-white font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: 'var(--ez-primary)' }}
              >
                {t('submit')} ✓
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
