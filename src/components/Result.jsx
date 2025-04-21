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
    };

    setSectionScores(scores);
    setTotalScore(scores.section1 + scores.section2 + scores.section3 + scores.section4);
    setTotalQuestions(40); // Assuming each section has 10 questions
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Test Results</h1>
        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-semibold">Name:</span> {localStorage.getItem('userName')}
          </p>
          <p className="font-semibold">Result:</p>
          <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Section</th>
                <th className="border border-gray-300 px-4 py-2 text-gray-700">Score</th>
              </tr>
            </thead>
            <tbody>
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
            <span className="font-semibold">Score:</span> {totalScore} out of {totalQuestions}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Percentage:</span> {((totalScore / totalQuestions) * 100).toFixed(2)}%
          </p>
        </div>
        <div className="mt-6 space-y-4">
          <button
            onClick={handleDownloadPDF}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Download Results as PDF
          </button>
          <button
            onClick={() => navigate('/speaking-test')}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Take Another Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;