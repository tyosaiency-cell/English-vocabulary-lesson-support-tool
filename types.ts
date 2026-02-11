export interface MatchingPair {
  word: string;
  definition: string;
}

export interface ClozeQuestion {
  question: string;
  answer: string;
  options: string[];
}

export interface AiLessonData {
  matchingGame: MatchingPair[];
  story: string;
  clozeTest: ClozeQuestion[];
  advice: string;
}

export type ViewState = 
  | 'TEACHER_INPUT' 
  | 'STUDENT_DIAGNOSIS' 
  | 'LOADING' 
  | 'MATCHING_GAME' 
  | 'STORY_READING' 
  | 'CLOZE_TEST' 
  | 'SUMMARY';

export type UserRole = 'TEACHER' | 'STUDENT';