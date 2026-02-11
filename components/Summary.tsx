import React, { useState } from 'react';
import { Button } from './Button';

interface SummaryProps {
  score: number;
  total: number;
  advice: string;
  onReset: () => void;
}

export const Summary: React.FC<SummaryProps> = ({ score, total, advice, onReset }) => {
  const [feedback, setFeedback] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSendFeedback = () => {
    if (!feedback.trim()) {
      alert("メッセージを書いてね！");
      return;
    }
    setSending(true);
    // Simulate API call
    setTimeout(() => {
      setSending(false);
      setSent(true);
      alert("先生にメッセージを送りました！");
    }, 1000);
  };

  return (
    <div className="bg-white rounded-[20px] shadow-xl p-8 border-4 border-[#FFE0B2] text-center">
      <h2 className="text-4xl font-extrabold mb-2 text-[#E65100]">🎉 Great Job!</h2>
      <p className="text-xl text-gray-600 mb-8">おつかれさまでした！</p>

      <div className="inline-block bg-[#FFF8E1] px-10 py-6 rounded-2xl border-2 border-[#FFCC80] mb-8">
        <h4 className="text-gray-600 font-bold mb-2">あなたのスコア</h4>
        <h1 className="text-6xl font-black text-[#E65100]">{score} / {total}</h1>
      </div>

      <div className="text-left bg-gray-50 p-6 rounded-xl border border-[#FFCC80] mb-8">
        <h5 className="text-[#E65100] font-bold text-lg mb-2">💡 AI先生からのアドバイス</h5>
        <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{advice}</p>
      </div>

      <hr className="border-gray-200 my-8" />

      <div className="text-left max-w-lg mx-auto">
        <h5 className="text-lg font-bold mb-2 text-gray-700">✉️ 先生へのメッセージ</h5>
        <p className="text-sm text-gray-500 mb-3">質問や感想があれば書いてね（先生に届きます）</p>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF9800] outline-none mb-3"
          rows={3}
          placeholder="例：〇〇という単語が難しかったです。物語は面白かったです！"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          disabled={sent}
        />
        <div className="text-right">
           <button 
             onClick={handleSendFeedback}
             disabled={sent || sending}
             className={`
               font-bold py-2 px-6 rounded-full border-2 transition-all
               ${sent 
                 ? 'bg-green-100 border-green-500 text-green-700' 
                 : 'border-[#FF9800] text-[#E65100] hover:bg-[#FFF8E1]'}
             `}
           >
             {sending ? "送信中..." : sent ? "送信完了 ✅" : "送信する 📨"}
           </button>
        </div>
      </div>

      <div className="mt-12">
        <Button onClick={onReset} variant="secondary">
          最初に戻る 🔄
        </Button>
      </div>
    </div>
  );
};