import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import MainContent from "./components/MainContent";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import ResetPasswordForm from "./components/ResetPasswordForm";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TrendingPage from './pages/TrendingPage';
import TopChartsPage from './pages/TopChartsPage';
import NewReleasesPage from './pages/NewReleasesPage';
import SongPage from "./pages/SongPage";
import GenresPage from './pages/GenresPage';
import GalleryPage from './pages/GalleryPage';
import LanguagesPage from './pages/LanguagesPage';
import LatestAlbumsPage from './pages/LatestAlbumsPage';
import TopArtistsPage from './pages/TopArtistsPage';
import OldSongsPage from './pages/OldSongsPage';
import TopSearchedPage from './pages/TopSearchedPage';
import ReviewSectionPage from './pages/ReviewSectionPage';
import FeedbackPage from './pages/FeedbackPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import SiteMapPage from "./pages/SiteMapPage";
import ScrollToTop from "./components/ScrollToTop";
import AOS from 'aos';
import 'aos/dist/aos.css';
import SearchResultPage from "./components/SearchResultPage";
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, [])

  return (
    <div>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode}><MainContent /></MainLayout>} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/song/:id" element={<MainLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode}><SongPage /></MainLayout>} />
          <Route path="/trending" element={<MainLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode}><TrendingPage /></MainLayout>} />
          <Route path="/top-charts" element={<MainLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode}><TopChartsPage /></MainLayout>} />
          <Route path="/new-releases" element={<MainLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode}><NewReleasesPage /></MainLayout>} />
          <Route path="/genres" element={<MainLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode}><GenresPage /></MainLayout>} />
          <Route path="/gallery" element={<MainLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode}><GalleryPage /></MainLayout>} />
          <Route path="/languages" element={<MainLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode}><LanguagesPage /></MainLayout>} />
          <Route path="/latest-albums" element={<MainLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode}><LatestAlbumsPage /></MainLayout>} />
          <Route path="/top-artists" element={<MainLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode}><TopArtistsPage /></MainLayout>} />
          <Route path="/old-songs" element={<MainLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode}><OldSongsPage /></MainLayout>} />
          <Route path="/top-searched" element={<MainLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode}><TopSearchedPage /></MainLayout>} />
          <Route path="/reviews" element={<MainLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode}><ReviewSectionPage /></MainLayout>} />
          <Route path="/feedback" element={<MainLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode}><FeedbackPage /></MainLayout>} />
          <Route path="/site-map" element={<MainLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode}><SiteMapPage /></MainLayout>} />
          <Route path="/about" element={<MainLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode}><AboutPage /></MainLayout>} />
          <Route path="/contact" element={<MainLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode}><ContactPage /></MainLayout>} />
          <Route path="/privacy" element={<MainLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode}><PrivacyPage /></MainLayout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/reset-password" element={<ResetPasswordForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;