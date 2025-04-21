import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserInfo from './components/UserInfo';
import ListeningSection1 from './components/ListeningSection1';
import ListeningSection2 from './components/ListeningSection2';
import ListeningSection3 from './components/ListeningSection3';
import ListeningSection4 from './components/ListeningSection4';
import FillInBlanks from './components/FillInBlanks';
import MCQ from './components/MCQ';
import Result from './components/Result';
import SpeakingTest from './components/SpeakingTest';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<UserInfo />} />
          <Route path="/listening-section-1" element={<ListeningSection1 />} />
          <Route path="/listening-section-2" element={<ListeningSection2 />} />
          <Route path="/listening-section-3" element={<ListeningSection3 />} />
          <Route path="/listening-section-4" element={<ListeningSection4 />} />
          <Route path="/speaking-test" element={<SpeakingTest />} />
          {/* <Route path="/fill-blanks" element={<FillInBlanks />} />
          <Route path="/mcq" element={<MCQ />} /> */}
          <Route path="/result" element={<Result />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
