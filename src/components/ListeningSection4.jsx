import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import audioFile from '../assets/audio/listening-11/11.4.mp3';
import Cookies from 'js-cookie';

const ListeningSection4 = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(null);
    const navigate = useNavigate();
    const audioRef = useRef(null);
    const timerRef = useRef(null);
    const [countdown, setCountdown] = useState(0);

    const correctAnswers = {
        q1: 'C',
        q2: 'C',
        q3: 'B',
        q4: 'B',
        q5: 'C',
        ex6: 'Market',
        ex7: 'Interviews',
        ex8: 'Useless',
        ex9: 'Photographs',
        ex10: 'Crime'
    };

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

        for (let i = 1; i <= 5; i++) {
            const selected = document.querySelector(`input[name=q${i}]:checked`);
            if (selected && selected.nextSibling.textContent.trim().startsWith(correctAnswers[`q${i}`])) {
                sectionScore++;
            }
        }

        for (let j = 6; j <= 10; j++) {
            const inputVal = document.getElementById(`ex${j}`).value.trim().toLowerCase();
            if (inputVal === correctAnswers[`ex${j}`].toLowerCase()) {
                sectionScore++;
            }
        }

        setScore(sectionScore);
        Cookies.set('listeningSection4Score', sectionScore, { expires: 1 });
        navigate('/result');
        // alert(`Section 4 Score: ${sectionScore}/10`);
    };

    const handleAudioEnd = () => {
        setIsPlaying(false);
        navigate('/result');
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
                        src={audioFile}
                        controls
                        onPlay={handleAudioPlay}
                        onPause={() => setIsPlaying(false)}
                        onEnded={handleAudioEnd}
                        className="mb-4"
                    />
                    <strong id='countdown' className='hidden'>{formatTime(countdown)}</strong>
                    <p className="text-gray-600 text-center">
                        Please listen to the audio carefully. You will not be able to replay it.
                    </p>
                </div>
            </div>

            <div className="flex justify-center items-start min-h-screen p-12">
                <div className="stacked-paper w-full md:w-3xl h-fit p-5 mx-auto bg-white border-t border-l border-gray-400">
                    <h2 className="text-xl font-bold mb-4">SECTION 4. QUESTIONS 31-40</h2>

                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Questions 31-35</h3>
                        <p>Choose the correct letter, <strong>A</strong>, <strong>B</strong>, or <strong>C</strong>.</p>

                        <div className="my-4">
                            <p className="mb-1 font-medium">31. Why did the lecturer choose to focus on the Pleasanton Town Market? <span id="s1"></span></p>
                            <div className="space-y-1 ml-4">
                                <label className="block"><input type="radio" name="q1" className="mr-2" /> A. It was the first ever Town Market.</label>
                                <label className="block"><input type="radio" name="q1" className="mr-2" /> B. It has been covered extensively in local history classes.</label>
                                <label className="block"><input type="radio" name="q1" className="mr-2" /> C. It is often mentioned in some literature of the library.</label>
                            </div>
                        </div>

                        <div className="my-4">
                            <p className="mb-1 font-medium">32. The Town Market originally made a large profit selling <span id="s2"></span></p>
                            <div className="space-y-1 ml-4">
                                <label className="block"><input type="radio" name="q2" className="mr-2" /> A. handcrafts.</label>
                                <label className="block"><input type="radio" name="q2" className="mr-2" /> B. vegetables.</label>
                                <label className="block"><input type="radio" name="q2" className="mr-2" /> C. animals.</label>
                            </div>
                        </div>

                        <div className="my-4">
                            <p className="mb-1 font-medium">33. The money that the marketers made contributes to local <span id="s3"></span></p>
                            <div className="space-y-1 ml-4">
                                <label className="block"><input type="radio" name="q3" className="mr-2" /> A. reconstruction.</label>
                                <label className="block"><input type="radio" name="q3" className="mr-2" /> B. development.</label>
                                <label className="block"><input type="radio" name="q3" className="mr-2" /> C. defense.</label>
                            </div>
                        </div>

                        <div className="my-4">
                            <p className="mb-1 font-medium">34. Market sales plummeted due to lack of viable <span id="s4"></span></p>
                            <div className="space-y-1 ml-4">
                                <label className="block"><input type="radio" name="q4" className="mr-2" /> A. agriculture.</label>
                                <label className="block"><input type="radio" name="q4" className="mr-2" /> B. transport.</label>
                                <label className="block"><input type="radio" name="q4" className="mr-2" /> C. city planning.</label>
                            </div>
                        </div>

                        <div className="my-4">
                            <p className="mb-1 font-medium">35. Major John C. Wiley decided the Clock tower would be used as a ____________ in the early stages of the uprising. <span id="s5"></span></p>
                            <div className="space-y-1 ml-4">
                                <label className="block"><input type="radio" name="q5" className="mr-2" /> A. clock</label>
                                <label className="block"><input type="radio" name="q5" className="mr-2" /> B. grounds for battle</label>
                                <label className="block"><input type="radio" name="q5" className="mr-2" /> C. jail</label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Questions 36-40</h3>
                        <p>Complete the table below.</p>
                        <p>Write <strong>ONLY ONE WORD</strong> for each answer.</p>

                        <div className="overflow-x-auto">
                            <table className="table-auto border-collapse border w-full mt-4">
                                <thead>
                                    <tr>
                                        <th className="border px-4 py-2 text-center">Research Methods</th>
                                        <th className="border px-4 py-2 text-center">Objects</th>
                                        <th className="border px-4 py-2 text-center">Problems</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border px-4 py-2">reference section</td>
                                        <td className="border px-4 py-2">36. <input type="text" className="border px-2 py-1 w-32 rounded" id="ex6" /> <span id="s6"></span></td>
                                        <td className="border px-4 py-2">there is too much information</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">37. <input type="text" className="border px-2 py-1 w-32 rounded" id="ex7" /> <span id="s7"></span></td>
                                        <td className="border px-4 py-2">Rebellion</td>
                                        <td className="border px-4 py-2">bias makes it 38. <input type="text" className="border px-2 py-1 w-32 rounded" id="ex8" /> <span id="s8"></span></td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">39. <input type="text" className="border px-2 py-1 w-32 rounded" id="ex9" /> <span id="s9"></span></td>
                                        <td className="border px-4 py-2">Jim Wiley</td>
                                        <td className="border px-4 py-2">the information is insufficient</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">newspaper archives</td>
                                        <td className="border px-4 py-2">40. <input type="text" className="border px-2 py-1 w-32 rounded" id="ex10" /> <span id="s10"></span></td>
                                        <td className="border px-4 py-2">more detail is needed</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-500 text-white font-semibold px-6 py-2 rounded hover:bg-blue-600"
                        >Submit Test</button>
                        {score !== null && (
                            <p className="mt-4 text-lg font-bold">Your score: {score}/10</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListeningSection4;
