import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pdf } from '@react-pdf/renderer';
import ListeningResultPDF from './ListeningResultPDF';
import Cookies from 'js-cookie';

const Result = () => {
  const [totalScore, setTotalScore] = useState(0);
  const [sectionScores, setSectionScores] = useState({});
  const [totalQuestions, setTotalQuestions] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const scores = {
      section1: parseInt(Cookies.get('listeningSection1Score') || 0),
      section2: parseInt(Cookies.get('listeningSection2Score') || 0),
      section3: parseInt(Cookies.get('listeningSection3Score') || 0),
      section4: parseInt(Cookies.get('listeningSection4Score') || 0),
      savedAnswers1: JSON.parse(Cookies.get('listeningSection1Answers') || '{}'),
      savedAnswers2: JSON.parse(Cookies.get('listeningSection2Answers') || '{}'),
      savedAnswers3: JSON.parse(Cookies.get('listeningSection3Answers') || '{}'),
      savedAnswers4: JSON.parse(Cookies.get('listeningSection4Answers') || '{}'),
    };

    setSectionScores(scores);
    setTotalScore(scores.section1 + scores.section2 + scores.section3 + scores.section4);
    setTotalQuestions(40); // Assuming each section has 10 questions
  }, []);

  console.log('Section Scores:', sectionScores);

  const handleDownloadPDF = async () => {
    const userName = localStorage.getItem('userName') || 'User';
    const doc = (
      <ListeningResultPDF
        userName={userName}
        sectionScores={sectionScores}
        totalScore={totalScore}
        totalQuestions={totalQuestions}
      />
    );

    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${userName}_listening_test_results.pdf`;
    link.click();
  };

  // const formatAnswers = (answersObj) => {
  //   if (!answersObj || Object.keys(answersObj).length === 0) return 'No answers';

  //   return Object.entries(answersObj)
  //     .map(([key, value]) => `${key.toUpperCase()}: ${value}`)
  //     .join(', ');
  // };

  return (
    <div className="flex-1 bg-purple-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center font-mono">Test Results</h1>
        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-semibold inter-500 text-lg">Name:</span> {localStorage.getItem('userName')}
          </p>
          <p className="font-semibold inter-500 text-xl">Result:</p>
          <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 inter-700">Section</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 inter-700">Score</th>
              </tr>
            </thead>
            <tbody className='inter-400'>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Listening Section 1</td>
                <td className="border border-gray-300 px-4 py-2">{sectionScores.section1}/10</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Listening Section 2</td>
                <td className="border border-gray-300 px-4 py-2">{sectionScores.section2}/10</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Listening Section 3</td>
                <td className="border border-gray-300 px-4 py-2">{sectionScores.section3}/10</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Listening Section 4</td>
                <td className="border border-gray-300 px-4 py-2">{sectionScores.section4}/10</td>
              </tr>
            </tbody>
          </table>

          <p className="text-lg">
            <span className="font-semibold inter-500">Score:</span> {totalScore} out of {totalQuestions}
          </p>
          <p className="text-lg">
            <span className="font-semibold inter-500">Percentage:</span> {((totalScore / totalQuestions) * 100).toFixed(2)}%
          </p>
        </div>
        <div className="mt-6 space-y-4">
          <button
            onClick={handleDownloadPDF}
            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-md font-medium font-mono rounded-lg border border-gray-200 bg-slate-900 text-gray-100 shadow-2xs hover:bg-slate-800 focus:outline-hidden focus:bg-slate-500 disabled:opacity-50"
          >
            Download Results as PDF
          </button>
          {/* <button
            onClick={() => navigate('/speaking-test')}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Take Another Test
          </button> */}

          <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 inter-700">Section 1</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 inter-700">Section 2</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 inter-700">Section 3</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 inter-700">Section 4</th>
              </tr>
            </thead>
            <tbody className='inter-400'>
              {Array.from({ length: 10 }, (_, index) => {
                const qNum = index + 1;
                const qKey = `${qNum}`;
                return (
                  
                  <tr key={qKey} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{sectionScores.savedAnswers1?.[qKey] || '-'}</td>
                    <td className="border border-gray-300 px-4 py-2">{sectionScores.savedAnswers2?.[qKey] || '-'}</td>
                    <td className="border border-gray-300 px-4 py-2">{sectionScores.savedAnswers3?.[qKey] || '-'}</td>
                    <td className="border border-gray-300 px-4 py-2">{sectionScores.savedAnswers4?.[qKey] || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Result;