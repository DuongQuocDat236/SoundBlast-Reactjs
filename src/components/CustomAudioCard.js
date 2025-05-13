import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { FaPlay } from "react-icons/fa";

const CustomAudioCard = ({ image, title, artist, audioSrc, id, onPlay, currentSong }) => {
  const [isHovered, setIsHovered] = useState(false);

      const handleClick = () => {
        const isSameSong = currentSong && currentSong.id === id;
        if (!isSameSong && onPlay) {
          onPlay({ title, artist, audio: audioSrc, image, id });
        }
      };

  return (
    <Card
      className="album-card shadow-sm position-relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{
        cursor: "pointer",
        maxWidth: "180px",
        margin: "0 auto",
        borderRadius: "12px",
      }}
    >
      <div className="card-img-wrapper">
        <img
          src={image}
          alt={title}
          className="img-fluid"
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "12px 12px 0 0",
          }}
        />
        {isHovered && (
          <div className="play-icon-overlay">
            <FaPlay />
          </div>
        )}
      </div>

      <Card.Body className="card-compact">
        <Card.Title className="card-title">{title}</Card.Title>
        <Card.Text className="card-text">{artist}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CustomAudioCard;
