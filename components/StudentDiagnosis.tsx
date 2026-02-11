import React, { useState } from 'react';
import { Button } from './Button';

interface StudentDiagnosisProps {
  words: string[];
  onGenerate: (selectedWords: string[]) => void;
}

export const StudentDiagnosis: React.FC<StudentDiagnosisProps> = ({ words, onGenerate }) => {
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());

  const toggleWord = (word: string) => {
    const newSelected = new Set(selectedWords);
    if (newSelected.has(word)) {
      newSelected.delete(word);
    } else {
      newSelected.add(word);
    }
    setSelectedWords(newSelected);
  };

  const handleGenerate = () => {
    if (selectedWords.size === 0) {
      alert("単語を選んでね！");
      return;
    }
    onGenerate(Array.from(selectedWords));
  };

  return (
    <div className="bg-white rounded-[20px] shadow-xl p-6 border-4 border-[#FFE0B2]">
      <h3 className="text-2xl font-extrabold mb-2 text-[#E65100]">🧐 自信度チェック</h3>
      <p className="mb-6 text-gray-600 font-medium">自信がない単語を選んでね！</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {words.map((word) => {
          const isSelected = selectedWords.has(word);
          return (
            <button
              key={word}
              onClick={() => toggleWord(word)}
              className={`
                p-4 text-lg font-bold rounded-2xl border-2 transition-all duration-200
                ${isSelected 
                  ? 'bg-[#FF9800] text-white border-[#E65100] transform scale-105 shadow-md' 
                  : 'bg-white text-gray-600 border-[#FFCC80] hover:bg-[#FFF8E1]'}
              `}
            >
              {word}
            </button>
          );
        })}
      </div>

      <div className="text-right">
        <Button onClick={handleGenerate} theme="student">
          AI教材を生成する 🚀
        </Button>
      </div>
    </div>
  );
};