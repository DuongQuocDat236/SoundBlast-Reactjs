import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import CustomAudioCard from "../CustomAudioCard";

const TrendingNow = () => {
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
        console.error("Error calling Trending API:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="py-4 text-center">
      <h2 className="mb-4 fw-bold">🔥 TRENDING NOW</h2>

      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Row className="justify-content-center">
          {songs.map((song) => (
            <Col md={4} key={song.id}>
            <CustomAudioCard
              id={song.id}
              image={`http://localhost:8000/${song.image}`}
              title={song.title}
              artist={song.artist}
              audioSrc={`http://localhost:8000/${song.audio}`}
          />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default TrendingNow;
