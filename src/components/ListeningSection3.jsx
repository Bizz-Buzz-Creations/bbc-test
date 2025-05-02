import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import audioFile from '../assets/audio/listening-11/11.3.mp3';
import Cookies from 'js-cookie';

const ListeningSection3 = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(null);
    const navigate = useNavigate();
    const audioRef = useRef(null);
    const timerRef = useRef(null);
    const [countdown, setCountdown] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const correctAnswers = {
        q1: 'C',
        q2: 'A',
        q3: 'B',
        q4: 'A',
        q5: 'C',
        q6: 'A',
        q7: 'E',
        q8: 'D',
        q9: 'A',
        q10: 'B'
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

        // Questions 21–26: Multiple Choice
        for (let i = 1; i <= 6; i++) {
            const selected = document.querySelector(`input[name=q${i}]:checked`);
            userAnswers[`${i}`] = selected ? selected.value : ''; // store original (not lowercased) input

            if (selected && selected.value === correctAnswers[`q${i}`]) {
                sectionScore++;
            }
        }

        // Questions 27–30: Text Input
        for (let j = 7; j <= 10; j++) {
            const inputVal = document.getElementById(`ex${j + 20}`).value.trim().toUpperCase();
            userAnswers[`${j}`] = inputVal; // store original (not lowercased) input

            if (inputVal === correctAnswers[`q${j}`]) {
                sectionScore++;
            }
        }

        setScore(sectionScore);
        Cookies.set('listeningSection3Score', sectionScore, { expires: 1 });
        Cookies.set('listeningSection3Answers', JSON.stringify(userAnswers), { expires: 1 });

        setIsPlaying(false);
        navigate('/listening-section-4');
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
                        <h2 className="text-xl font-bold font-mono">SECTION 3</h2>
                        <p className='text-slate-800 inter-400 text-sm'><span className="font-medium">QUESTIONS 21-30:</span> Choose the correct answer for multiple-choice questions and choose <span className="font-medium">FOUR answers</span> from the given box.</p>
                    </div>

                    <div className="flex flex-col bg-white p-5 rounded-b-lg">
                        <div className="mb-6">
                            <h3 className="font-semibold mb-2">Questions 21-26</h3>
                            <p>Choose the correct letter, <strong>A</strong>, <strong>B</strong>, or <strong>C</strong>.</p>

                            <div className="my-4">
                                <p className="mb-1 font-medium">21. The subjects in questionnaire are <span id="s1"></span></p>
                                <div className="space-y-1 ml-4">
                                    <label className="block"><input type="radio" name="q1" value="A" className="mr-2" /> Tourists in the hotel in this area.</label>
                                    <label className="block"><input type="radio" name="q1" value="B" className="mr-2" /> Local residents.</label>
                                    <label className="block"><input type="radio" name="q1" value="C" className="mr-2" /> People who are living in this area.</label>
                                </div>
                            </div>

                            <div className="my-4">
                                <p className="mb-1 font-medium">22. The results of the questionnaire should be <span id="s2"></span></p>
                                <div className="space-y-1 ml-4">
                                    <label className="block"><input type="radio" name="q2" value="A" className="mr-2" /> Directly entered into the computer.</label>
                                    <label className="block"><input type="radio" name="q2" value="B" className="mr-2" /> Scored by hand.</label>
                                    <label className="block"><input type="radio" name="q2" value="C" className="mr-2" /> Submitted directly to Professor Curran.</label>
                                </div>
                            </div>

                            <div className="my-4">
                                <p className="mb-1 font-medium">23. Why should John give a copy of plans to the professor? <span id="s3"></span></p>
                                <div className="space-y-1 ml-4">
                                    <label className="block"><input type="radio" name="q3" value="A" className="mr-2" /> To receive a good grade.</label>
                                    <label className="block"><input type="radio" name="q3" value="B" className="mr-2" /> To get advice.</label>
                                    <label className="block"><input type="radio" name="q3" value="C" className="mr-2" /> To earn high praise.</label>
                                </div>
                            </div>

                            <div className="my-4">
                                <p className="mb-1 font-medium">24. How will the instructions be presented? <span id="s4"></span></p>
                                <div className="space-y-1 ml-4">
                                    <label className="block"><input type="radio" name="q4" value="A" className="mr-2" /> Given by a group representative.</label>
                                    <label className="block"><input type="radio" name="q4" value="B" className="mr-2" /> Given by all members of the group.</label>
                                    <label className="block"><input type="radio" name="q4" value="C" className="mr-2" /> Given by the professor.</label>
                                </div>
                            </div>

                            <div className="my-4">
                                <p className="mb-1 font-medium">25. What does Dani suggest to John when those subjects receive the questionnaire? <span id="s5"></span></p>
                                <div className="space-y-1 ml-4">
                                    <label className="block"><input type="radio" name="q5" value="A" className="mr-2" /> Divide into 2 part to argue.</label>
                                    <label className="block"><input type="radio" name="q5" value="B" className="mr-2" /> Focus on the opinion of the interviewees.</label>
                                    <label className="block"><input type="radio" name="q5" value="C" className="mr-2" /> Take consideration of both sides.</label>
                                </div>
                            </div>

                            <div className="my-4">
                                <p className="mb-1 font-medium">26. Why is this project particularly important to John? <span id="s6"></span></p>
                                <div className="space-y-1 ml-4">
                                    <label className="block"><input type="radio" name="q6" value="A" className="mr-2" /> To earn respect from professors in the department.</label>
                                    <label className="block"><input type="radio" name="q6" value="B" className="mr-2" /> To raise his grade.</label>
                                    <label className="block"><input type="radio" name="q6" value="C" className="mr-2" /> To impress his professor.</label>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold mb-2">Questions 27-30</h3>
                            <p>What is the source of each one below in this survey?</p>
                            <p>Choose <strong>FOUR</strong> answers from the box and write the letters <strong>A</strong>-<strong>F</strong> next to questions <strong>27</strong>-<strong>30</strong>.</p>

                            <div className='flex justify-between items-center'>
                                <div className='flex flex-col'>
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="my-1">
                                            <label className="font-medium mr-2">{27 + i}. {['Map', 'Photo', 'Budget', 'Comment'][i]}</label>
                                            <input type="text" className="border px-2 py-1 w-12 rounded" id={`ex${27 + i}`} /> <span id={`s${27 + i}`}></span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border p-4 w-fit mr-5 mt-2">
                                    <p><strong>A</strong> radio</p>
                                    <p><strong>B</strong> council meeting</p>
                                    <p><strong>C</strong> the television</p>
                                    <p><strong>D</strong> newspaper</p>
                                    <p><strong>E</strong> journal</p>
                                    <p><strong>F</strong> the Internet</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <button
                                onClick={handleSubmit}
                                className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium font-mono rounded-lg border border-gray-200 bg-slate-900 text-gray-100 shadow-2xs hover:bg-slate-800 focus:outline-hidden focus:bg-slate-500 disabled:opacity-5"
                            >Submit Test</button>
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

export default ListeningSection3;
