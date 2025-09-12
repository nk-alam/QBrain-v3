import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle, Brain, Code } from 'lucide-react';

interface TechnicalQuizProps {
  onDataChange: (data: any) => void;
  data: any;
}

const TechnicalQuiz: React.FC<TechnicalQuizProps> = ({ onDataChange, data }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);

  // Sample question bank - in a real app, this would come from an API
  const questionBank = [
    {
      question: "What is the primary purpose of IoT in smart home applications?",
      options: [
        "To increase internet speed",
        "To connect and automate home devices for remote control and monitoring",
        "To reduce electricity consumption only",
        "To improve WiFi coverage"
      ],
      correct: 1,
      category: "IoT"
    },
    {
      question: "Which programming language is most commonly used for AI/ML applications?",
      options: ["Java", "C++", "Python", "JavaScript"],
      correct: 2,
      category: "AI/ML"
    },
    {
      question: "What does PWM stand for in embedded systems?",
      options: [
        "Power Width Modulation",
        "Pulse Width Modulation",
        "Program Width Management",
        "Processing Width Mechanism"
      ],
      correct: 1,
      category: "Embedded"
    },
    {
      question: "In React, what hook is used to manage state in functional components?",
      options: ["useEffect", "useState", "useContext", "useReducer"],
      correct: 1,
      category: "Development"
    },
    {
      question: "What is the main advantage of using MQTT protocol in IoT applications?",
      options: [
        "High bandwidth usage",
        "Lightweight messaging for low-power devices",
        "Complex security features",
        "Only works with WiFi"
      ],
      correct: 1,
      category: "IoT"
    },
    {
      question: "Which component is essential for circuit protection in hardware design?",
      options: ["Resistor", "Capacitor", "Fuse", "Inductor"],
      correct: 2,
      category: "Hardware"
    },
    {
      question: "What is supervised learning in machine learning?",
      options: [
        "Learning without any data",
        "Learning from labeled training data",
        "Learning only from images",
        "Learning without human intervention"
      ],
      correct: 1,
      category: "AI/ML"
    },
    {
      question: "Which database type is best suited for IoT data storage?",
      options: [
        "Only SQL databases",
        "Only NoSQL databases", 
        "Both SQL and NoSQL depending on requirements",
        "File-based storage only"
      ],
      correct: 2,
      category: "Database"
    },
    {
      question: "What is the purpose of a pull-up resistor in digital circuits?",
      options: [
        "To increase current flow",
        "To ensure a logic high state when input is floating",
        "To reduce power consumption",
        "To filter noise signals"
      ],
      correct: 1,
      category: "Hardware"
    },
    {
      question: "Which UI/UX principle focuses on making interfaces intuitive?",
      options: [
        "Complexity",
        "Usability",
        "Aesthetics only",
        "Color theory"
      ],
      correct: 1,
      category: "UI/UX"
    }
  ];

  // Timer effect
  useEffect(() => {
    if (quizStarted && !isCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      completeQuiz();
    }
  }, [timeLeft, quizStarted, isCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setSelectedAnswers(new Array(questionBank.length).fill(-1));
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questionBank.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const completeQuiz = () => {
    const correctAnswers = selectedAnswers.reduce((count, answer, index) => {
      return answer === questionBank[index].correct ? count + 1 : count;
    }, 0);
    
    const finalScore = Math.round((correctAnswers / questionBank.length) * 100);
    setScore(finalScore);
    setIsCompleted(true);
    
    onDataChange({
      quizResults: {
        score: finalScore,
        correctAnswers,
        totalQuestions: questionBank.length,
        timeSpent: 1800 - timeLeft,
        passed: finalScore >= 70
      }
    });
  };

  if (!quizStarted) {
    return (
      <div className="text-center space-y-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-cyan-400/20 rounded-2xl blur-xl"></div>
          <div className="relative bg-slate-700/50 border border-purple-400/30 rounded-2xl p-8">
            <Brain className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Technical Assessment</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              This quiz will test your knowledge in various technical domains including IoT, AI/ML, 
              embedded systems, and software development. You'll have 30 minutes to complete 10 questions.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-600/50 rounded-lg p-4">
                <div className="text-cyan-400 font-semibold">Duration</div>
                <div className="text-white">30 minutes</div>
              </div>
              <div className="bg-slate-600/50 rounded-lg p-4">
                <div className="text-green-400 font-semibold">Questions</div>
                <div className="text-white">10 total</div>
              </div>
              <div className="bg-slate-600/50 rounded-lg p-4">
                <div className="text-yellow-400 font-semibold">Pass Mark</div>
                <div className="text-white">70%</div>
              </div>
            </div>
            
            <button
              onClick={startQuiz}
              className="px-8 py-3 bg-gradient-to-r from-purple-400 to-cyan-400 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-purple-400/25 transition-all duration-300 transform hover:scale-105"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="text-center space-y-6">
        <div className="relative group">
          <div className={`absolute inset-0 ${score >= 70 ? 'bg-gradient-to-r from-green-400/20 to-cyan-400/20' : 'bg-gradient-to-r from-red-400/20 to-orange-400/20'} rounded-2xl blur-xl`}></div>
          <div className={`relative bg-slate-700/50 border ${score >= 70 ? 'border-green-400/30' : 'border-red-400/30'} rounded-2xl p-8`}>
            {score >= 70 ? (
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            ) : (
              <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            )}
            
            <h3 className="text-2xl font-bold text-white mb-4">
              {score >= 70 ? 'Congratulations!' : 'Quiz Complete'}
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-600/50 rounded-lg p-4">
                <div className="text-cyan-400 font-semibold">Your Score</div>
                <div className={`text-2xl font-bold ${score >= 70 ? 'text-green-400' : 'text-red-400'}`}>
                  {score}%
                </div>
              </div>
              <div className="bg-slate-600/50 rounded-lg p-4">
                <div className="text-blue-400 font-semibold">Correct Answers</div>
                <div className="text-white text-2xl font-bold">
                  {selectedAnswers.filter((answer, index) => answer === questionBank[index].correct).length}/{questionBank.length}
                </div>
              </div>
              <div className="bg-slate-600/50 rounded-lg p-4">
                <div className="text-purple-400 font-semibold">Time Spent</div>
                <div className="text-white text-2xl font-bold">
                  {formatTime(1800 - timeLeft)}
                </div>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${score >= 70 ? 'bg-green-400/10 border border-green-400/30' : 'bg-red-400/10 border border-red-400/30'}`}>
              <p className={`${score >= 70 ? 'text-green-400' : 'text-red-400'} font-medium`}>
                {score >= 70 
                  ? 'Excellent work! You\'ve qualified for the next step. We\'ll review your application and contact you for the interview.'
                  : 'You need a minimum of 70% to proceed. Don\'t worry - you can retake the quiz after 24 hours or contact us for guidance.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <div className="flex justify-between items-center p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-400">
            Question {currentQuestion + 1} of {questionBank.length}
          </div>
          <div className="w-32 bg-slate-600 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-green-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questionBank.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-yellow-400">
          <Clock className="h-4 w-4" />
          <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Question */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-purple-400/5 rounded-xl blur-xl"></div>
        <div className="relative bg-slate-700/50 border border-slate-600/30 rounded-xl p-6">
          <div className="flex items-start space-x-3 mb-4">
            <Code className="h-6 w-6 text-cyan-400 mt-1 flex-shrink-0" />
            <div>
              <div className="text-sm text-cyan-400 font-medium mb-2">
                {questionBank[currentQuestion].category}
              </div>
              <h3 className="text-xl font-semibold text-white leading-relaxed">
                {questionBank[currentQuestion].question}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {questionBank[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            className={`w-full p-4 text-left rounded-xl border transition-all duration-300 ${
              selectedAnswers[currentQuestion] === index
                ? 'bg-cyan-400/20 border-cyan-400 text-white'
                : 'bg-slate-700/30 border-slate-600/30 text-gray-300 hover:bg-slate-700/50 hover:border-slate-500/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedAnswers[currentQuestion] === index
                  ? 'border-cyan-400 bg-cyan-400'
                  : 'border-gray-500'
              }`}>
                {selectedAnswers[currentQuestion] === index && (
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                )}
              </div>
              <span className="flex-1">{option}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={previousQuestion}
          disabled={currentQuestion === 0}
          className={`px-6 py-2 rounded-full transition-all duration-300 ${
            currentQuestion === 0
              ? 'bg-slate-700/50 text-gray-500 cursor-not-allowed'
              : 'bg-slate-700 text-white hover:bg-slate-600'
          }`}
        >
          Previous
        </button>

        <div className="text-sm text-gray-400">
          {selectedAnswers.filter(a => a !== -1).length} of {questionBank.length} answered
        </div>

        {currentQuestion === questionBank.length - 1 ? (
          <button
            onClick={completeQuiz}
            className="px-6 py-2 bg-gradient-to-r from-green-400 to-cyan-400 text-black font-semibold rounded-full hover:shadow-lg transition-all duration-300"
          >
            Complete Quiz
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-full hover:shadow-lg transition-all duration-300"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default TechnicalQuiz;