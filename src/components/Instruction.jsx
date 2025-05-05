import React from 'react';

const Instruction = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-10 inter-400">
      <h1 className="text-2xl font-semibold mb-6 text-center text-slate-700">Listening Test Instructions</h1>

      <p className="mb-4 text-slate-700">
        Welcome to the Listening Test. The test is divided into four sections, and each section has different question types. Please read the instructions carefully before you begin:
      </p>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Section 1:</h2>
          <ul className="list-disc list-inside ml-4 text-slate-800">
            <li>Write <strong>NO MORE THAN TWO WORDS AND/OR A NUMBER</strong> for each answer.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-800">Section 2:</h2>
          <ul className="list-disc list-inside ml-4 text-slate-800">
            <li>Choose the correct answer for multiple-choice questions.</li>
            <li>Write <strong>NO MORE THAN TWO WORDS AND/OR A NUMBER</strong> for each answer.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-800">Section 3:</h2>
          <ul className="list-disc list-inside ml-4 text-slate-800">
            <li>Choose the correct answer for multiple-choice questions.</li>
            <li>Select <strong>FOUR answers</strong> from the given box.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-800">Section 4:</h2>
          <ul className="list-disc list-inside ml-4 text-slate-800">
            <li>Choose the correct answer for multiple-choice questions.</li>
            <li>Write <strong>ONLY ONE WORD</strong> for each answer.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-800">Important Notes:</h2>
          <ul className="list-disc list-inside ml-4 text-slate-800">
            <li>The audio will play <strong>only once</strong> for each section.</li>
            <li>You must write your answers <strong>while listening</strong> to the audio.</li>
            <li>A <strong>countdown timer</strong> will run throughout each section.</li>
            <li>After the audio ends, you will be automatically taken to the <strong>next section</strong>.</li>
            <li>Upon completing all four sections, your <strong>result page</strong> will display your performance and correct answers.</li>
            <li>It is <strong>mandatory</strong> to download your result as a PDF after completion.</li>
            <li>We would love to hear your <strong>thoughts or feedback</strong> on how we can improve your experience!</li>
          </ul>
        </div>

        <button
            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-md font-medium font-mono rounded-lg border border-gray-200 bg-slate-900 text-gray-100 shadow-2xs hover:bg-slate-800 focus:outline-hidden focus:bg-slate-500 disabled:opacity-50 inter-400"
            onClick={() => window.location.href = '/listening-section-1'}
          >
            Start Test Now
          </button>
      </div>
    </div>
  );
};

export default Instruction;
