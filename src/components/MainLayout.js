import React from "react";
import { useLocation } from "react-router-dom";
import GallerySlider from './Slider';
import CustomNavbar from './CustomNavbar';
import Footer from './Footer';
import { Container } from "react-bootstrap";
import BottomMusicPlayer from "./BottomMusicPlayer";

const MainLayout = ({ children, toggleTheme, isDarkMode, currentSong, onClose }) => {
  const location = useLocation();
  const backgroundColor = isDarkMode ? "#121212" : "transparent";
  const textColor = isDarkMode ? "#ffffff" : "#000000";

  return (
    <div style={{ backgroundColor, color: textColor, minHeight: "100vh" }}>
      <div className="top">
        <CustomNavbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      </div>
      {location.pathname === "/" && <GallerySlider />}
      <div>
        <Container>{children}</Container>
      </div>
      {currentSong && <BottomMusicPlayer song={currentSong} onClose={onClose} />}
      <Footer />
    </div>
  );
};

export default MainLayout;
