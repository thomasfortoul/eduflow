import { Course, Student, Quiz, ChatMessage, ActivityItem } from '../types';
import { BookOpen, FileCheck, Users, Bell } from 'lucide-react';
import React from 'react';

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Computer Science',
    shortDescription: 'Foundational concepts in computer science including algorithms, data structures, and programming basics.',
    longDescription: 'This course provides students with a comprehensive introduction to the field of computer science. Topics covered include algorithms, data structures, programming fundamentals, and an overview of computer systems. Students will gain hands-on experience through programming assignments and projects.',
    objectives: [
      'Understand basic programming concepts',
      'Implement simple algorithms',
      'Design and use data structures',
      'Analyze program efficiency',
      'Build small applications'
    ],
    deliveryMethod: 'Hybrid',
    createdAt: '2023-09-15T10:30:00Z',
    updatedAt: '2024-05-10T14:45:00Z'
  },
  {
    id: '2',
    title: 'Advanced Mathematics',
    shortDescription: 'Deep dive into calculus, linear algebra, and differential equations for science and engineering students.',
    longDescription: 'An in-depth exploration of advanced mathematical concepts essential for students in science and engineering fields. The course covers calculus, linear algebra, differential equations, and their applications to real-world problems. Strong emphasis on both theoretical understanding and practical problem-solving.',
    objectives: [
      'Master calculus concepts and applications',
      'Develop proficiency in linear algebra',
      'Solve differential equations',
      'Apply mathematical methods to real problems',
      'Enhance mathematical reasoning'
    ],
    deliveryMethod: 'In-person',
    createdAt: '2023-10-05T09:15:00Z',
    updatedAt: '2024-04-20T16:30:00Z'
  },
  {
    id: '3',
    title: 'Modern Literature Studies',
    shortDescription: 'Analysis of 20th and 21st century literature across various genres and cultural contexts.',
    longDescription: 'This course examines significant works of literature from the 20th and 21st centuries, focusing on how they reflect and influence society and culture. Students will analyze texts across multiple genres, including novels, short stories, poetry, and drama, with consideration for historical context and critical theory.',
    objectives: [
      'Analyze modern literary works',
      'Apply critical theory to textual analysis',
      'Understand literature in historical context',
      'Develop advanced writing skills',
      'Engage in literary discourse'
    ],
    deliveryMethod: 'Fully Online',
    createdAt: '2024-01-20T13:45:00Z',
    updatedAt: '2024-05-05T11:20:00Z'
  }
];

// Mock Students
export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    level: 'Undergraduate',
    prerequisites: ['High School Algebra', 'Basic Computer Skills'],
    priorKnowledge: 'Has experience with basic programming concepts and mathematics.',
    learningChallenges: 'Needs additional time for complex problem-solving tasks.'
  },
  {
    id: '2',
    name: 'Michael Johnson',
    level: 'Graduate',
    prerequisites: ['Bachelor in Computer Science', 'Programming Experience'],
    priorKnowledge: 'Strong foundation in algorithms and data structures. Experience with Python and Java.',
    learningChallenges: 'Prefers practical applications over theoretical discussions.'
  },
  {
    id: '3',
    name: 'Sophia Rodriguez',
    level: 'High School',
    prerequisites: ['Algebra I', 'Introduction to Physics'],
    priorKnowledge: 'Basic understanding of scientific principles and mathematical concepts.',
    learningChallenges: 'Visual learner who benefits from diagrams and demonstrations.'
  }
];

// Mock Quizzes
export const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Programming Fundamentals Quiz',
    courseId: '1',
    learningOutcomes: [
      'Understand basic programming syntax',
      'Apply control flow structures',
      'Implement simple algorithms'
    ],
    questions: [
      {
        id: '1-1',
        type: 'multiple-choice',
        text: 'Which of the following is NOT a primitive data type in JavaScript?',
        options: ['String', 'Boolean', 'Integer', 'Symbol'],
        correctAnswer: 'Integer',
        points: 2
      },
      {
        id: '1-2',
        type: 'true-false',
        text: 'Arrays in JavaScript can store values of different types.',
        correctAnswer: 'true',
        points: 1
      },
      {
        id: '1-3',
        type: 'short-answer',
        text: 'What does the acronym API stand for?',
        correctAnswer: 'Application Programming Interface',
        points: 2
      }
    ],
    createdAt: '2024-03-10T09:30:00Z',
    updatedAt: '2024-05-05T14:15:00Z'
  },
  {
    id: '2',
    title: 'Calculus Midterm Assessment',
    courseId: '2',
    learningOutcomes: [
      'Apply differentiation rules',
      'Solve integration problems',
      'Understand limits and continuity'
    ],
    questions: [
      {
        id: '2-1',
        type: 'multiple-choice',
        text: 'What is the derivative of f(x) = x^3 + 2x^2 - 5x + 1?',
        options: ['3x^2 + 4x - 5', '3x^2 + 2x - 5', 'x^2 + 4x - 5', '3x^2 + 4x'],
        correctAnswer: '3x^2 + 4x - 5',
        points: 3
      },
      {
        id: '2-2',
        type: 'essay',
        text: 'Explain the Fundamental Theorem of Calculus and provide an example of its application.',
        points: 5
      }
    ],
    createdAt: '2024-02-20T11:45:00Z',
    updatedAt: '2024-04-15T16:30:00Z'
  }
];

// Mock Chat Messages
export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'user',
    content: 'I need to create a quiz for my computer science class on programming basics.',
    timestamp: '2024-05-15T09:30:00Z'
  },
  {
    id: '2',
    sender: 'agent',
    content: 'I\'d be happy to help you create a quiz on programming basics. Let\'s start by defining the learning outcomes you want to assess.',
    timestamp: '2024-05-15T09:30:15Z'
  },
  {
    id: '3',
    sender: 'user',
    content: 'I want to assess their understanding of variables, data types, and basic control structures.',
    timestamp: '2024-05-15T09:31:20Z'
  },
  {
    id: '4',
    sender: 'agent',
    content: 'Great! Those are fundamental programming concepts. Based on these learning outcomes, I recommend a mix of multiple-choice, true/false, and short-answer questions. Would you like me to suggest some specific questions?',
    timestamp: '2024-05-15T09:31:45Z'
  }
];

// Mock Activity Items
export const mockActivities: ActivityItem[] = [
  {
    id: '1',
    title: 'New Course Created',
    description: 'You created "Introduction to Computer Science"',
    timestamp: '2024-05-15T14:30:00Z',
    type: 'course'
  },
  {
    id: '2',
    title: 'Quiz Completed',
    description: '15 students completed "Programming Fundamentals Quiz"',
    timestamp: '2024-05-14T10:15:00Z',
    type: 'quiz'
  },
  {
    id: '3',
    title: 'New Student Enrolled',
    description: 'Emma Wilson enrolled in "Advanced Mathematics"',
    timestamp: '2024-05-13T16:45:00Z',
    type: 'student'
  },
  {
    id: '4',
    title: 'System Update',
    description: 'New features added to the quiz creation tool',
    timestamp: '2024-05-12T09:20:00Z',
    type: 'system'
  }
];

// Mock Stats Data
export const mockStats = [
  {
    title: 'Total Courses',
    value: 12,
    change: 2,
    icon: React.createElement(BookOpen, { className: "h-5 w-5 text-blue-500" })
  },
  {
    title: 'Active Students',
    value: 157,
    change: 12,
    icon: React.createElement(Users, { className: "h-5 w-5 text-purple-500" })
  },
  {
    title: 'Quizzes Created',
    value: 28,
    change: 5,
    icon: React.createElement(FileCheck, { className: "h-5 w-5 text-teal-500" })
  },
  {
    title: 'Pending Tasks',
    value: 8,
    change: -3,
    icon: React.createElement(Bell, { className: "h-5 w-5 text-amber-500" })
  }
];