import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import CustomAudioCard from "./CustomAudioCard";

const SearchResultPage = () => {
  const [results, setResults] = useState([]);
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(search).get("query");
    if (query) {
      axios
        .get(`http://localhost:8000/api/songs/search?query=${query}`)
        .then((res) => setResults(res.data))
        .catch((err) => console.error("Search error:", err));
    }
  }, [search]);

  const handleCardClick = (songId) => {
    navigate(`/song/${songId}`);
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center fw-bold">Search Results</h2>
      <Row>
        {results.length === 0 ? (
          <p className="text-center">No results found.</p>
        ) : (
          results.map((song) => (
            <Col key={song.id} md={6} lg={4} className="mb-4">
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handleCardClick(song.id)}
              >
                <CustomAudioCard
                  image={`http://localhost:8000/${song.image}`}
                  title={song.title}
                  artist={song.artist}
                  audioSrc={`http://localhost:8000/${song.audio}`}
                />
              </div>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default SearchResultPage;