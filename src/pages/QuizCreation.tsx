import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Bookmark, FileText, Download, CheckSquare, Flag, Lightbulb, ChevronLeft } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { mockChatMessages } from '../services/mockData';
import { ChatMessage } from '../types';
import { useToast } from '../context/ToastContext';

const QuizCreation: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [outcomes, setOutcomes] = useState<string[]>(['']);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToast();
  
  // Scroll to bottom of chat whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsWaitingForResponse(true);
    
    // Simulate agent response after a delay
    setTimeout(() => {
      const agentResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        content: getAgentResponse(userMessage.content),
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, agentResponse]);
      setIsWaitingForResponse(false);
    }, 1500);
  };
  
  const getAgentResponse = (userMessage: string): string => {
    // Simple response logic based on the current step and user message
    if (step === 1) {
      if (userMessage.toLowerCase().includes('learning outcome') || 
          userMessage.toLowerCase().includes('objective')) {
        return "Great! Let's define some specific learning outcomes for your quiz. These will guide the types of questions we create. For example, if you're teaching programming, outcomes might include 'Understand variables and data types' or 'Apply loops to solve problems'. What learning outcomes would you like to focus on?";
      }
      return "To create an effective quiz, we should start by defining the specific learning outcomes you want to assess. What key concepts or skills should students demonstrate mastery of through this quiz?";
    }
    
    if (step === 2) {
      if (userMessage.toLowerCase().includes('format') || 
          userMessage.toLowerCase().includes('question')) {
        return "Based on your learning outcomes, I recommend using a mix of question formats: multiple-choice questions to test conceptual understanding, true/false for factual knowledge, and short-answer questions to assess deeper comprehension. Would you like me to generate sample questions in these formats?";
      }
      return "Now that we have our learning outcomes, let's think about the quiz format. Different question types serve different assessment purposes. What types of questions would you like to include? Options include multiple-choice, true/false, short-answer, and essay questions.";
    }
    
    return "I understand. Let me generate some quiz content aligned with those outcomes. I'll create a balanced mix of questions that assess different levels of understanding. Would you like me to focus on any particular aspect or difficulty level?";
  };
  
  const handleOutcomeChange = (index: number, value: string) => {
    const newOutcomes = [...outcomes];
    newOutcomes[index] = value;
    setOutcomes(newOutcomes);
  };
  
  const addOutcome = () => {
    setOutcomes([...outcomes, '']);
  };
  
  const removeOutcome = (index: number) => {
    const newOutcomes = [...outcomes];
    newOutcomes.splice(index, 1);
    setOutcomes(newOutcomes);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const moveToNextStep = () => {
    if (step === 1 && (!title || outcomes.every(o => !o.trim()))) {
      addToast({
        type: 'error',
        title: 'Missing Information',
        message: 'Please provide a quiz title and at least one learning outcome'
      });
      return;
    }
    
    setStep(step + 1);
    
    if (step === 1) {
      // Add system message when moving to chat
      setTimeout(() => {
        const systemMessage: ChatMessage = {
          id: Date.now().toString(),
          sender: 'agent',
          content: `I'll help you create a quiz for "${title}". Let's start by discussing your learning outcomes in more detail. How would you like to approach this quiz?`,
          timestamp: new Date().toISOString()
        };
        setMessages([systemMessage]);
      }, 500);
    }
  };
  
  const resetCreation = () => {
    if (window.confirm('Are you sure you want to start over? All progress will be lost.')) {
      setStep(1);
      setTitle('');
      setOutcomes(['']);
      setMessages([]);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Create Quiz</h1>
        {step > 1 && (
          <Button 
            variant="outline" 
            leftIcon={<ChevronLeft size={16} />}
            onClick={() => setStep(step - 1)}
          >
            Back
          </Button>
        )}
      </div>
      
      {/* Step indicator */}
      <div className="relative">
        <div className="flex mb-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 relative">
              <div className={`flex flex-col items-center`}>
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center font-medium z-10
                  ${s < step ? 'bg-green-500 text-white' : 
                    s === step ? 'bg-blue-600 text-white' : 
                    'bg-gray-200 text-gray-500'}
                `}>
                  {s < step ? '✓' : s}
                </div>
                <div className="text-xs font-medium mt-2 text-center">
                  {s === 1 ? 'Define Outcomes' : s === 2 ? 'Generate Content' : 'Review & Export'}
                </div>
              </div>
              
              {s < 3 && (
                <div className={`absolute top-4 -left-1/2 w-full h-0.5 ${
                  s < step ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Step content */}
      {step === 1 && (
        <Card title="Define Learning Outcomes" className="border-0 shadow-sm">
          <div className="space-y-6">
            <Input
              label="Quiz Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter quiz title"
              required
            />
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Learning Outcomes
                </label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={addOutcome}
                >
                  Add Outcome
                </Button>
              </div>
              
              <div className="space-y-3">
                {outcomes.map((outcome, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={outcome}
                      onChange={(e) => handleOutcomeChange(index, e.target.value)}
                      placeholder={`Outcome ${index + 1}`}
                      className="flex-1"
                    />
                    {outcomes.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeOutcome(index)}
                        className="mt-1"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-gray-500 mt-2">
                Define what students should know or be able to do after taking this quiz
              </p>
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={resetCreation}>
                Reset
              </Button>
              <Button variant="primary" onClick={moveToNextStep}>
                Continue
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      {step === 2 && (
        <Card title="Generate Quiz Content" className="border-0 shadow-sm">
          <div className="flex flex-col h-[500px]">
            <div className="flex-1 overflow-y-auto mb-4 pb-4 space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`
                      max-w-[75%] rounded-lg p-3
                      ${message.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'}
                    `}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isWaitingForResponse && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none max-w-[75%] p-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="relative">
              <textarea 
                className="w-full border border-gray-300 rounded-lg pr-12 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Type your message here..."
                rows={3}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isWaitingForResponse}
              />
              <button 
                className={`absolute right-2 bottom-2 p-2 rounded-full ${
                  inputMessage.trim() && !isWaitingForResponse
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isWaitingForResponse}
              >
                <SendHorizontal size={20} />
              </button>
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  leftIcon={<Bookmark size={14} />}
                >
                  Save Draft
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  leftIcon={<Lightbulb size={14} />}
                >
                  Suggestions
                </Button>
              </div>
              <Button variant="primary" onClick={moveToNextStep}>
                Continue to Review
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      {step === 3 && (
        <Card title="Review & Export Quiz" className="border-0 shadow-sm">
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <CheckSquare size={16} className="mr-1" />
                  <span>10 questions</span>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700">Learning Outcomes:</h4>
                <ul className="mt-1 space-y-1">
                  {outcomes.filter(o => o.trim()).map((outcome, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="flex-shrink-0 w-5">•</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Questions Preview:
                </h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-blue-600">Multiple Choice</span>
                      <span className="text-xs text-gray-500">2 points</span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 mt-1">
                      Which of the following is a correct example of variable declaration in JavaScript?
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-green-600">True/False</span>
                      <span className="text-xs text-gray-500">1 point</span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 mt-1">
                      Arrays in JavaScript can store different types of values.
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-purple-600">Short Answer</span>
                      <span className="text-xs text-gray-500">3 points</span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 mt-1">
                      Explain the difference between let, const, and var in JavaScript.
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center py-2">
                    <button className="text-blue-600 text-sm hover:underline">
                      Show more questions...
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Export Options:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <Button 
                  variant="outline" 
                  className="justify-start" 
                  leftIcon={<FileText size={16} />}
                >
                  PDF Document
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start" 
                  leftIcon={<Download size={16} />}
                >
                  Word Document
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start" 
                  leftIcon={<Flag size={16} />}
                >
                  Canvas LMS Format
                </Button>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button variant="outline" onClick={() => setStep(2)}>
                Edit Questions
              </Button>
              <Button 
                variant="primary"
                onClick={() => {
                  addToast({
                    type: 'success',
                    title: 'Quiz Created',
                    message: `"${title}" has been created successfully.`
                  });
                }}
              >
                Finalize Quiz
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default QuizCreation;