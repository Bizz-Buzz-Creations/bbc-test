import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MCQ = () => {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  // Sample questions - replace with your actual questions
  const questions = [
    {
      id: 1,
      question: "What is the main theme of the audio?",
      options: [
        "Environmental conservation",
        "Space exploration",
        "Historical events",
        "Technological advancement"
      ],
      correctAnswer: "Environmental conservation"
    },
    {
      id: 2,
      question: "What was the speaker's main concern?",
      options: [
        "Economic growth",
        "Climate change",
        "Population growth",
        "Education reform"
      ],
      correctAnswer: "Climate change"
    }
  ];

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    // Store answers in localStorage
    localStorage.setItem('mcqAnswers', JSON.stringify(answers));
    navigate('/result');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Multiple Choice Questions</h1>
        <div className="space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="border p-4 rounded-lg">
              <p className="font-semibold mb-4">{question.question}</p>
              <div className="space-y-2">
                {question.options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() => handleAnswerSelect(question.id, option)}
                      className="h-4 w-4 text-blue-600"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit and View Results
        </button>
      </div>
    </div>
  );
};

export default MCQ; 