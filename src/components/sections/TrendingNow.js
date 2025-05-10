import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Spinner } from "react-bootstrap";
import CustomAudioCard from "../CustomAudioCard";

const TrendingNow = ({ onPlay, currentSong }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/trending")
      .then((res) => {
        setSongs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching trending songs:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="my-5 px-3">
      <h2 className="mb-4 fw-bold text-center">🔥 TRENDING NOW</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row className="g-4">
          {songs.map((song) => (
            <Col md={4} key={song.id}>
              <CustomAudioCard
                id={song.id}
                image={`http://localhost:8000/${song.image}`}
                title={song.title}
                artist={song.artist}
                audioSrc={`http://localhost:8000/api/stream-audio/${song.audio}`}
                currentSong={currentSong}
                onPlay={onPlay}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default TrendingNow;
