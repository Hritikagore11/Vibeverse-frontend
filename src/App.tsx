import { Routes, Route, useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import FloatingBackButton from './components/Floatingback';
import Home from './pages/Home';
import MyVibes from './pages/MyVibes';
import About from './pages/About';
import SelectMode from './pages/SelectMode';
import AddSong from './components/AddSongs';
import ImageDetection from './pages/ImageDetection';
import TextDetection from './pages/TextDetection';
import ResultPage from './pages/ResultPage';
import Footer from './components/Footer';

export default function App() {
  const location = useLocation();

  return (
    <div className="pt-20">
      <Navbar />
      <FloatingBackButton />

      <Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/select-mode" element={<SelectMode />} />
          <Route path="/detect/image" element={<ImageDetection />} />
          <Route path="/detect/text" element={<TextDetection />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/add-song" element={<AddSong />} />
          <Route path="/my-vibes" element={<MyVibes />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Box>

      {/* Show footer on all pages except the result page */}
      {location.pathname !== '/result' && <Footer />}
    </div>
  );
}