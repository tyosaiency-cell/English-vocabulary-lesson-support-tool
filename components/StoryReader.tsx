import React from 'react';
import { Button } from './Button';

interface StoryReaderProps {
  storyHtml: string;
  onNext: () => void;
}

export const StoryReader: React.FC<StoryReaderProps> = ({ storyHtml, onNext }) => {
  return (
    <div className="bg-white rounded-[20px] shadow-xl p-6 border-4 border-[#FFE0B2]">
      <h3 className="text-2xl font-extrabold mb-6 text-[#E65100]">STEP 2: 物語を読もう 📖</h3>
      
      <div 
        className="p-6 bg-[#FFF8E1] rounded-xl mb-8 text-lg leading-loose border-l-8 border-[#FF9800] font-medium text-gray-800"
        dangerouslySetInnerHTML={{ __html: storyHtml }}
      />

      <div className="text-right">
        <Button onClick={onNext} theme="student">
          次へ：内容理解テスト ✍️
        </Button>
      </div>
    </div>
  );
};