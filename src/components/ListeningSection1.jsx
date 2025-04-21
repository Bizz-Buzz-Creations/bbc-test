import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import audioFile from '../assets/audio/listening-11/11.1.mp3';
import Cookies from 'js-cookie';

const ListeningSection1 = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const [countdown, setCountdown] = useState(0);

  const correctAnswers = {
    q1: 'Grieg',
    q2: 'March 15th',
    q3: 'Ellendale',
    q4: 'W5 2AT',
    q5: '0',
    q6: '8 months',
    q7: '1',
    q8: 'Back door',
    q9: 'G4168770',
    q10: 'Silver-colored cloth'
  }

  const startCountdown = () => {
    const duration = Math.floor(audioRef.current.duration);

    setCountdown(duration);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  

  const handleSubmit = () => {
    let sectionScore = 0;

    for (let i = 1; i <= 10; i++) {
      const inputVal = document.getElementById(`q${i}`).value.trim().toLowerCase();
      const correctAnswer = correctAnswers[`q${i}`];

      if (correctAnswer && inputVal === correctAnswer.toLowerCase()) {
        sectionScore++;
      }
    }
    setScore(sectionScore);
    Cookies.set('listeningSection1Score', sectionScore, { expires: 1 });
    navigate('/listening-section-2');
  }

  const handleAudioEnd = () => {
    setIsPlaying(false);
    navigate('/listening-section-2');
  };

  const handleAudioPlay = () => {
    setIsPlaying(true);
    const audio = document.querySelector('audio');
    audio.style.display = 'none';
    startCountdown();
    const showCountdown = document.querySelector('#countdown');
    showCountdown.style.display = 'block';
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 mt-10 rounded-lg shadow-md w-96">
        <div className="flex flex-col items-center">
          <audio
            ref={audioRef}
            src={audioFile} // Replace with your actual audio file path
            controls
            onPlay={handleAudioPlay}
            onPause={() => setIsPlaying(false)}
            onEnded={handleAudioEnd}
            className="mb-4"
          />
          <strong id='countdown' className='hidden'>{formatTime(countdown)}</strong>
          <p className="text-gray-600 text-center ">
            Please listen to the audio carefully. You will not be able to replay it.
          </p>
        </div>
      </div>
      <div className="text-left">
        <div className="flex justify-center items-start min-h-screen p-12">
          <div className="stacked-paper w-full h-fit p-5 mx-auto bg-gray-100 bg-white border-t-1 border-l-1 border-gray-400">
            <h1 className="text-2xl text-slate-900 font-semibold">Section 1</h1>
            <p className='text-slate-800'><span className="font-medium">QUESTIONS 1-10:</span> Write <span className="font-medium">NO MORE THAN TWO WORDS AND/OR A NUMBER</span> for each answer.</p>
            <div className="flex items-center bg-white">
              <div className='flex flex-col'>
                <h2 className="text-xl font-semibold text-gray-700 my-4">Registration Form -</h2>

                {/* <!-- 1 --> */}
                <div className="flex items-center gap-2">
                  <p className="block text-gray-700 mb-1">Example: Type of crime report -</p>
                  <span><i>Answer:</i> <u>Robbery</u></span>
                </div>

                {/* <!-- 2 --> */}
                <div className="flex items-center gap-2">
                  <label className="block text-gray-700 mb-1">Name: Anna <span className='font-semibold'>(1)</span></label>
                  <input id="q1" type="text" className="border-b focus:ring-none focus:outline-none border-slate-800 px-1 py-1 text-blue-800" />
                </div>

                {/* <!-- 3 --> */}
                <div className="flex items-center gap-2">
                  <label className="block text-gray-700 mb-1">Date of Birth: <span className='font-semibold'>(2)</span></label>
                  <input id="q2" type="text" className="border-b focus:ring-none focus:outline-none border-slate-800 px-1 py-1 text-blue-800" />
                </div>

                {/* <!-- 4 --> */}
                <div className="flex items-center gap-2">
                  <label className="block text-gray-700 mb-1">Address: 4 <span className='font-semibold'>(3)</span></label>
                  <input id="q3" type="text" className="border-b focus:ring-none focus:outline-none border-slate-800 px-1 py-1 text-blue-800" />
                  <p> St.</p>
                </div>

                {/* <!-- 5 --> */}
                <div className="flex items-center gap-2">
                  <label className="block text-gray-700 mb-1">Post Code: <span className='font-semibold'>(4)</span></label>
                  <input id="q4" type="text" className="border-b focus:ring-none focus:outline-none border-slate-800 px-1 py-1 text-blue-800" />
                </div>

                {/* <!-- 6 --> */}
                <div className="flex items-center gap-2">
                  <p className="block text-gray-700 mb-1">Nationality: Grenadian</p>
                </div>

                {/* <!-- 7 --> */}
                <div className="flex items-center gap-2">
                  <label className="block text-gray-700 mb-1">Number of previous burglaries: <span className='font-semibold'>(5)</span></label>
                  <input id="q5" type="text" className="border-b focus:ring-none focus:outline-none border-slate-800 px-1 py-1 text-blue-800" />
                </div>

                {/* <!-- 8 --> */}
                <div className="flex items-center gap-2">
                  <label className="block text-gray-700 mb-1">Time of apartment tenancy: <span className='font-semibold'>(6)</span></label>
                  <input id="q6" className="border-b focus:ring-none focus:outline-none border-slate-800 px-1 py-1 text-blue-800" />
                </div>

                {/* <!-- 9 --> */}
                <div className="flex items-center gap-2">
                  <label className="block text-gray-700 mb-1">Number of occupants: <span className='font-semibold'>(7)</span></label>
                  <input id="q7" type="text" className="border-b focus:ring-none focus:outline-none border-slate-800 px-1 py-1 text-blue-800" />
                </div>

                {/* <!-- 10 --> */}
                <div className="flex items-center gap-2">
                  <label className="block text-gray-700 mb-1">Entry point of burglar: <span className='font-semibold'>(8)</span></label>
                  <input id="q8" type="text" className="border-b focus:ring-none focus:outline-none border-slate-800 px-1 py-1 text-blue-800" />
                </div>

                {/* <!-- Lost Property Section --> */}
                <h3 className="text-lg font-semibold text-gray-700 my-4">Details of Lost Property</h3>

                <div className="flex items-center">
                  <label className="block text-gray-700 mb-1">Serial number of lost computer: <span className='font-semibold'>(9)</span></label>
                  <input id="q9" type="text" className="border-b focus:ring-none focus:outline-none border-slate-800 px-1 py-1 text-blue-800" />
                </div>

                <div className='flex items-center'>
                  <label className="block text-gray-700 mb-1">Material of stolen purse: <span className='font-semibold'>(10)</span></label>
                  <input id="q10" type="text" className="border-b focus:ring-none focus:outline-none border-slate-800 px-1 py-1 text-blue-800" />
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white font-semibold px-6 py-2 rounded hover:bg-blue-600"
              >
                Submit Test
              </button>
              {score !== null && (
                <p className="mt-4 text-lg font-bold">Your score: {score}/10</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default ListeningSection1;