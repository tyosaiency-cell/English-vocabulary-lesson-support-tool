import React, { useState } from 'react';
import { ViewState, UserRole, AiLessonData } from './types';
import { generateLessonContent } from './services/geminiService';
import { TeacherView } from './components/TeacherView';
import { StudentDiagnosis } from './components/StudentDiagnosis';
import { MatchingGame } from './components/MatchingGame';
import { StoryReader } from './components/StoryReader';
import { ClozeTest } from './components/ClozeTest';
import { Summary } from './components/Summary';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('TEACHER_INPUT');
  const [role, setRole] = useState<UserRole>('TEACHER');
  
  const [allWords, setAllWords] = useState<string[]>([]);
  const [lessonData, setLessonData] = useState<AiLessonData | null>(null);
  const [finalScore, setFinalScore] = useState(0);

  // Transition handlers
  const handleStartStudentMode = (words: string[]) => {
    setAllWords(words);
    setRole('STUDENT');
    setView('STUDENT_DIAGNOSIS');
  };

  const handleGenerateLesson = async (selectedWords: string[]) => {
    setView('LOADING');
    try {
      const data = await generateLessonContent(selectedWords);
      setLessonData(data);
      setView('MATCHING_GAME');
    } catch (error) {
      alert("エラーが発生しました。もう一度試してください。");
      setView('STUDENT_DIAGNOSIS');
    }
  };

  const handleMatchingFinished = () => {
    setView('STORY_READING');
  };

  const handleStoryFinished = () => {
    setView('CLOZE_TEST');
  };

  const handleClozeFinished = (score: number) => {
    setFinalScore(score);
    setView('SUMMARY');
  };

  const handleReset = () => {
    setAllWords([]);
    setLessonData(null);
    setFinalScore(0);
    setRole('TEACHER');
    setView('TEACHER_INPUT');
  };

  // Background style based on role
  const bgClass = role === 'TEACHER' ? 'bg-[#f4f6f9]' : 'bg-[#FFF8E1]';
  const headerClass = role === 'TEACHER' 
    ? 'bg-[#003366] text-white rounded-b-[30px] shadow-lg mb-8' 
    : 'bg-[#FF9800] text-white rounded-[20px] border-4 border-[#FFCC80] shadow-[0_6px_0_#E65100] mb-8 mx-4 mt-4';

  return (
    <div className={`min-h-screen transition-colors duration-500 pb-20 ${bgClass}`}>
      
      {/* Header */}
      <div className={role === 'TEACHER' ? "" : "max-w-4xl mx-auto"}>
        <div className={`text-center py-6 ${headerClass}`}>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {role === 'TEACHER' ? "🏫 Teacher Dashboard" : "🎮 English Quest"}
          </h1>
          <p className="opacity-80 font-medium">
            {role === 'TEACHER' ? "Class Management Tool" : "Let's learn English!"}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 max-w-3xl">
        
        {view === 'TEACHER_INPUT' && (
          <TeacherView onStartStudentMode={handleStartStudentMode} />
        )}

        {view === 'STUDENT_DIAGNOSIS' && (
          <StudentDiagnosis words={allWords} onGenerate={handleGenerateLesson} />
        )}

        {view === 'LOADING' && (
          <div className="flex flex-col items-center justify-center py-20 text-[#E65100]">
            <div className="w-16 h-16 border-4 border-[#FFCC80] border-t-[#E65100] rounded-full animate-spin mb-6"></div>
            <h4 className="text-2xl font-bold animate-pulse">AIがレッスンを準備中...</h4>
          </div>
        )}

        {view === 'MATCHING_GAME' && lessonData && (
          <MatchingGame pairs={lessonData.matchingGame} onNext={handleMatchingFinished} />
        )}

        {view === 'STORY_READING' && lessonData && (
          <StoryReader storyHtml={lessonData.story} onNext={handleStoryFinished} />
        )}

        {view === 'CLOZE_TEST' && lessonData && (
          <ClozeTest questions={lessonData.clozeTest} onFinish={handleClozeFinished} />
        )}

        {view === 'SUMMARY' && lessonData && (
          <Summary 
            score={finalScore} 
            total={lessonData.clozeTest.length} 
            advice={lessonData.advice} 
            onReset={handleReset} 
          />
        )}
      </div>
    </div>
  );
};

export default App;