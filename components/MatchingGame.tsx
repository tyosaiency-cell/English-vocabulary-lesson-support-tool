import React, { useState, useEffect } from 'react';
import { MatchingPair } from '../types';
import { Button } from './Button';

interface MatchingGameProps {
  pairs: MatchingPair[];
  onNext: () => void;
}

export const MatchingGame: React.FC<MatchingGameProps> = ({ pairs, onNext }) => {
  const [leftItems, setLeftItems] = useState<{ id: string; text: string; matched: boolean }[]>([]);
  const [rightItems, setRightItems] = useState<{ id: string; text: string; matched: boolean }[]>([]);
  
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchesFound, setMatchesFound] = useState(0);

  useEffect(() => {
    // Initialize game
    const left = pairs.map(p => ({ id: p.word, text: p.word, matched: false }));
    const right = [...pairs]
      .sort(() => Math.random() - 0.5)
      .map(p => ({ id: p.word, text: p.definition, matched: false })); // ID links to word for checking

    setLeftItems(left);
    setRightItems(right);
  }, [pairs]);

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      if (selectedLeft === selectedRight) {
        // Match found
        setLeftItems(prev => prev.map(item => item.id === selectedLeft ? { ...item, matched: true } : item));
        setRightItems(prev => prev.map(item => item.id === selectedRight ? { ...item, matched: true } : item));
        setMatchesFound(prev => prev + 1);
        setSelectedLeft(null);
        setSelectedRight(null);
      } else {
        // No match
        const timer = setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
        }, 600);
        return () => clearTimeout(timer);
      }
    }
  }, [selectedLeft, selectedRight]);

  return (
    <div className="bg-white rounded-[20px] shadow-xl p-6 border-4 border-[#FFE0B2]">
      <h3 className="text-2xl font-extrabold mb-6 text-[#E65100]">STEP 1: 単語の意味を覚えよう 🧩</h3>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          {leftItems.map((item) => (
            <button
              key={item.id}
              disabled={item.matched}
              onClick={() => setSelectedLeft(item.id)}
              className={`
                p-4 font-bold text-center rounded-xl border-2 transition-all duration-200
                ${item.matched 
                  ? 'bg-green-100 border-green-500 text-green-700 opacity-50 cursor-default' 
                  : selectedLeft === item.id 
                    ? 'bg-[#FFE0B2] border-[#E65100] transform scale-105'
                    : 'bg-white border-[#FFCC80] hover:bg-orange-50'}
              `}
            >
              {item.text}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {rightItems.map((item, idx) => (
            <button
              key={`${item.id}-${idx}`}
              disabled={item.matched}
              onClick={() => setSelectedRight(item.id)}
              className={`
                p-4 font-bold text-center rounded-xl border-2 transition-all duration-200
                ${item.matched 
                  ? 'bg-green-100 border-green-500 text-green-700 opacity-50 cursor-default' 
                  : selectedRight === item.id 
                    ? 'bg-[#FFE0B2] border-[#E65100] transform scale-105'
                    : 'bg-white border-[#FFCC80] hover:bg-orange-50'}
              `}
            >
              {item.text}
            </button>
          ))}
        </div>
      </div>

      {matchesFound === pairs.length && (
        <div className="text-right mt-8 animate-bounce">
          <Button onClick={onNext} theme="student">
            次へ：物語を読む 📖
          </Button>
        </div>
      )}
    </div>
  );
};