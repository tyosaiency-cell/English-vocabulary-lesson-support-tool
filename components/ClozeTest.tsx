import React, { useState } from 'react';
import { ClozeQuestion } from '../types';
import { Button } from './Button';

interface ClozeTestProps {
  questions: ClozeQuestion[];
  onFinish: (score: number) => void;
}

export const ClozeTest: React.FC<ClozeTestProps> = ({ questions, onFinish }) => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState(0);

  const handleAnswer = (questionIdx: number, selectedOption: string, correctAnswer: string) => {
    if (answers[questionIdx]) return; // Already answered

    setAnswers(prev => ({ ...prev, [questionIdx]: selectedOption }));
    
    if (selectedOption === correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const isAllAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="bg-white rounded-[20px] shadow-xl p-6 border-4 border-[#FFE0B2]">
      <h3 className="text-2xl font-extrabold mb-6 text-[#E65100]">STEP 3: 仕上げテスト 💯</h3>

      <div className="space-y-6 mb-8">
        {questions.map((q, idx) => {
          const userAnswer = answers[idx];
          const isAnswered = !!userAnswer;
          const isCorrect = userAnswer === q.answer;

          return (
            <div key={idx} className="bg-white p-5 rounded-xl border-2 border-[#FFE0B2]">
              <h5 className="text-xl font-bold mb-4 text-[#E65100]">Q{idx + 1}. {q.question}</h5>
              <div className="grid gap-2">
                {q.options.map((opt) => {
                  let btnClass = "border-2 border-gray-200 text-gray-700 bg-white hover:bg-gray-50"; // Default
                  
                  if (isAnswered) {
                    if (opt === q.answer) {
                      btnClass = "bg-green-100 border-green-500 text-green-800 font-bold";
                    } else if (opt === userAnswer && userAnswer !== q.answer) {
                      btnClass = "bg-red-100 border-red-500 text-red-800";
                    } else {
                       btnClass = "opacity-50 cursor-not-allowed border-gray-200";
                    }
                  }

                  return (
                    <button
                      key={opt}
                      disabled={isAnswered}
                      onClick={() => handleAnswer(idx, opt, q.answer)}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${btnClass}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {isAnswered && (
                <div className={`mt-3 font-bold ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                  {isCorrect ? "Correct! 🎉" : `Oops! The answer is "${q.answer}".`}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isAllAnswered && (
        <div className="text-right animate-fade-in">
          <Button onClick={() => onFinish(score)} theme="student">
            結果を見る 🏆
          </Button>
        </div>
      )}
    </div>
  );
};