export interface Course {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  objectives: string[];
  deliveryMethod: 'In-person' | 'Hybrid' | 'Fully Online' | 'Synchronous' | 'Asynchronous';
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  id: string;
  name: string;
  level: 'High School' | 'Undergraduate' | 'Graduate';
  prerequisites: string[];
  priorKnowledge: string;
  learningChallenges: string;
}

export interface Quiz {
  id: string;
  title: string;
  courseId: string;
  learningOutcomes: string[];
  questions: QuizQuestion[];
  createdAt: string;
  updatedAt: string;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  text: string;
  options?: string[];
  correctAnswer?: string | string[];
  points: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  content: string;
  timestamp: string;
}

export interface StatsCard {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'course' | 'quiz' | 'student' | 'system';
}