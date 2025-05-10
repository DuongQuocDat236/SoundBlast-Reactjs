import React, { useState } from "react";
import { Card } from "react-bootstrap";

const CustomAudioCard = ({ image, title, artist, audioSrc, id, onPlay, currentSong }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const isSameSong = currentSong && currentSong.audioSrc === audioSrc;
    if (!isSameSong && onPlay) {
      onPlay({ title, artist, audioSrc, image, id });
    }
  };

  return (
    <Card
      className="mb-4 shadow-sm position-relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={image}
          style={{ height: "220px", objectFit: "cover" }}
        />
        {isHovered && (
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50"
          >
            <span className="text-white display-6">▶️</span>
          </div>
        )}
      </div>
      <Card.Body className="text-center">
        <Card.Title className="mb-1 fw-semibold">{title}</Card.Title>
        <Card.Text className="text-muted small mb-0">{artist}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CustomAudioCard;
