import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import audioFile from '../assets/audio/listening-11/11.2.mp3';
import Cookies from 'js-cookie';

const ListeningSection2 = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(null);
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const correctAnswers = {
    q1: 'C',
    q2: 'B',
    q3: 'B',
    q4: 'A',
    ex5: 'Teaching methods',
    ex6: 'Accomodation',
    ex7: 'Flats',
    ex8: 'Disco',
    ex9: 'International Evening',
    ex10: 'Two minutes'
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
    const userAnswers = {};

    for (let i = 1; i <= 4; i++) {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      userAnswers[`${i}`] = selected ? selected.value : ''; // store original (not lowercased) input

      if (selected && selected.value === correctAnswers[`q${i}`]) {
        sectionScore++;
      }
    }

    for (let j = 5; j <= 10; j++) {
      const inputVal = document.getElementById(`ex${j}`).value.trim().toLowerCase();
      const correctAnswer = correctAnswers[`ex${j}`];

      userAnswers[`${j}`] = inputVal; // store original (not lowercased) input

      if (correctAnswer && inputVal === correctAnswer.toLowerCase()) {
        sectionScore++;
      }
    }

    setScore(sectionScore);
    Cookies.set('listeningSection2Score', sectionScore, { expires: 1 });
    Cookies.set('listeningSection2Answers', JSON.stringify(userAnswers), { expires: 1 });

    setIsPlaying(false);
    navigate('/listening-section-3');
  };

  const handleAudioPlay = () => {
    setIsPlaying(true);
    const audio = document.querySelector('audio');
    audio.style.display = 'none';
    startCountdown();
    const showCountdown = document.querySelector('#countdown');
    showCountdown.style.display = 'block';
    showCountdown.style.fontFamily = 'monospace';
    showCountdown.style.fontSize = '1.5rem';
    showCountdown.style.color = '#6a5acd'
  }

  const handleCanPlay = () => {
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-50">
      <div className="bg-white p-8 mt-10 rounded-lg shadow-md w-96">
        <div className="flex flex-col items-center">
          {isLoading && (
            <div className="flex items-center justify-center h-16">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-blue-500">Loading audio...</span>
            </div>
          )}
          <audio
            ref={audioRef}
            src={audioFile}
            controls
            controlsList="nodownload"
            onCanPlay={handleCanPlay}
            onPlay={handleAudioPlay}
            onPause={() => setIsPlaying(false)}
            onEnded={handleSubmit}
            className={`mb-4 ${isLoading ? "hidden" : "block"}`}>
            Your browser does not support the audio element.
          </audio>
          <strong id='countdown' className='hidden'>{formatTime(countdown)}</strong>
          <p className="text-slate-600 font-mono text-xs text-center">
            Please listen to the audio carefully. You will not be able to replay it.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-start min-h-screen p-12">
        <div className="stacked-paper w-full md:w-3xl h-fit mx-auto bg-white border border-gray-400 rounded-lg shadow-md">
          <div className='bg-red-50 rounded-t-lg p-5 border-b border-gray-300'>
            <h2 className="text-xl font-bold font-mono">SECTION 2</h2>
            <p className='text-slate-800 inter-400 text-sm'><span className="font-medium">QUESTIONS 11-20:</span> Choose the correct answer for multiple-choice questions and write <span className="font-medium">NO MORE THAN TWO WORDS AND/OR A NUMBER</span> for each answer.</p>
            
          </div>

          <div className="flex flex-col bg-white p-5 rounded-b-lg inter-400">
            {/* Questions 11-14 */}
            <div className="mb-8">
              <h3 className="text-lg inter-600 font-mono font-semibold mb-2">Questions 11-14</h3>
              <p className="mb-4">
                Answer the questions below. Choose the correct letter, <strong>A</strong>, <strong>B</strong>, or{' '}
                <strong>C</strong>.
              </p>

              {/* Question 11 */}
              <div className="mb-4">
                <p>
                  <strong>11.</strong> What is the project that Mark and Gina want to start?
                </p>
                <ul className="list-none mt-2 space-y-1">
                  <li>
                    <label>
                      <input type="radio" name="q1" value="A" className="mr-2" />
                      Business school requirements.
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="radio" name="q1" value="B" className="mr-2" />
                      Directions to the business school.
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="radio" name="q1" value="C" className="mr-2" />
                      Explaining the business school experience.
                    </label>
                  </li>
                </ul>
              </div>

              {/* Question 12 */}
              <div className="mb-4">
                <p>
                  <strong>12.</strong> Who is the target audience?
                </p>
                <ul className="list-none mt-2 space-y-1">
                  <li>
                    <label>
                      <input type="radio" name="q2" value="A" className="mr-2" />
                      Business students.
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="radio" name="q2" value="B" id="a2" className="mr-2" />
                      Business school applicants.
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="radio" name="q2" value="C" className="mr-2" />
                      Summer school attendees.
                    </label>
                  </li>
                </ul>
              </div>

              {/* Question 13 */}
              <div className="mb-4">
                <p>
                  <strong>13.</strong> How will they convey the information?
                </p>
                <ul className="list-none mt-2 space-y-1">
                  <li>
                    <label>
                      <input type="radio" name="q3" value="A" className="mr-2" />
                      Summer course lecture.
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="radio" name="q3" value="B" id="a3" className="mr-2" />
                      Informational video.
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="radio" name="q3" value="C" className="mr-2" />
                      Pamphlet in the mail.
                    </label>
                  </li>
                </ul>
              </div>

              {/* Question 14 */}
              <div className="mb-4">
                <p>
                  <strong>14.</strong> They want to do this project because
                </p>
                <ul className="list-none mt-2 space-y-1">
                  <li>
                    <label>
                      <input type="radio" name="q4" value="A" id="a4" className="mr-2" />
                      Students worry about their studies.
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="radio" name="q4" value="B" className="mr-2" />
                      They want to obtain a good grade.
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="radio" name="q4" value="C" className="mr-2" />
                      They want to attract future business school applicants.
                    </label>
                  </li>
                </ul>
              </div>
            </div>

            {/* Questions 15-20 */}
            <div>
              <h3 className="text-lg inter-600 font-mono font-semibold mb-2">Questions 15-20</h3>
              <p className="mb-4">Complete the table below.</p>
              <p className="mb-4">
                <strong>Write NO MORE THAN TWO WORDS for each answer.</strong>
              </p>

              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-300 text-center">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 border">Topic</th>
                      <th className="px-4 py-2 border">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2 text-left">
                        Academics
                        <br />- <strong>(15)</strong>{' '}
                        <input type="text" id="ex5" className="border px-2 py-1 w-36 mt-1" />
                      </td>
                      <td className="border px-4 py-2 align-middle">7 minutes</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 text-left">
                        <strong>(16)</strong>{' '}
                        <input type="text" id="ex6" className="border px-2 py-1 w-32 mt-1" />
                        <br />- cafeteria
                        <br />- <strong>(17)</strong>{' '}
                        <input type="text" id="ex7" className="border px-2 py-1 w-32 mt-1" />
                      </td>
                      <td className="border px-4 py-2 align-middle">6 minutes</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 text-left">
                        Social activity
                        <br />- <strong>(18)</strong>{' '}
                        <input type="text" id="ex8" className="border px-2 py-1 w-32 mt-1" />
                        <br />- <strong>(19)</strong>{' '}
                        <input type="text" id="ex9" className="border px-2 py-1 w-40 mt-1" />
                      </td>
                      <td className="border px-4 py-2 align-middle">8 minutes</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 text-left">Conclusion</td>
                      <td className="border px-4 py-2 align-middle">
                        nearly <strong>(20)</strong>{' '}
                        <input type="text" id="ex10" className="border px-2 py-1 w-32 mt-1" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={handleSubmit}
                className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium font-mono rounded-lg border border-gray-200 bg-slate-900 text-gray-100 shadow-2xs hover:bg-slate-800 focus:outline-hidden focus:bg-slate-500 disabled:opacity-5"
              >
                Submit Test
              </button>
              {/* {score !== null && (
                <p className="mt-4 text-lg font-bold">Your score: {score}/10</p>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeningSection2;
