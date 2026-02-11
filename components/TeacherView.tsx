import React, { useState } from 'react';
import { Button } from './Button';

interface TeacherViewProps {
  onStartStudentMode: (words: string[]) => void;
}

export const TeacherView: React.FC<TeacherViewProps> = ({ onStartStudentMode }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (!input.trim()) {
      alert("単語を入力してください！");
      return;
    }
    const words = input.split(/[\n,]+/).map(w => w.trim()).filter(w => w !== "");
    if (words.length === 0) return;
    onStartStudentMode(words);
  };

  return (
    <div className="bg-white rounded-[20px] shadow-xl p-8 border border-gray-100">
      <h3 className="text-2xl font-bold mb-6 text-[#003366]">📝 単語リスト作成</h3>
      <textarea
        className="w-full p-4 border border-gray-300 rounded-xl mb-6 text-lg focus:ring-2 focus:ring-[#003366] focus:border-transparent outline-none transition-all"
        rows={6}
        placeholder="apple, banana, interesting..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="text-right">
        <Button onClick={handleSubmit} theme="teacher">
          生徒用端末へ送信 📲
        </Button>
      </div>
    </div>
  );
};