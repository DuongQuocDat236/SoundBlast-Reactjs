import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  FaPlay,
  FaPause,
  FaDownload,
  FaVolumeUp,
  FaStepForward,
  FaStepBackward,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BottomMusicPlayer = ({ song, onClose }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (!song || !song.audio) return;
    const audio = audioRef.current;
    if (!audio) return;

    setIsPlaying(false);
    audio.pause();
    audio.load();
    audio.currentTime = 0;
  }, [song.id]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.warn("Play error:", err));
    }
    setIsPlaying((prev) => !prev);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && !isNaN(audio.duration)) {
      setProgress(audio.currentTime);
      setDuration(audio.duration);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    const audio = audioRef.current;
    if (!isNaN(time) && duration > 0 && audio) {
      audio.currentTime = time;
      setProgress(time);
    }
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleDownload = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/download/${song.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${song.title}.mp3`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error("Download error:", err);
      alert("Download failed.");
    }
  };

  if (!song) return null;

  return (
    <div className="position-fixed bottom-0 start-0 w-100 text-white py-2 px-3" style={{ zIndex: 9999, background: "#1e1e1e", backdropFilter: "blur(10px)" }}>
      <Container fluid>
        <Row className="align-items-center">
          <Col xs={2} className="d-flex align-items-center">
            <img src={song.image} alt={song.title} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }} />
            <div className="ms-3">
              <div className="fw-bold text-white text-truncate" style={{ maxWidth: "160px" }}>{song.title}</div>
              <div className="text-light small text-truncate" style={{ maxWidth: "160px" }}>{song.artist}</div>
            </div>
          </Col>

          <Col xs={5}>
            <input type="range" min={0} max={duration || 100} value={progress} onChange={handleSeek} className="form-range" style={{ height: "6px" }} />
            <div className="d-flex justify-content-between text-white small">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </Col>

          <Col xs={3} className="text-center">
            <div className="d-flex justify-content-center gap-3">
              <Button variant="dark" size="sm" disabled><FaStepBackward /></Button>
              <Button variant="light" size="sm" onClick={togglePlay}>{isPlaying ? <FaPause /> : <FaPlay />}</Button>
              <Button variant="dark" size="sm" disabled><FaStepForward /></Button>
              <Button variant="dark" size="sm" onClick={handleDownload}><FaDownload /></Button>
            </div>
          </Col>

          <Col xs={1} className="d-flex align-items-center gap-2">
            <FaVolumeUp />
            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
          </Col>

          <Col xs={1} className="text-end">
            <Button variant="outline-danger" size="sm" onClick={onClose}>Close</Button>
          </Col>
        </Row>
      </Container>

      <audio
        key={song.id}
        ref={audioRef}
        src={song.audio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          const audio = audioRef.current;
          if (audio && !isNaN(audio.duration)) {
            setDuration(audioRef.current.duration);
          }
        }}
        preload="auto"
        hidden
      />
    </div>
  );
};

export default BottomMusicPlayer;