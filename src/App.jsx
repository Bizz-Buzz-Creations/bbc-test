import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserInfo from './components/UserInfo';
import Instruction from './components/Instruction';
import ListeningSection1 from './components/ListeningSection1';
import ListeningSection2 from './components/ListeningSection2';
import ListeningSection3 from './components/ListeningSection3';
import ListeningSection4 from './components/ListeningSection4';
import Result from './components/Result';
import SpeakingTest from './components/SpeakingTest';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-purple-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<UserInfo />} />
          <Route path="/instruction" element={<Instruction />} />
          <Route path="/listening-section-1" element={<ListeningSection1 />} />
          <Route path="/listening-section-2" element={<ListeningSection2 />} />
          <Route path="/listening-section-3" element={<ListeningSection3 />} />
          <Route path="/listening-section-4" element={<ListeningSection4 />} />
          <Route path="/speaking-test" element={<SpeakingTest />} />
          <Route path="/result" element={<Result />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
