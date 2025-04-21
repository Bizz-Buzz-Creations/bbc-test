import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FillInBlanks = () => {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  // Sample questions - replace with your actual questions
  const questions = [
    {
      id: 1,
      text: "The capital of France is ___.",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: "Paris"
    },
    {
      id: 2,
      text: "The largest planet in our solar system is ___.",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Jupiter"
    }
  ];

  const handleDragStart = (e, option) => {
    e.dataTransfer.setData('text/plain', option);
  };

  const handleDrop = (e, questionId) => {
    e.preventDefault();
    const answer = e.dataTransfer.getData('text/plain');
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    // Store answers in localStorage
    localStorage.setItem('fillInBlanksAnswers', JSON.stringify(answers));
    navigate('/mcq');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Fill in the Blanks</h1>
        <div className="space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="border p-4 rounded-lg">
              <p className="mb-4">{question.text}</p>
              <div
                className="border-2 border-dashed border-gray-300 p-4 rounded-lg min-h-12"
                onDrop={(e) => handleDrop(e, question.id)}
                onDragOver={handleDragOver}
              >
                {answers[question.id] && (
                  <span className="bg-blue-100 px-3 py-1 rounded">
                    {answers[question.id]}
                  </span>
                )}
              </div>
              <div className="mt-4 flex gap-2">
                {question.options.map((option) => (
                  <span
                    key={option}
                    draggable
                    onDragStart={(e) => handleDragStart(e, option)}
                    className="bg-gray-100 px-3 py-1 rounded cursor-move hover:bg-gray-200"
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Continue to MCQ
        </button>
      </div>
    </div>
  );
};

export default FillInBlanks; 