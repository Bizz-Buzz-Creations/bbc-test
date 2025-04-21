// import React, { useState, useRef, useEffect } from 'react';
// import Cookies from 'js-cookie';

// const questions = [
//     { id: 1, question: "Tell me about yourself?", duration: 10 },
//     { id: 2, question: "Explain your favorite movie", duration: 30 },
// ];

// const vocabularyWords = ['name', 'background', 'education', 'experience', 'role', 'expertise', 'passion', 'interests', 'values', 'personality', 'friendly', 'dedicated', 'motivated', 'hardworking', 'reliable', 'team-oriented', 'adaptable', 'creative', 'resourceful', 'detail-oriented', 'qualifications', 'skills', 'responsibilities', 'career', 'work experience', 'achievements', 'goals', 'leadership', 'collaboration', 'challenges', 'problem-solving', 'past roles', 'projects', 'accomplishments', 'growth', 'learning', 'opportunities', 'motivation', 'teamwork', 'professional development', 'industry', 'field of interest', 'action', 'drama', 'comedy', 'thriller', 'documentary', 'romance', 'animation', 'adventure', 'fantasy', 'horror', 'protagonist', 'antagonist', 'supporting characters', 'hero', 'villain', 'main character', 'sidekick', 'storyline', 'theme', 'conflict', 'resolution', 'twist', 'climax', 'setting', 'journey', 'character arc', 'moral lesson', 'suspense', 'funny', 'emotional', 'inspiring', 'thrilling', 'heartwarming', 'intense', 'suspenseful', 'touching', 'dramatic cinematography', 'directing', 'screenplay', 'music', 'sound design', 'visual effects', 'acting', 'direction'];

// const SpeakingTest = () => {
//     const [sectionIndex, setSectionIndex] = useState(0);
//     const [recording, setRecording] = useState(false);
//     const [timeLeft, setTimeLeft] = useState(questions[0].duration);
//     const [transcripts, setTranscripts] = useState([]);
//     const [liveTranscript, setLiveTranscript] = useState('');
//     const [results, setResults] = useState([]);
//     const [finished, setFinished] = useState(false);

//     const recognitionRef = useRef(null);
//     const timerRef = useRef(null);
//     const currentTranscript = useRef('');

//     useEffect(() => {
//         const stored = Cookies.get('speaking_transcripts');
//         if (stored) {
//             setTranscripts(JSON.parse(stored));
//         }
//     }, []);

//     const getGPTFeedback = async (transcript) => {
//         const prompt = `\n      Analyze the following speech transcript and provide:\n      1. Feedback on grammar and fluency\n      2. Use of vocabulary\n      3. Coherence and structure\n      4. Score out of 100 for communication quality\n\n      Transcript: "${transcript}"\n    `;

//         try {
//             const response = await fetch('https://api.openai.com/v1/chat/completions', {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${import.meta.env.VITE_APP_OPENAI_API_KEY}`,
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     model: "gpt-4",
//                     messages: [{ role: "user", content: prompt }],
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error(`Error: ${response.status} - ${response.statusText}`);
//             }

//             const data = await response.json();

//             if (data.choices && data.choices[0] && data.choices[0].message) {
//                 return data.choices[0].message.content;
//             } else {
//                 throw new Error("Unexpected response structure");
//             }
//         } catch (error) {
//             console.error("Error fetching GPT feedback:", error);
//             return "An error occurred while fetching feedback.";
//         }
//     };

//     const startRecording = () => {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         if (!SpeechRecognition) return alert("Speech recognition not supported.");

//         const recognition = new SpeechRecognition();
//         recognition.lang = 'en-US';
//         recognition.interimResults = true;
//         recognition.continuous = true;

//         recognition.onresult = (event) => {
//             let interim = '';
//             let final = '';

//             for (let i = event.resultIndex; i < event.results.length; i++) {
//                 const result = event.results[i];
//                 if (result.isFinal) {
//                     final += result[0].transcript + ' ';
//                 } else {
//                     interim += result[0].transcript + ' ';
//                 }
//             }

//             if (final) {
//                 currentTranscript.current += final;
//             }

//             setLiveTranscript((currentTranscript.current + interim).trim());
//         };

//         recognition.onend = () => {
//             saveTranscriptAndMoveNext();
//         };

//         recognitionRef.current = recognition;
//         recognition.start();
//         setRecording(true);
//         startTimer();
//     };

//     const startTimer = () => {
//         setTimeLeft(questions[sectionIndex].duration);
//         timerRef.current = setInterval(() => {
//             setTimeLeft(prev => {
//                 if (prev <= 1) {
//                     stopRecording();
//                     return 0;
//                 }
//                 return prev - 1;
//             });
//         }, 1000);
//     };

//     const stopRecording = () => {
//         clearInterval(timerRef.current);
//         recognitionRef.current?.stop();
//         setRecording(false);
//     };

//     const checkGrammar = async (text) => {
//         try {
//             const response = await fetch('https://api.languagetoolplus.com/v2/check', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//                 body: new URLSearchParams({
//                     text,
//                     language: 'en-US'
//                 }),
//             });

//             const data = await response.json();
//             return data.matches.length;
//         } catch (error) {
//             console.error("Grammar check failed:", error);
//             return 0;
//         }
//     };

//     const analyzeTranscript = async (transcript) => {
//         const words = transcript.trim().split(/\s+/).filter(Boolean);
//         const wordCount = words.length;

//         const usedVocabulary = vocabularyWords.filter((word) =>
//             transcript.toLowerCase().includes(word)
//         );

//         const grammarIssueCount = await checkGrammar(transcript);
//         const sentenceCount = transcript.split(/[.!?]+/).filter(Boolean).length;

//         const score = Math.min(100,
//             wordCount * 0.2 +
//             usedVocabulary.length * 3 +
//             (10 - grammarIssueCount) * 3 +
//             (sentenceCount > 5 ? 20 : 10)
//         );

//         return {
//             transcript,
//             wordCount,
//             usedVocabulary,
//             grammarIssueCount,
//             sentenceCount,
//             score,
//         };
//     };

//     const saveTranscriptAndMoveNext = async () => {
//         const cleaned = currentTranscript.current.trim();
//         const analyzed = await analyzeTranscript(cleaned);
//         const aiFeedback = await getGPTFeedback(cleaned);

//         const newTranscripts = [...transcripts, cleaned];
//         const newResults = [...results, { ...analyzed, aiFeedback }];

//         setTranscripts(newTranscripts);
//         setResults(newResults);
//         Cookies.set('speaking_transcripts', JSON.stringify(newTranscripts));

//         currentTranscript.current = '';
//         setLiveTranscript('');

//         if (sectionIndex < questions.length - 1) {
//             const nextIndex = sectionIndex + 1;
//             setSectionIndex(nextIndex);
//             setTimeLeft(questions[nextIndex].duration);
//         } else {
//             setFinished(true);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//             <div className="max-w-xl w-full bg-white p-6 rounded-xl shadow-md text-center">
//                 {!finished ? (
//                     <>
//                         <h2 className="text-xl font-semibold mb-2">Section {sectionIndex + 1}</h2>
//                         <p className="text-lg mb-4">{questions[sectionIndex].question}</p>
//                         <div className="text-3xl font-bold text-red-500 mb-4">
//                             {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:
//                             {(timeLeft % 60).toString().padStart(2, '0')}
//                         </div>
//                         <button
//                             onClick={startRecording}
//                             disabled={recording}
//                             className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
//                         >
//                             {recording ? "Recording..." : "Start Speaking"}
//                         </button>

//                         {recording && (
//                             <div className="mt-4 text-left">
//                                 <h3 className="text-sm font-semibold mb-1">Live Transcript</h3>
//                                 <p className="p-3 bg-gray-100 rounded text-sm min-h-[100px]">
//                                     {liveTranscript || "Listening..."}
//                                 </p>
//                             </div>
//                         )}
//                     </>
//                 ) : (
//                     <>
//                         <h2 className="text-xl font-semibold mb-4">Your Results</h2>
//                         {results.map((res, i) => (
//                             <div key={i} className="mb-6 text-left bg-gray-100 p-4 rounded">
//                                 <h3 className="font-bold mb-2">Section {i + 1}</h3>
//                                 <p><strong>Transcript:</strong> {res.transcript}</p>
//                                 <p><strong>Word Count:</strong> {res.wordCount}</p>
//                                 <p><strong>Vocabulary Used:</strong> {res.usedVocabulary.join(', ') || 'None'}</p>
//                                 <p><strong>Grammar Issues Detected:</strong> {res.grammarIssueCount}</p>
//                                 <p><strong>Sentence Count:</strong> {res.sentenceCount}</p>
//                                 <p><strong>Estimated Score:</strong> {res.score}/100</p>
//                                 <p><strong>AI Feedback:</strong> {res.aiFeedback || 'Loading...'}</p>
//                             </div>
//                         ))}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default SpeakingTest;

import React, { useState, useRef, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

const questions = [
    { id: 1, question: "Tell me about yourself?", duration: 10 },
    { id: 2, question: "Explain your favorite movie", duration: 10 },
];

const vocabularyWords = ['name', 'background', 'education', 'experience', 'role', 'expertise', 'passion', 'interests', 'values', 'personality', 'friendly', 'dedicated', 'motivated', 'hardworking', 'reliable', 'team-oriented', 'adaptable', 'creative', 'resourceful', 'detail-oriented', 'qualifications', 'skills', 'responsibilities', 'career', 'work experience', 'achievements', 'goals', 'leadership', 'collaboration', 'challenges', 'problem-solving', 'past roles', 'projects', 'accomplishments', 'growth', 'learning', 'opportunities', 'motivation', 'teamwork', 'professional development', 'industry', 'field of interest', 'action', 'drama', 'comedy', 'thriller', 'documentary', 'romance', 'animation', 'adventure', 'fantasy', 'horror', 'protagonist', 'antagonist', 'supporting characters', 'hero', 'villain', 'main character', 'sidekick', 'storyline', 'theme', 'conflict', 'resolution', 'twist', 'climax', 'setting', 'journey', 'character arc', 'moral lesson', 'suspense', 'funny', 'emotional', 'inspiring', 'thrilling', 'heartwarming', 'intense', 'suspenseful', 'touching', 'dramatic cinematography', 'directing', 'screenplay', 'music', 'sound design', 'visual effects', 'acting', 'direction'];

const SpeakingTest = () => {
    const [sectionIndex, setSectionIndex] = useState(0);
    const [recording, setRecording] = useState(false);
    const [timeLeft, setTimeLeft] = useState(questions[0].duration);
    const [transcripts, setTranscripts] = useState([]);
    const [liveTranscript, setLiveTranscript] = useState('');
    const [results, setResults] = useState([]);
    const [finished, setFinished] = useState(false);

    const recognitionRef = useRef(null);
    const timerRef = useRef(null);
    const currentTranscript = useRef('');

    useEffect(() => {
        const stored = Cookies.get('speaking_transcripts');
        if (stored) {
            setTranscripts(JSON.parse(stored));
        }
    }, []);

    const startRecording = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return alert("Speech recognition not supported.");

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.continuous = true;

        recognition.onresult = (event) => {
            let interim = '';
            let final = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i];
                if (result.isFinal) {
                    final += result[0].transcript + ' ';
                } else {
                    interim += result[0].transcript + ' ';
                }
            }

            if (final) {
                currentTranscript.current += final;
            }

            setLiveTranscript((currentTranscript.current + interim).trim());
        };

        recognition.onend = () => {
            saveTranscriptAndMoveNext();
        };

        recognitionRef.current = recognition;
        recognition.start();
        setRecording(true);
        startTimer();
    };

    const startTimer = () => {
        setTimeLeft(questions[sectionIndex].duration);
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    stopRecording();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const stopRecording = () => {
        clearInterval(timerRef.current);
        recognitionRef.current?.stop();
        setRecording(false);
    };

    const checkGrammar = async (text) => {
        try {
            const response = await fetch('https://api.languagetoolplus.com/v2/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    text,
                    language: 'en-US'
                }),
            });

            const data = await response.json();
            return data.matches.length;
        } catch (error) {
            console.error("Grammar check failed:", error);
            return 0;
        }
    };

    const analyzeTranscript = async (transcript) => {
        const words = transcript.trim().split(/\s+/).filter(Boolean);
        const wordCount = words.length;

        const usedVocabulary = vocabularyWords.filter((word) =>
            transcript.toLowerCase().includes(word)
        );

        const grammarIssueCount = await checkGrammar(transcript);
        const sentenceCount = transcript.split(/[.!?]+/).filter(Boolean).length;

        const score = Math.min(100,
            wordCount * 0.2 +
            usedVocabulary.length * 3 +
            (10 - grammarIssueCount) * 3 +
            (sentenceCount > 5 ? 20 : 10)
        );

        return {
            transcript,
            wordCount,
            usedVocabulary,
            grammarIssueCount,
            sentenceCount,
            score,
        };
    };

    const saveTranscriptAndMoveNext = async () => {
        const cleaned = currentTranscript.current.trim();
        const analyzed = await analyzeTranscript(cleaned);

        const newTranscripts = [...transcripts, cleaned];
        const newResults = [...results, analyzed];

        setTranscripts(newTranscripts);
        setResults(newResults);
        Cookies.set('speaking_transcripts', JSON.stringify(newTranscripts));

        currentTranscript.current = '';
        setLiveTranscript('');

        if (sectionIndex < questions.length - 1) {
            const nextIndex = sectionIndex + 1;
            setSectionIndex(nextIndex);
            setTimeLeft(questions[nextIndex].duration);
        } else {
            setFinished(true);
        }
    };

    const averageScore = results.length ? Math.round(results.reduce((acc, res) => acc + res.score, 0) / results.length) : 0;

    const handleDownloadPDF = async () => {
        const userName = localStorage.getItem('userName') || 'User';
    
        const styles = StyleSheet.create({
            page: { padding: 30, fontSize: 12, fontFamily: 'Helvetica' },
            section: { marginBottom: 15 },
            header: { fontSize: 18, marginBottom: 10 },
            bold: { fontWeight: 'bold' },
        });
    
        const doc = (
            <Document>
                <Page size="A4" style={styles.page}>
                    <Text style={styles.header}>Speaking Test Results</Text>
                    <Text>Name: {userName}</Text>
                    {results.map((res, i) => (
                        <View key={i} style={styles.section}>
                            <Text style={styles.bold}>Section {i + 1}</Text>
                            <Text>Transcript: {res.transcript}</Text>
                            <Text>Word Count: {res.wordCount}</Text>
                            <Text>Vocabulary Used: {res.usedVocabulary.join(', ') || 'None'}</Text>
                            <Text>Grammar Issues: {res.grammarIssueCount}</Text>
                            <Text>Sentence Count: {res.sentenceCount}</Text>
                            <Text>Estimated Score: {res.score}/100</Text>
                        </View>
                    ))}
                    <Text style={{ marginTop: 20, fontSize: 14, fontWeight: 600 }}>
                        Consolidated Score: {averageScore}/100
                    </Text>
                </Page>
            </Document>
        );
    
        const blob = await pdf(doc).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${userName}_speaking_test_results.pdf`;
        link.click();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="max-w-xl w-full bg-white p-6 rounded-xl shadow-md text-center">
                {!finished ? (
                    <>
                        <h2 className="text-xl font-semibold mb-2">Section {sectionIndex + 1}</h2>
                        <p className="text-lg mb-4">{questions[sectionIndex].question}</p>
                        <div className="text-3xl font-bold text-red-500 mb-4">
                            {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:
                            {(timeLeft % 60).toString().padStart(2, '0')}
                        </div>
                        <button
                            onClick={startRecording}
                            disabled={recording}
                            className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
                        >
                            {recording ? "Recording..." : "Start Speaking"}
                        </button>

                        {recording && (
                            <div className="mt-4 text-left">
                                <h3 className="text-sm font-semibold mb-1">Live Transcript</h3>
                                <p className="p-3 bg-gray-100 rounded text-sm min-h-[100px]">
                                    {liveTranscript || "Listening..."}
                                </p>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Your Results</h2>
                        {results.map((res, i) => (
                            <div key={i} className="mb-6 text-left bg-gray-100 p-4 rounded">
                                <h3 className="font-bold mb-2">Section {i + 1}</h3>
                                <p><strong>Transcript:</strong> {res.transcript}</p>
                                <p><strong>Word Count:</strong> {res.wordCount}</p>
                                <p><strong>Vocabulary Used:</strong> {res.usedVocabulary.join(', ') || 'None'}</p>
                                <p><strong>Grammar Issues Detected:</strong> {res.grammarIssueCount}</p>
                                <p><strong>Sentence Count:</strong> {res.sentenceCount}</p>
                                <p><strong>Estimated Score:</strong> {res.score}/100</p>
                            </div>
                        ))}
                        <div className="text-lg font-bold text-green-700 mt-6">
                            Consolidated Score: {averageScore}/100
                        </div>
                        <button
                            onClick={handleDownloadPDF}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Download Results as PDF
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default SpeakingTest;
